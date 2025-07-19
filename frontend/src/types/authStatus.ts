export type AuthStatus = {
  data: {
    email?: string;
    status: "authenticated" | "unauthenticated";
  };
};
