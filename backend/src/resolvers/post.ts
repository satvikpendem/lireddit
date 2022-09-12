import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";
import { Context } from "../types";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: Context) {
    return em.find(Post, {});
  }

  @Query(() => [Post])
  post(
    @Arg("id") id: number,
    @Ctx() { em }: Context
  ) {
    return em.find(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Ctx() { em }: Context
  ) {
    const post = em.create(Post, { title });
    await em.persistAndFlush(post);
    return post;
  }
}

