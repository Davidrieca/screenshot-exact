import { createFileRoute } from "@tanstack/react-router";
import { VideoPlaybackPage } from "@/components/watch/VideoPlaybackPage";

// Preview-only route; your project mounts VideoPlaybackPage at /watch/:videoId.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Building a Full-Stack App with React & TypeScript — Watch" },
      { name: "description", content: "YouTube-style video watch page preview." },
      { property: "og:title", content: "Watch page preview" },
      { property: "og:description", content: "YouTube-style video watch page preview." },
      { property: "og:type", content: "video.other" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VideoPlaybackPage,
});
