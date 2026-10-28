import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  SortingDownIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { formatCount } from "./format";
import type { Comment } from "./types";

function CommentInput({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const reset = () => {
    setValue("");
    setFocused(false);
  };

  return (
    <div className="flex gap-3">
      <Avatar className="size-10">
        <AvatarFallback>
          <HugeiconsIcon icon={UserIcon} size={20} />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Add a comment..."
          className="w-full border-b border-border bg-transparent pb-1 text-sm outline-none transition-colors focus:border-foreground"
        />
        {focused && (
          <div className="mt-2 flex justify-end gap-2">
            <Button variant="ghost" className="h-9 rounded-full" onClick={reset}>
              Cancel
            </Button>
            <Button
              className="h-9 rounded-full"
              disabled={!value.trim()}
              onClick={() => {
                onSubmit(value.trim());
                reset();
              }}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function CommentItem({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const replies = comment.replies ?? [];
  const size = isReply ? "size-6" : "size-10";

  return (
    <div className="flex gap-3">
      <Avatar className={size}>
        <AvatarImage src={comment.avatar} alt={comment.username} />
        <AvatarFallback>{comment.username[1]?.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="text-xs">
          <span className="font-semibold">{comment.username}</span>{" "}
          <span className="text-muted-foreground">{comment.createdAt}</span>
        </p>
        <p className="mt-0.5 text-sm">{comment.text}</p>
        <div className="-ml-2 mt-1 flex items-center text-xs text-muted-foreground">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Like comment"
            className="size-8 rounded-full"
            onClick={() => {
              setLiked((v) => !v);
              setDisliked(false);
            }}
          >
            <HugeiconsIcon icon={ThumbsUpIcon} size={16} className={cn(liked && "fill-foreground")} />
          </Button>
          <span className="mr-1">{formatCount(comment.likes + (liked ? 1 : 0))}</span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Dislike comment"
            className="size-8 rounded-full"
            onClick={() => {
              setDisliked((v) => !v);
              setLiked(false);
            }}
          >
            <HugeiconsIcon icon={ThumbsDownIcon} size={16} className={cn(disliked && "fill-foreground")} />
          </Button>
          <Button variant="ghost" className="h-8 rounded-full px-3 text-xs font-semibold">
            Reply
          </Button>
        </div>
        {replies.length > 0 && (
          <>
            <Button
              variant="ghost"
              onClick={() => setShowReplies((v) => !v)}
              className="-ml-3 h-9 rounded-full px-3 text-sm font-semibold text-primary"
            >
              <HugeiconsIcon icon={showReplies ? ArrowUp01Icon : ArrowDown01Icon} size={18} />
              {showReplies ? "Hide" : "View"} {replies.length} replies
            </Button>
            {showReplies && (
              <div className="mt-2 space-y-4">
                {replies.map((r) => (
                  <CommentItem key={r.id} comment={r} isReply />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface CommentsSectionProps {
  comments: Comment[];
  totalCount: number;
}

export function CommentsSection({ comments: initial, totalCount }: CommentsSectionProps) {
  const [comments, setComments] = useState(initial);
  const [sort, setSort] = useState("top");

  const addComment = (text: string) =>
    setComments((prev) => [
      { id: `local-${Date.now()}`, username: "@you", avatar: "", text, createdAt: "just now", likes: 0 },
      ...prev,
    ]);

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-8">
        <h2 className="text-xl font-bold">
          {formatCount(totalCount + comments.length - initial.length)} Comments
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-2 font-semibold">
              <HugeiconsIcon icon={SortingDownIcon} size={20} /> Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
              <DropdownMenuRadioItem value="top">Top comments</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CommentInput onSubmit={addComment} />
      <div className="space-y-5">
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
      </div>
    </section>
  );
}
