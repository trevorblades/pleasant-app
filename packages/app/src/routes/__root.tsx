import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <view>
      <Outlet />
    </view>
  ),
});
