import {
  HeadContent,
  Outlet,
  ScrollRestoration,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import * as React from "react";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "CYNEX Production",
      },
      { title: "Lovable App" },
      { property: "og:title", content: "Lovable App" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "description", content: "Download and customize the complete Avatar Studios website, including styles, for local use." },
      { property: "og:description", content: "Download and customize the complete Avatar Studios website, including styles, for local use." },
      { name: "twitter:description", content: "Download and customize the complete Avatar Studios website, including styles, for local use." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bc5d7f4e-a922-4aad-8357-f41ae492a4b1/id-preview-53cbf2e1--54b6b740-0318-4001-a492-46305f68b4e6.lovable.app-1778660005304.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bc5d7f4e-a922-4aad-8357-f41ae492a4b1/id-preview-53cbf2e1--54b6b740-0318-4001-a492-46305f68b4e6.lovable.app-1778660005304.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CYNEX Production</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
