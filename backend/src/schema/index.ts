import "./User";
import "./Post";
import "./Error";
import { builder } from "../builder";

builder.queryType();
builder.mutationType();

export const schema = builder.toSchema();
