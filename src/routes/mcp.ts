import { createFileRoute } from "@tanstack/react-router";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createBlogMcpServer } from "@/lib/mcp/blog-server";

const transports = new Map<string, WebStandardStreamableHTTPServerTransport>();
const blogServer = createBlogMcpServer();

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, MCP-Session-Id, MCP-Protocol-Version",
    "Access-Control-Expose-Headers": "MCP-Session-Id",
  };
}

async function getOrCreateTransport(sessionId?: string) {
  if (sessionId && transports.has(sessionId)) {
    return transports.get(sessionId)!;
  }
  const sid = sessionId || crypto.randomUUID();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: () => sid,
  });
  transport.onclose = () => transports.delete(sid);
  transports.set(sid, transport);
  await blogServer.connect(transport);
  return transport;
}

export const Route = createFileRoute("/mcp")({
  server: {
    handlers: {
      OPTIONS: async () => {
        return new Response(null, { status: 204, headers: corsHeaders() });
      },
      GET: async ({ request }) => {
        const sid = request.headers.get("MCP-Session-Id") || undefined;
        const transport = await getOrCreateTransport(sid);
        const response = await transport.handleRequest(request);
        const headers = { ...Object.fromEntries(response.headers), ...corsHeaders() };
        return new Response(response.body, { status: response.status, headers });
      },
      POST: async ({ request }) => {
        const sid = request.headers.get("MCP-Session-Id");
        if (!sid) {
          return new Response(JSON.stringify({ error: "MCP-Session-Id header required" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders() },
          });
        }
        const transport = transports.get(sid);
        if (!transport) {
          return new Response(JSON.stringify({ error: "Session not found" }), {
            status: 404, headers: { "Content-Type": "application/json", ...corsHeaders() },
          });
        }
        const response = await transport.handleRequest(request);
        const headers = { ...Object.fromEntries(response.headers), ...corsHeaders() };
        return new Response(response.body, { status: response.status, headers });
      },
      DELETE: async ({ request }) => {
        const sid = request.headers.get("MCP-Session-Id");
        if (sid) {
          const transport = transports.get(sid);
          if (transport) {
            await transport.handleRequest(request);
          }
          transports.delete(sid);
        }
        return new Response(null, { status: 204, headers: corsHeaders() });
      },
    },
  },
});
