import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {
	[OptionalProps]?: "createdAt" | "updatedAt";

	@PrimaryKey()
	id!: number;

	@Property({type: "text"})
	title!: string;

	@Property({type: "date"})
	createdAt = new Date();

	@Property({ type: "date", onUpdate: () => new Date()})
	updatedAt = new Date();
}
