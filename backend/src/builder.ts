import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import ErrorsPlugin from "@pothos/plugin-errors";
import { db } from "./db";

import type PrismaTypes from "./generated/pothos-types";
import type { Context } from "./types";

export const builder = new SchemaBuilder<
  {
    PrismaTypes: PrismaTypes;
    Context: Context;
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
