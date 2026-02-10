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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
