import SchemaBuilder from "@pothos/core";
import DrizzlePlugin from "@pothos/plugin-drizzle";
import { drizzle } from "drizzle-orm/node-postgres";
import { getTableConfig } from "drizzle-orm/pg-core";
import { relations } from "../db/relations";

const db = drizzle(process.env.DATABASE_URL ?? "", { relations });

const builder = new SchemaBuilder<{
  DefaultFieldNullability: false;
  DrizzleRelations: typeof relations;
}>({
  defaultFieldNullability: false,
  plugins: [DrizzlePlugin],
  drizzle: {
    client: db,
    getTableConfig,
    relations,
  },
});

builder.drizzleObject("posts", {
  name: "Post",
  fields: (t) => ({
    title: t.exposeString("title"),
  }),
});

builder.queryType({
  fields: (t) => ({
    posts: t.drizzleField({
      type: ["posts"],
      resolve: (query) => db.query.posts.findMany(query()),
    }),
  }),
});

export const schema = builder.toSchema();
