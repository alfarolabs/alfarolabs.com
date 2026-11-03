import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/violet-audio")({
  beforeLoad: () => {
    throw redirect({ to: "/hardware", statusCode: 301 });
  },
});
