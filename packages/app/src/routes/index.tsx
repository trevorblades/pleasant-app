import { type FC, useState } from "@lynx-js/react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { graphql } from "gql.tada";
import { client } from "../gql";

const HelloQuery = graphql(`
  query Hello {
    hello(name: "foo")
    foo(name: "bar")
  }
`);

const helloQuery = queryOptions({
  queryKey: ["hello"],
  queryFn: () => client.request(HelloQuery),
});

const HomePage: FC = () => {
  const [value, setValue] = useState("");
  const { data, refetch } = useSuspenseQuery(helloQuery);
  return (
    <view className="flex h-screen flex-col pt-[env(safe-area-inset-top)]">
      <view className="flex h-12 items-center justify-center border-b">
        <text>
          {data.hello} {data.foo} are you doings
        </text>
      </view>
      <view className="flex flex-col gap-2 p-4">
        <input
          className="border p-1"
          bindinput={(event) => {
            setValue(event.detail.value);
          }}
        />
        <view
          bindtap={() => {
            refetch();
          }}
          accessibility-traits="button"
        >
          <text>refetch {value}</text>
        </view>
      </view>
    </view>
  );
};

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(helloQuery),
  component: HomePage,
});
