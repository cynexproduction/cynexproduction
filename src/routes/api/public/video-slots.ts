import { createFileRoute } from "@tanstack/react-router";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCh4Nh6PRlQg17F05FII1VGt1wAPx5cqwI",
  authDomain: "cynex-production.firebaseapp.com",
  databaseURL: "https://cynex-production-default-rtdb.firebaseio.com",
  projectId: "cynex-production",
  storageBucket: "cynex-production.firebasestorage.app",
  messagingSenderId: "403679385273",
  appId: "1:403679385273:web:8699bfe6647336d2efed68",
  measurementId: "G-83Z70LEB11",
};

const app = initializeApp(firebaseConfig, "video-slots-server");
const db = getFirestore(app);

export const Route = createFileRoute("/api/public/video-slots")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const snapshot = await getDocs(collection(db, "video_slots"));
          const slots: Record<string, { title: string | null; youtube_url: string | null }> = {};
          snapshot.docs.forEach((d) => {
            const data = d.data();
            slots[data.slot_key] = { title: data.title || null, youtube_url: data.youtube_url || null };
          });
          return new Response(JSON.stringify({ slots }), { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=30", "Access-Control-Allow-Origin": "*" } });
        } catch {
          return new Response(JSON.stringify({ slots: {} }), { status: 200, headers: { "Content-Type": "application/json" } });
        }
      },
    },
  },
});
