import type { CodegenConfig } from "@graphql-codegen/cli";
import { printSchema } from "graphql";
import { schema } from "../api/graphql";

const config: CodegenConfig = {
  schema: printSchema(schema),
  generates: {
    "./schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
