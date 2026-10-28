import { formatCount } from "./format";
import type { RelatedVideo } from "./types";

/**
 * TEMPORARY preview-only item.
 * When migrating, delete this function and render your existing <VideoCard /> instead.
 */
function TempRelatedVideoItem({ video }: { video: RelatedVideo }) {
  return (
    <a href={`/watch/${video.id}`} className="group flex gap-2">
      <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg bg-muted">
        <img src={video.thumbnail} alt="" loading="lazy" className="h-full w-full object-cover" />
        <span className="absolute bottom-1 right-1 rounded bg-foreground/80 px-1 text-xs font-medium text-background">
          {video.duration}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{video.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{video.channelName}</p>
        <p className="text-xs text-muted-foreground">
          {formatCount(video.views)} views · {video.uploadedAt}
        </p>
      </div>
    </a>
  );
}

export function RelatedVideos({ videos }: { videos: RelatedVideo[] }) {
  return (
    <aside className="flex flex-col gap-3">
      {videos.map((v) => (
        // Migration: replace with <VideoCard key={v.id} video={v} variant="compact" />
        <TempRelatedVideoItem key={v.id} video={v} />
      ))}
    </aside>
  );
}
