import SchemaBuilder from "@pothos/core";

const builder = new SchemaBuilder({});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      nullable: false,
      args: {
        name: t.arg.string({ required: true }),
      },
      resolve: (_, { name }) => `hello ${name}`,
    }),
    foo: t.string({
      nullable: false,
      args: {
        name: t.arg.string({ required: true }),
      },
      resolve: (_, { name }) => `hello ${name}`,
    }),
  }),
});

export const schema = builder.toSchema();
