import SchemaBuilder from "@pothos/core";
import DrizzlePlugin from "@pothos/plugin-drizzle";
import WithInputPlugin from "@pothos/plugin-with-input";
import { drizzle } from "drizzle-orm/node-postgres";
import { getTableConfig } from "drizzle-orm/pg-core";
import { relations } from "../db/relations";
import { posts } from "../db/schema";

const db = drizzle(process.env.DATABASE_URL ?? "", { relations });

const builder = new SchemaBuilder<{
  DefaultFieldNullability: false;
  DrizzleRelations: typeof relations;
}>({
  defaultFieldNullability: false,
  plugins: [DrizzlePlugin, WithInputPlugin],
  drizzle: {
    client: db,
    getTableConfig,
    relations,
  },
});

builder.drizzleObject("posts", {
  name: "Post",
  fields: (t) => ({
    id: t.exposeInt("id"),
    title: t.exposeString("title"),
  }),
});

builder.queryType({
  fields: (t) => ({
    posts: t.drizzleField({
      type: ["posts"],
      resolve: (query) =>
        db.query.posts.findMany(
          query({
            orderBy: {
              id: "desc",
            },
          }),
        ),
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    createPost: t.drizzleFieldWithInput({
      type: "posts",
      input: {
        title: t.input.string({ required: true }),
      },
      resolve: async (_, __, { input }) =>
        db
          .insert(posts)
          .values(input)
          .returning()
          .then(([post]) => post!),
    }),
  }),
});

export const schema = builder.toSchema();
