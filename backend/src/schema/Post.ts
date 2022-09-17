import { builder } from "../builder";
import { db } from "../db";

builder.prismaObject("Post", {
	fields: (t) => ({
		id: t.exposeID("id"),
		title: t.exposeString("title"),
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
		posts: t.prismaField({
			type: ["Post"],
			nullable: true,
			args: {
				take: t.arg.int(),
				skip: t.arg.int(),
			},
			resolve: (query, _, args) =>
				db.post.findMany({
					...query,
					take: args.take ?? 10,
					skip: args.skip ?? 0,
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
			args: {
				title: t.arg.string({ required: true }),
			},
			resolve: (_, __, { title }) =>
				db.post.create({
					data: {
						title,
					},
				}),
		}),
		updatePost: t.prismaField({
			type: "Post",
			nullable: true,
			args: {
				id: t.arg.id({ required: true }),
				title: t.arg.string({ required: true }),
			},
			resolve: (_, __, { id, title }) =>
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
			args: {
				id: t.arg.id({ required: true }),
			},
			resolve: (_, __, { id }) =>
				db.post.delete({
					where: {
						id: Number.parseInt(String(id)),
					},
				}),
		}),
	}),
);
