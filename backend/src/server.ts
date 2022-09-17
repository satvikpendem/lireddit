import { ApolloServer } from "apollo-server-express";
import express from "express";

import { schema } from "./schema";
import session from "./session";
import { PROD } from "./constants";

export async function startServer() {
	const app = express();

	app.use(session);

	// https://blog.devgenius.io/graphql-apollo-studio-and-cookies-5d8519d0ca7e
	// This is a workaround for Apollo Studio to work with cookies.
	!PROD && app.set("trust proxy", 1);

	const server = new ApolloServer({
		schema,
		introspection: !PROD,
		csrfPrevention: PROD,
		context: ({ req, res }) => ({ req, res }),
	});
	await server.start();

	server.applyMiddleware({
		app,
		// https://blog.devgenius.io/graphql-apollo-studio-and-cookies-5d8519d0ca7e
		// Add CORS here to allow Apollo Studio to work with cookies.
		cors: {
			origin: ["https://studio.apollographql.com"],
			credentials: true,
		},
	});

	app.listen(4000, () => {
		console.log("Server started on localhost:4000");
	});
}
