import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { db } from "@/integrations/firebase/client";
import {
  collection, query, orderBy, where, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp,
} from "firebase/firestore";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "post";
}

export function createBlogMcpServer() {
  const server = new McpServer({
    name: "cynex-blog",
    version: "1.0.0",
  });

  server.tool(
    "blog_create",
    "Create a new blog post",
    {
      title: z.string().describe("Blog post title"),
      content: z.string().describe("Full HTML content. Preserve all formatting exactly as provided."),
      excerpt: z.string().optional().describe("Short summary / excerpt"),
      slug: z.string().optional().describe("URL slug (auto-generated from title if omitted)"),
      published: z.boolean().optional().describe("Whether the post is published (default: true)"),
    },
    async (args) => {
      const now = Timestamp.now().toDate().toISOString();
      const slug = args.slug || generateSlug(args.title);

      const existing = await getDocs(query(collection(db, "blogs"), where("slug", "==", slug)));
      if (!existing.empty) {
        return { content: [{ type: "text", text: `A blog post with slug "${slug}" already exists.` }], isError: true };
      }

      const docRef = await addDoc(collection(db, "blogs"), {
        title: args.title,
        slug,
        content: args.content,
        excerpt: args.excerpt || null,
        published: args.published ?? true,
        created_at: now,
        updated_at: now,
      });

      return {
        content: [{
          type: "text",
          text: JSON.stringify({ id: docRef.id, slug, url: `/blog/${slug}` }, null, 2),
        }],
      };
    },
  );

  server.tool(
    "blog_list",
    "List blog posts",
    {
      published_only: z.boolean().optional().describe("Only show published posts (default: true)"),
    },
    async (args) => {
      const constraints: any[] = [];
      if (args.published_only !== false) {
        constraints.push(where("published", "==", true));
      }
      constraints.push(orderBy("created_at", "desc"));

      const snapshot = await getDocs(query(collection(db, "blogs"), ...constraints));
      const posts = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          published: data.published,
          created_at: data.created_at,
        };
      });

      return { content: [{ type: "text", text: JSON.stringify(posts, null, 2) }] };
    },
  );

  server.tool(
    "blog_get",
    "Get a single blog post by slug",
    {
      slug: z.string().describe("The URL slug of the blog post"),
    },
    async (args) => {
      const snapshot = await getDocs(query(collection(db, "blogs"), where("slug", "==", args.slug)));
      if (snapshot.empty) {
        return { content: [{ type: "text", text: `Blog post with slug "${args.slug}" not found.` }], isError: true };
      }
      const docSnap = snapshot.docs[0];
      const data = docSnap.data();
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ id: docSnap.id, ...data }, null, 2),
        }],
      };
    },
  );

  server.tool(
    "blog_update",
    "Update an existing blog post by slug",
    {
      slug: z.string().describe("The URL slug of the blog post to update"),
      title: z.string().optional().describe("New title"),
      content: z.string().optional().describe("New HTML content. Preserve all formatting exactly as provided."),
      excerpt: z.string().optional().describe("New excerpt"),
      published: z.boolean().optional().describe("Published status"),
      new_slug: z.string().optional().describe("New slug (if changing the URL)"),
    },
    async (args) => {
      const snapshot = await getDocs(query(collection(db, "blogs"), where("slug", "==", args.slug)));
      if (snapshot.empty) {
        return { content: [{ type: "text", text: `Blog post with slug "${args.slug}" not found.` }], isError: true };
      }
      const docRef = doc(db, "blogs", snapshot.docs[0].id);
      const updateData: Record<string, unknown> = { updated_at: Timestamp.now().toDate().toISOString() };
      if (args.title !== undefined) updateData.title = args.title;
      if (args.content !== undefined) updateData.content = args.content;
      if (args.excerpt !== undefined) updateData.excerpt = args.excerpt;
      if (args.published !== undefined) updateData.published = args.published;
      if (args.new_slug !== undefined) updateData.slug = args.new_slug;

      await updateDoc(docRef, updateData);
      return { content: [{ type: "text", text: `Blog post "${args.slug}" updated.` }] };
    },
  );

  server.tool(
    "blog_delete",
    "Delete a blog post by slug",
    {
      slug: z.string().describe("The URL slug of the blog post to delete"),
    },
    async (args) => {
      const snapshot = await getDocs(query(collection(db, "blogs"), where("slug", "==", args.slug)));
      if (snapshot.empty) {
        return { content: [{ type: "text", text: `Blog post with slug "${args.slug}" not found.` }], isError: true };
      }
      await deleteDoc(doc(db, "blogs", snapshot.docs[0].id));
      return { content: [{ type: "text", text: `Blog post "${args.slug}" deleted.` }] };
    },
  );

  return server;
}
