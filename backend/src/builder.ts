import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import ErrorsPlugin from "@pothos/plugin-errors";
import { db } from "./db";

import type PrismaTypes from "../generated/pothos-types";
import type { ExpressContext } from "apollo-server-express";

export const builder = new SchemaBuilder<
	{
		PrismaTypes: PrismaTypes;
		Context: ExpressContext;
	}
>({
	plugins: [ErrorsPlugin, PrismaPlugin],
	errorOptions: {
		defaultTypes: [],
	},
	prisma: {
		client: db,
	},
});
