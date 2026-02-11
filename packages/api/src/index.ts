import { graphqlServer } from "@hono/graphql-server";
import { Hono } from "hono";
import { auth } from "./auth";
import { schema } from "./graphql";

const app = new Hono({ strict: false });

app.use(
  "/graphql",
  graphqlServer({
    schema,
    graphiql: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

export default app;
