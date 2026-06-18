import { createFileRoute } from "@tanstack/react-router";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createBlogMcpServer } from "@/lib/mcp/blog-server";

const transports = new Map<string, WebStandardStreamableHTTPServerTransport>();
const servers = new Map<string, ReturnType<typeof createBlogMcpServer>>();

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, MCP-Session-Id, MCP-Protocol-Version",
    "Access-Control-Expose-Headers": "MCP-Session-Id",
  };
}

function isMcpRequest(request: Request): boolean {
  const ct = request.headers.get("content-type") || "";
  const accept = request.headers.get("accept") || "";
  return ct.includes("json") || accept.includes("json") || request.headers.has("MCP-Protocol-Version");
}

function ensureMcpAccept(request: Request): Request {
  const accept = request.headers.get("accept") || "";
  if (!accept.includes("text/event-stream") && accept.includes("application/json")) {
    const h = new Headers(request.headers);
    h.set("accept", "application/json, text/event-stream");
    return new Request(request, { headers: h });
  }
  return request;
}

async function getOrCreateTransport(sessionId?: string) {
  if (sessionId && transports.has(sessionId)) {
    return transports.get(sessionId)!;
  }
  const sid = sessionId || crypto.randomUUID();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: () => sid,
  });
  transport.onclose = () => { transports.delete(sid); servers.delete(sid); };
  transports.set(sid, transport);
  const server = createBlogMcpServer();
  servers.set(sid, server);
  await server.connect(transport);
  return transport;
}

export const Route = createFileRoute("/mcp")({
  component: () => (
    <html>
      <head><title>MCP Server - CYNEX Production</title></head>
      <body style={{ fontFamily: "sans-serif", padding: 24 }}>
        <h1>MCP Server</h1>
        <p>This endpoint is for AI assistants (ChatGPT, Claude).</p>
        <p>Configure it as an MCP server with URL: <code>/mcp</code></p>
      </body>
    </html>
  ),
  server: {
    handlers: {
      OPTIONS: async () => {
        return new Response(null, { status: 204, headers: corsHeaders() });
      },
      GET: async ({ request }) => {
        if (!isMcpRequest(request)) {
          return new Response("MCP Server — use with ChatGPT/Claude", {
            status: 200, headers: { "Content-Type": "text/plain", ...corsHeaders() },
          });
        }
        try {
          request = ensureMcpAccept(request);
          const sid = request.headers.get("MCP-Session-Id") || undefined;
          const transport = await getOrCreateTransport(sid);
          const response = await transport.handleRequest(request);
          const headers = { ...Object.fromEntries(response.headers), ...corsHeaders() };
          return new Response(response.body, { status: response.status, headers });
        } catch (e: any) {
          return new Response(JSON.stringify({ error: e.message }), {
            status: 500, headers: { "Content-Type": "application/json", ...corsHeaders() },
          });
        }
      },
      POST: async ({ request }) => {
        try {
          request = ensureMcpAccept(request);
          const sid = request.headers.get("MCP-Session-Id") || undefined;
          const transport = await getOrCreateTransport(sid);
          const response = await transport.handleRequest(request);
          const headers = { ...Object.fromEntries(response.headers), ...corsHeaders() };
          return new Response(response.body, { status: response.status, headers });
        } catch (e: any) {
          return new Response(JSON.stringify({ error: e.message }), {
            status: 500, headers: { "Content-Type": "application/json", ...corsHeaders() },
          });
        }
      },
      DELETE: async ({ request }) => {
        request = ensureMcpAccept(request);
        const sid = request.headers.get("MCP-Session-Id");
        if (sid) {
          const transport = transports.get(sid);
          if (transport) {
            try {
              await transport.handleRequest(request);
            } catch { /* ignore cleanup errors */ }
          }
          transports.delete(sid);
          servers.delete(sid);
        }
        return new Response(null, { status: 204, headers: corsHeaders() });
      },
    },
  },
});
