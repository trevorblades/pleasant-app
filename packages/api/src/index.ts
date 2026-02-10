import { graphqlServer } from "@hono/graphql-server";
import { Hono } from "hono";
import { auth } from "./auth";
import { schema } from "./graphql";

const app = new Hono({ strict: false });

app.use("*", async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  console.log("Headers:", JSON.stringify(c.req.header()));
  await next();
});

app.use(
  "/graphql",
  graphqlServer({
    schema,
    graphiql: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

export default app;
