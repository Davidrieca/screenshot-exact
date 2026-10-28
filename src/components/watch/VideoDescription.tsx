import { useState } from "react";
import { formatCount } from "./format";
import type { Video } from "./types";

export function VideoDescription({ video }: { video: Video }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-xl bg-secondary p-3 text-sm ${expanded ? "" : "cursor-pointer hover:bg-accent"}`}
      onClick={() => !expanded && setExpanded(true)}
    >
      <p className="font-semibold">
        {formatCount(video.views)} views · {video.uploadedAt}
      </p>
      <p className={`mt-1 whitespace-pre-line ${expanded ? "" : "line-clamp-2"}`}>
        {video.description}
      </p>
      {expanded && (video.category || video.language) && (
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
          {video.category && (
            <>
              <dt className="text-muted-foreground">Category</dt>
              <dd className="font-medium">{video.category}</dd>
            </>
          )}
          {video.language && (
            <>
              <dt className="text-muted-foreground">Language</dt>
              <dd className="font-medium">{video.language}</dd>
            </>
          )}
        </dl>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setExpanded((v) => !v);
        }}
        className="mt-2 font-semibold"
      >
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
}
