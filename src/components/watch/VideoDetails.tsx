import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Bookmark02Icon,
  Download04Icon,
  Flag02Icon,
  MoreHorizontalIcon,
  Share08Icon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { formatCount } from "./format";
import type { Channel, Video } from "./types";

const pill = "h-9 rounded-full bg-secondary px-4 text-sm font-medium hover:bg-accent";

function ChannelInfo({ channel }: { channel: Channel }) {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-10">
        <AvatarImage src={channel.avatar} alt={channel.name} />
        <AvatarFallback>{channel.name[0]}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 leading-tight">
        <p className="truncate font-semibold">{channel.name}</p>
        <p className="text-xs text-muted-foreground">
          {formatCount(channel.subscribers)} subscribers
        </p>
      </div>
      <Button
        onClick={() => setSubscribed((s) => !s)}
        variant={subscribed ? "secondary" : "default"}
        className="ml-3 h-9 rounded-full px-4"
      >
        {subscribed ? "Subscribed" : "Subscribe"}
      </Button>
    </div>
  );
}

function VideoActions({ likes }: { likes: number }) {
  const [vote, setVote] = useState<"like" | "dislike" | null>(null);
  const likeCount = likes + (vote === "like" ? 1 : 0);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex h-9 items-center overflow-hidden rounded-full bg-secondary">
        <button
          type="button"
          aria-pressed={vote === "like"}
          onClick={() => setVote((v) => (v === "like" ? null : "like"))}
          className="flex h-full items-center gap-2 pl-4 pr-3 text-sm font-medium hover:bg-accent"
        >
          <HugeiconsIcon
            icon={ThumbsUpIcon}
            size={18}
            className={cn(vote === "like" && "fill-foreground")}
          />
          {formatCount(likeCount)}
        </button>
        <span className="h-6 w-px bg-border" />
        <button
          type="button"
          aria-label="Dislike"
          aria-pressed={vote === "dislike"}
          onClick={() => setVote((v) => (v === "dislike" ? null : "dislike"))}
          className="flex h-full items-center pl-3 pr-4 hover:bg-accent"
        >
          <HugeiconsIcon
            icon={ThumbsDownIcon}
            size={18}
            className={cn(vote === "dislike" && "fill-foreground")}
          />
        </button>
      </div>
      <Button variant="ghost" className={pill}>
        <HugeiconsIcon icon={Share08Icon} size={18} /> Share
      </Button>
      <Button variant="ghost" className={pill}>
        <HugeiconsIcon icon={Bookmark02Icon} size={18} /> Save
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="More options" className="size-9 rounded-full bg-secondary hover:bg-accent">
            <HugeiconsIcon icon={MoreHorizontalIcon} size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <HugeiconsIcon icon={Download04Icon} size={16} /> Download
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Flag02Icon} size={16} /> Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function VideoDetails({ video }: { video: Video }) {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold leading-snug">{video.title}</h1>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ChannelInfo channel={video.channel} />
        <VideoActions likes={video.likes} />
      </div>
    </div>
  );
}
