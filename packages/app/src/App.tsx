import type { FC } from "@lynx-js/react";
import "./styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { authClient } from "./auth";
import { routeTree } from "./routeTree.gen.js";

const memoryHistory = createMemoryHistory({
  initialEntries: ["/"],
});

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  history: memoryHistory,
  isServer: false,
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App: FC = () => {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) {
    return (
      <view>
        <text>user loading</text>
      </view>
    );
  }

  if (error) {
    return (
      <view>
        <text>something bad happened</text>
      </view>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
