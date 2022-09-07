import { Configuration, Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { __prod__ } from "./constants";

export default {
	dbName: "lireddit",
	type: "postgresql",
	debug: !__prod__,
	user: "api_user",
	password: "postgres",
	entities: ["./dist/entities"],
	entitiesTs: ["./src/entities"],
	allowGlobalContext: true,
	migrations: {
		path: "./src/migrations",
		pattern: /^[\w-]+\d+\.js$/,
		disableForeignKeys: false,
	},
} as Options<PostgreSqlDriver> | Configuration<PostgreSqlDriver> | undefined;
