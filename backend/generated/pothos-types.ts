import type { Prisma, User, Post } from "/home/satvik/Projects/React/lireddit/backend/generated/prisma-client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: never;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    Post: {
        Name: "Post";
        Shape: Post;
        Include: never;
        Select: Prisma.PostSelect;
        OrderBy: Prisma.PostOrderByWithRelationInput;
        WhereUnique: Prisma.PostWhereUniqueInput;
        Where: Prisma.PostWhereInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}