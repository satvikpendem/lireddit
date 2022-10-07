import { builder } from "../builder";
import { db } from "../db";

import { Prisma } from "../generated/prisma-client/index";

const PostInput = builder.inputType("PostInput", {
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.string(),
  }),
});

const PostInputWithId = builder.inputType("PostInputWithId", {
  fields: (t) => ({
    id: t.id({ required: true }),
    title: t.string({ required: true }),
    content: t.string(),
  }),
});

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    createdAt: t.string({
      resolve: ({ createdAt }) => createdAt.toISOString(),
    }),
    updatedAt: t.string({
      resolve: ({ updatedAt }) => updatedAt.toISOString(),
    }),
    content: t.string({
      resolve: ({ content }) => content || "",
    }),
    author: t.relation("author"),
  }),
});

builder.queryFields(
  (t) => ({
    posts: t.prismaField({
      type: ["Post"],
      nullable: true,
      args: {
        take: t.arg.int(),
        skip: t.arg.int(),
        cursor: t.arg.int(),
      },
      resolve: (query, _, {
        take,
        skip,
        cursor,
      }) =>
        db.post.findMany({
          ...query,
          take: Math.min(take ?? 50, 50),
          skip: skip ?? cursor ? 1 : 0, // skip cursor if present
          cursor: (cursor && { id: cursor }) as Prisma.PostWhereUniqueInput,
        }),
    }),
    post: t.prismaField({
      type: "Post",
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: (query, _, args) =>
        db.post.findUnique({
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
    createPost: t.prismaField({
      type: "Post",
      nullable: true,
      errors: {
        types: [Error],
      },
      args: {
        input: t.arg({ type: PostInput, required: true }),
      },
      resolve: async (
        _,
        __,
        { input: { title } },
        { req: { session: { userId: id } } },
      ) => {
        if (!id) {
          throw new Error("Not authenticated");
        }

        const user = await db.user.findUnique({
          where: {
            id,
          },
        });

        if (!user) {
          throw new Error("Author not found");
        }

        return db.post.create({
          data: {
            title,
            author: {
              connect: {
                id,
              },
            },
          },
        });
      },
    }),
    updatePost: t.prismaField({
      type: "Post",
      nullable: true,
      errors: {
        types: [Error],
      },
      args: {
        input: t.arg({ type: PostInputWithId, required: true }),
      },
      resolve: (_, __, { input: { id, title } }) =>
        db.post.update({
          where: {
            id: Number.parseInt(String(id)),
          },
          data: {
            title,
          },
        }),
    }),
    deletePost: t.prismaField({
      type: "Post",
      nullable: true,
      errors: {
        types: [Error],
      },
      args: {
        input: t.arg({ type: PostInputWithId, required: true }),
      },
      resolve: (_, __, { input: { id } }) =>
        db.post.delete({
          where: {
            id: Number.parseInt(String(id)),
          },
        }),
    }),
  }),
);
