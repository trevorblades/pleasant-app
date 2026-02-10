import SchemaBuilder from "@pothos/core";
import DrizzlePlugin from "@pothos/plugin-drizzle";
import WithInputPlugin from "@pothos/plugin-with-input";
import { getTableConfig } from "drizzle-orm/pg-core";
import { db } from "../db";
import { type DrizzleRelations, relations } from "../db/relations";
import { posts } from "../db/schema";

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

builder.drizzleObject("posts", {
  name: "Post",
  fields: (t) => ({
    id: t.exposeInt("id"),
    title: t.exposeString("title"),
    user: t.relation("user"),
  }),
});

builder.drizzleObject("users", {
  name: "User",
  fields: (t) => ({
    id: t.exposeInt("id"),
    name: t.exposeString("name"),
    image: t.exposeString("image", { nullable: true }),
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
      resolve: async (_, __, { input }) => {
        const [post] = await db
          .insert(posts)
          .values({
            title: input.title,
            userId: 123,
          })
          .returning();

        if (!post) {
          throw new Error("asdf"); // TODO
        }

        return post;
      },
    }),
  }),
});

export const schema = builder.toSchema();
