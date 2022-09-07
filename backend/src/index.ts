import { MikroORM } from "@mikro-orm/core";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import config from "./mikro-orm.config";

const main = async () => {
	const orm = await MikroORM.init<PostgreSqlDriver>(config);
	await orm.getMigrator().up();
	// const post = orm.em.create(Post, { title: "my first post" });
	// await orm.em.persistAndFlush(post);
};

main();
