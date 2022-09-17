import "./User";
import "./Post";
import "./Error";
import { builder } from "../builder";

// builder.prismaObject("User", {
// 	fields: (t) => ({
// 		id: t.exposeID("id"),
// 		firstName: t.exposeString("firstName"),
// 		lastName: t.exposeString("lastName"),
// 		fullName: t.string({
// 			resolve: (user) => `${user.firstName} ${user.lastName}`,
// 		}),
// 		posts: t.relation("posts"),
// 		comments: t.relation("comments"),
// 	}),
// });

// builder.prismaObject("Post", {
// 	fields: (t) => ({
// 		id: t.exposeID("id"),
// 		title: t.exposeString("title"),
// 		content: t.exposeString("content"),
// 		author: t.relation("author"),
// 		comments: t.relation("comments"),
// 	}),
// });

// builder.prismaObject("Comment", {
// 	fields: (t) => ({
// 		id: t.exposeID("id"),
// 		comment: t.exposeString("comment"),
// 		author: t.relation("author"),
// 		post: t.relation("post"),
// 	}),
// });

// builder.queryType({
// 	fields: (t) => ({
// 		posts: t.prismaField({
// 			type: ["Post"],
// 			nullable: true,
// 			args: {
// 				take: t.arg.int(),
// 				skip: t.arg.int(),
// 			},
// 			resolve: (query, _, args) =>
// 				db.post.findMany({
// 					...query,
// 					take: args.take ?? 10,
// 					skip: args.skip ?? 0,
// 				}),
// 		}),
// 		post: t.prismaField({
// 			type: "Post",
// 			nullable: true,
// 			args: {
// 				id: t.arg.id({ required: true }),
// 			},
// 			resolve: (query, _, args) =>
// 				db.post.findUnique({
// 					...query,
// 					where: {
// 						id: Number.parseInt(String(args.id)),
// 					},
// 				}),
// 		}),
// 		users: t.prismaField({
// 			type: ["User"],
// 			nullable: true,
// 			args: {
// 				take: t.arg.int(),
// 				skip: t.arg.int(),
// 			},
// 			resolve: (query, _, args) =>
// 				db.user.findMany({
// 					...query,
// 					take: args.take ?? 10,
// 					skip: args.skip ?? 0,
// 				}),
// 		}),
// 		user: t.prismaField({
// 			type: "User",
// 			nullable: true,
// 			args: {
// 				id: t.arg.id({ required: true }),
// 			},
// 			resolve: (query, _, args) =>
// 				db.user.findUnique({
// 					...query,
// 					where: {
// 						id: Number.parseInt(String(args.id)),
// 					},
// 				}),
// 		}),
// 		comments: t.prismaField({
// 			type: ["Comment"],
// 			nullable: true,
// 			args: {
// 				take: t.arg.int(),
// 				skip: t.arg.int(),
// 			},
// 			resolve: (query, _, args) =>
// 				db.comment.findMany({
// 					...query,
// 					take: args.take ?? 10,
// 					skip: args.skip ?? 0,
// 				}),
// 		}),
// 		comment: t.prismaField({
// 			type: "Comment",
// 			nullable: true,
// 			args: {
// 				id: t.arg.id({ required: true }),
// 			},
// 			resolve: (query, _, args) =>
// 				db.comment.findUnique({
// 					...query,
// 					where: {
// 						id: Number.parseInt(String(args.id)),
// 					},
// 				}),
// 		}),
// 	}),
// });

// builder.mutationType({
// 	fields: (t) => ({
// 		createUser: t.prismaField({
// 			type: "User",
// 			nullable: true,
// 			args: {
// 				firstName: t.arg.string({ required: true }),
// 				lastName: t.arg.string({ required: true }),
// 			},
// 			resolve: (_, __, { firstName, lastName }) =>
// 				db.user.create({
// 					data: {
// 						firstName,
// 						lastName,
// 					},
// 				}),
// 		}),
// 	}),
// });

builder.queryType();
builder.mutationType();

export const schema = builder.toSchema();
