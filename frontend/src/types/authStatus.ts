export type AuthStatus = {
  email?: string;
  status: "authenticated" | "unauthenticated";
  user_id: string;
};
