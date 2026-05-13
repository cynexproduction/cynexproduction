import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/public/videos")({
  GET: async ({ request }) => {
    return json({
      items: [
        // Add default videos or handle as needed
      ],
    });
  },
});
