import "reflect-metadata";

import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import { __prod__ } from "./constants";
import config from "./mikro-orm.config";

import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { buildSchema } from "type-graphql";

const main = async () => {
	const orm = await MikroORM.init<PostgreSqlDriver>(config);
	await orm.getMigrator().up();

	const app = express();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [`${__dirname}/resolvers/*`],
			validate: false,
		}),
		context: () => ({ em: orm.em }),
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => {
		console.log("Server started on localhost:4000");
	});
};

main();
