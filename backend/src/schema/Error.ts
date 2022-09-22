import { builder } from "../builder";

builder.objectType(Error, {
  name: "Error",
  fields: (t) => ({
    error: t.exposeString("message"),
  }),
});
