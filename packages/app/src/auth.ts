import { createAuthClient } from "better-auth/lynx";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
