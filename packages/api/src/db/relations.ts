import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export type DrizzleRelations = typeof relations;

export const relations = defineRelations(schema, (r) => ({
  posts: {
    user: r.one.users({
      from: r.posts.userId,
      to: r.users.id,
    }),
  },
  users: {
    posts: r.many.posts(),
  },
}));
