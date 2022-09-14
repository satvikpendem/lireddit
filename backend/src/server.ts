import { ApolloServer } from "apollo-server-express";
import express from "express";

import { schema } from "./schema";

export async function startServer() {
	const apolloServer = new ApolloServer({ schema });
	await apolloServer.start();

	const app = express();
	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => {
		console.log("Server started on localhost:4000");
	});
}
