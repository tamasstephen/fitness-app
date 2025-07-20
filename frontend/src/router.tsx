import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { routeTree } from "./routeTree.gen";
import { NotFound } from "./components/NotFound";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { AuthStatus } from "./types/authStatus";

// NOTE: Most of the integration code found here is experimental and will
// definitely end up in a more streamlined API in the future. This is just
// to show what's possible with the current APIs.

interface RouterContext {
  queryClient: QueryClient;
  authStatus: AuthStatus | undefined;
}

export function createRouter() {
  const queryClient = new QueryClient();

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient, authStatus: undefined } as RouterContext,
      defaultPreload: "intent",
      defaultNotFoundComponent: () => <NotFound />,
      defaultErrorComponent: DefaultCatchBoundary,
    }),
    queryClient
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
