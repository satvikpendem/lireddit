import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";

const orm = await MikroORM.init({
	dbName: "lireddit",
	type: "postgresql",
	debug: !__prod__,
	user: "api_user",
	password: "postgres",
});
