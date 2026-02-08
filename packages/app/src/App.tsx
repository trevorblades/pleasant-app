import type { FC } from "@lynx-js/react";
import "./styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.js";

const memoryHistory = createMemoryHistory({
  initialEntries: ["/"],
});

const router = createRouter({
  routeTree,
  history: memoryHistory,
  isServer: false,
});

const queryClient = new QueryClient();

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <view className="flex h-screen flex-col pt-[env(safe-area-inset-top)]">
        <view className="flex h-12 items-center justify-center border-b">
          <text>hello whatz are you doings</text>
        </view>
      </view>
    </QueryClientProvider>
  );
};
