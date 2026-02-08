import type { FC } from "@lynx-js/react";
import { createFileRoute } from "@tanstack/react-router";

const HomePage: FC = () => {
  const data = Route.useLoaderData();
  return (
    <view className="flex h-screen flex-col pt-[env(safe-area-inset-top)]">
      <view className="flex h-12 items-center justify-center border-b">
        <text>hello whatsss are you doings</text>
      </view>
    </view>
  );
};

export const Route = createFileRoute("/")({
  loader: async () => {
    return [
      {
        id: 123,
      },
    ];
  },
  component: HomePage,
});
