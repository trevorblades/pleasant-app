import SchemaBuilder from "@pothos/core";
import DrizzlePlugin from "@pothos/plugin-drizzle";
import WithInputPlugin from "@pothos/plugin-with-input";
import { getTableConfig } from "drizzle-orm/pg-core";
import { db } from "../db";
import { type DrizzleRelations, relations } from "../db/relations";
import { post } from "../db/schema";

const builder = new SchemaBuilder<{
  DefaultFieldNullability: false;
  DrizzleRelations: DrizzleRelations;
}>({
  defaultFieldNullability: false,
  plugins: [DrizzlePlugin, WithInputPlugin],
  drizzle: {
    client: db,
    getTableConfig,
    relations,
  },
});

builder.drizzleObject("post", {
  name: "Post",
  fields: (t) => ({
    id: t.exposeInt("id"),
    title: t.exposeString("title"),
    user: t.relation("user"),
  }),
});

builder.drizzleObject("user", {
  name: "User",
  fields: (t) => ({
    id: t.exposeString("id"),
    name: t.exposeString("name"),
    image: t.exposeString("image", { nullable: true }),
  }),
});

builder.queryType({
  fields: (t) => ({
    posts: t.drizzleField({
      type: ["post"],
      resolve: (query) =>
        db.query.post.findMany(
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
      type: "post",
      input: {
        title: t.input.string({ required: true }),
      },
      resolve: async (_, __, { input }) => {
        const [data] = await db
          .insert(post)
          .values({
            title: input.title,
            userId: "abc",
          })
          .returning();

        if (!data) {
          throw new Error("asdf"); // TODO
        }

        return data;
      },
    }),
  }),
});

export const schema = builder.toSchema();
