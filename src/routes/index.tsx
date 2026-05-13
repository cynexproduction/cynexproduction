import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  useEffect(() => {
    window.location.replace("/site/index.html");
  }, []);

  return null;
}
