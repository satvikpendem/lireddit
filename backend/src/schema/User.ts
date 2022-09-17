import argon2 from "argon2";

import { builder } from "../builder";
import { db } from "../db";

const UserCreateInput = builder.inputType("UserCreateInput", {
	fields: (t) => ({
		username: t.string({ required: true }),
		password: t.string({ required: true }),
	}),
});

builder.prismaObject("User", {
	fields: (t) => ({
		id: t.exposeID("id"),
		username: t.exposeString("username"),
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
			resolve: async (_, __, { input: { username, password } }, { req }) => {
				if (username.length <= 0) {
					throw new Error("Username cannot be empty");
				}
				if (password.length <= 0) {
					throw new Error("Password cannot be empty");
				}

				if (await db.user.findUnique({ where: { username } })) {
					throw new Error("Username already taken");
				}

				const hashedPassword = await argon2.hash(password);
				const user = await db.user.create({
					data: {
						username,
						password: hashedPassword,
					},
				});

				req.session.userId = user.id;
				await req.session.save();

				console.log(req.session.userId);

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
					type: UserCreateInput,
					required: true,
				}),
			},
			resolve: async (_, __, { input: { username, password } }, { req }) => {
				if (username.length <= 0) {
					throw new Error("Username cannot be empty");
				}
				if (password.length <= 0) {
					throw new Error("Password cannot be empty");
				}

				const user = await db.user.findUnique({
					where: {
						username,
					},
				});
				if (!user) {
					throw new Error("User not found");
				}
				const valid = await argon2.verify(user.password, password);
				if (!valid) {
					throw new Error("Invalid password");
				}

				req.session.userId = user.id;
				await req.session.save();

				console.log(req.session.userId);
				return user;
			},
		}),
	}),
);
