import argon2 from "argon2";
import { v4 } from "uuid";

import { builder } from "../builder";
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../constants";
import { db } from "../db";
import { sendEmail } from "../util/sendEmail";

const UserCreateInput = builder.inputType("UserCreateInput", {
  fields: (t) => ({
    username: t.string({ required: true }),
    email: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
});

const UserLoginInput = builder.inputType("UserLoginInput", {
  fields: (t) => ({
    usernameOrEmail: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
});

const UserSendForgotPasswordEmailInput = builder.inputType(
  "UserSendForgotPasswordEmailInput",
  {
    fields: (t) => ({
      usernameOrEmail: t.string({ required: true }),
    }),
  },
);

const UserChangePasswordInput = builder.inputType("UserChangePasswordInput", {
  fields: (t) => ({
    token: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
});

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    username: t.exposeString("username"),
    email: t.exposeString("email"),
    createdAt: t.string({
      resolve: (parent) => parent.createdAt.toISOString(),
    }),
    updatedAt: t.string({
      resolve: (parent) => parent.updatedAt.toISOString(),
    }),
  }),
});

builder.queryFields(
  (t) => ({
    users: t.prismaField({
      type: ["User"],
      nullable: true,
      args: {
        take: t.arg.int(),
        skip: t.arg.int(),
      },
      resolve: (query, _, args) =>
        db.user.findMany({
          ...query,
          take: args.take ?? 10,
          skip: args.skip ?? 0,
        }),
    }),
    user: t.prismaField({
      type: "User",
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: (query, _, args) =>
        db.user.findUnique({
          ...query,
          where: {
            id: Number.parseInt(String(args.id)),
          },
        }),
    }),
    me: t.prismaField({
      type: "User",
      nullable: true,
      resolve: (query, _, __, { req: { session: { userId } } }) => {
        if (!userId) {
          throw new Error("Not authenticated");
        }
        return db.user.findUnique({
          ...query,
          where: {
            id: userId,
          },
        });
      },
    }),
  }),
);

builder.mutationFields(
  (t) => ({
    register: t.prismaField({
      type: "User",
      nullable: true,
      errors: {
        types: [Error],
      },
      args: {
        input: t.arg({
          type: UserCreateInput,
          required: true,
        }),
      },
      resolve: async (
        _,
        __,
        { input: { username, email, password } },
        { req },
      ) => {
        if (username.length <= 0) {
          throw new Error("Username cannot be empty");
        }
        if (password.length <= 0) {
          throw new Error("Password cannot be empty");
        }
        if (email.length <= 0) {
          throw new Error("Email cannot be empty");
        }
        if (!email.includes("@")) {
          throw new Error("Invalid email");
        }

        if (await db.user.findUnique({ where: { username } })) {
          throw new Error("Username already taken");
        }
        if (await db.user.findUnique({ where: { email } })) {
          throw new Error("Email already taken");
        }

        const hashedPassword = await argon2.hash(password);
        const user = await db.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
          },
        });

        req.session.userId = user.id;
        await req.session.save();

        return user;
      },
    }),
    login: t.prismaField({
      type: "User",
      nullable: true,
      errors: {
        types: [Error],
      },
      args: {
        input: t.arg({
          type: UserLoginInput,
          required: true,
        }),
      },
      resolve: async (
        _,
        __,
        { input: { usernameOrEmail, password } },
        { req },
      ) => {
        if (usernameOrEmail.length <= 0) {
          throw new Error("Username cannot be empty");
        }
        if (password.length <= 0) {
          throw new Error("Password cannot be empty");
        }

        const user = await db.user.findUnique({
          where: usernameOrEmail.includes("@")
            ? { email: usernameOrEmail }
            : { username: usernameOrEmail },
        });
        if (!user) {
          throw new Error("Invalid username or email");
        }

        const valid = await argon2.verify(user.password, password);
        if (!valid) {
          throw new Error("Invalid password");
        }

        req.session.userId = user.id;
        await req.session.save();

        return user;
      },
    }),
    logout: t.field({
      type: "Boolean",
      errors: {
        types: [Error],
      },
      resolve: (_, __, { req, res }) => {
        req.session.destroy();
        res.clearCookie(COOKIE_NAME);
        return true;
      },
    }),
    changePassword: t.field({
      type: "Boolean",
      errors: {
        types: [Error],
      },
      args: {
        input: t.arg({
          type: UserChangePasswordInput,
          required: true,
        }),
      },
      resolve: async (_, { input: { token, password } }, { redis }) => {
        if (password.length <= 0) {
          throw new Error("Password cannot be empty");
        }

        const key = `${FORGOT_PASSWORD_PREFIX}${token}`;
        const userId = await redis.get(key);
        if (!userId) {
          throw new Error("Invalid token");
        }

        const id = parseInt(userId);
        const user = await db.user.findUnique({
          where: {
            id,
          },
        });
        if (!user) {
          throw new Error("Invalid token");
        }

        await db.user.update({
          where: {
            id,
          },
          data: {
            password: await argon2.hash(password),
          },
        });

        await redis.del(key);

        return true;
      },
    }),
    forgotPassword: t.field({
      type: "Boolean",
      errors: {
        types: [Error],
      },
      args: {
        input: t.arg({
          type: UserSendForgotPasswordEmailInput,
          required: true,
        }),
      },
      resolve: async (_, { input: { usernameOrEmail } }, { redis }) => {
        const user = await db.user.findUnique({
          where: usernameOrEmail.includes("@")
            ? { email: usernameOrEmail }
            : { username: usernameOrEmail },
        });
        if (!user) {
          throw new Error("Invalid username or email");
        }

        const token = v4();

        await redis.set(
          `${FORGOT_PASSWORD_PREFIX}${token}`,
          user.id,
          "EX",
          1000 * 60 * 60 * 24 * 3, // 3 days
        );

        await sendEmail(
          {
            to: user.email,
            subject: "Reset password",
            html:
              `<a href="http://localhost:3000/change-password/${token}">Reset password</a>`,
          },
        );

        return true;
      },
    }),
  }),
);
