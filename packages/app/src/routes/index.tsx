import { type FC, useState } from "@lynx-js/react";
import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { graphql, type VariablesOf } from "gql.tada";
import { PostDetails, PostDetailsFragment } from "../components/PostDetails";
import { client } from "../gql";
import { authClient } from "../lib/auth-client";

const HelloQuery = graphql(
  `
    query Hello {
      posts {
        id
        ...PostDetails
      }
    }
  `,
  [PostDetailsFragment],
);

const helloQuery = queryOptions({
  queryKey: ["hello"],
  queryFn: () => client.request(HelloQuery),
});

const CreatePostMutation = graphql(
  `
  mutation CreatePost($title: String!) {
    createPost(input: {
      title: $title
    }) {
      id
      ...PostDetails
    }
  }
`,
  [PostDetailsFragment],
);

const HomePage: FC = () => {
  const [value, setValue] = useState("");
  const { data } = useSuspenseQuery(helloQuery);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (variables: VariablesOf<typeof CreatePostMutation>) =>
      client.request(CreatePostMutation, variables),
    onSuccess: (data) => {
      queryClient.setQueryData(helloQuery.queryKey, (prev) => ({
        posts: prev ? [data.createPost, ...prev.posts] : [data.createPost],
      }));
    },
  });
  return (
    <view className="flex h-screen flex-col pt-[env(safe-area-inset-top)]">
      <view className="flex h-12 items-center justify-center border-b">
        <text>All posts</text>
      </view>
      <view className="flex flex-col gap-2 p-4">
        <input
          className="border"
          bindinput={(event) => {
            setValue(event.detail.value);
          }}
        />
        <view bindtap={async () => {}} className="h-12 bg-blue-100 px-4">
          <text>sign in w google</text>
        </view>
        <view
          bindtap={() => {
            if (!isPending) {
              mutate({
                title: value,
              });
            }
          }}
          accessibility-traits="button"
        >
          <text>refetch</text>
        </view>
        <view>
          {data.posts.map((post) => (
            <PostDetails key={post.id} data={post} />
          ))}
        </view>
      </view>
    </view>
  );
};

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(helloQuery),
  component: HomePage,
});
