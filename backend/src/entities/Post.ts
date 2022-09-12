import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
	[OptionalProps]?: "createdAt" | "updatedAt";

	@Field()
	@PrimaryKey()
	id!: number;

	@Field()
	@Property({ type: "text" })
	title!: string;

	@Field(() => String)
	@Property({ type: "date" })
	createdAt = new Date();

	@Field(() => String)
	@Property({ type: "date", onUpdate: () => new Date() })
	updatedAt = new Date();
}
