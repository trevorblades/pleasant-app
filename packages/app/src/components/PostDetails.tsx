import { type FragmentOf, graphql, readFragment } from "gql.tada";

export const PostDetailsFragment = graphql(`
  fragment PostDetails on Post {
    title
    user {
      name
    } 
  }
`);

export const PostDetails: React.FC<{
  data: FragmentOf<typeof PostDetailsFragment>;
}> = ({ data }) => {
  const post = readFragment(PostDetailsFragment, data);
  return (
    <view>
      <text>{post.title}</text>
      <view>
        <text>{post.user.name}</text>
      </view>
    </view>
  );
};
