import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/manifesto")({
  beforeLoad: () => {
    throw redirect({ to: "/services", statusCode: 301 });
  },
});
