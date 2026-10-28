interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title: string;
}

export function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-foreground">
      <video
        className="h-full w-full"
        src={src}
        poster={poster}
        controls
        preload="metadata"
        aria-label={title}
      />
    </div>
  );
}
