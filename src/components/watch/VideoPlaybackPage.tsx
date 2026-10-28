import { CommentsSection } from "./CommentsSection";
import { RelatedVideos } from "./RelatedVideos";
import { VideoDescription } from "./VideoDescription";
import { VideoDetails } from "./VideoDetails";
import { VideoPlayer } from "./VideoPlayer";
import { mockCommentCount, mockComments, mockRelatedVideos, mockVideo } from "./mock-video-data";

/** Watch page for /watch/:videoId. Swap mock data for real data when migrating. */
export function VideoPlaybackPage() {
  const video = mockVideo;

  return (
    <div className="mx-auto flex max-w-[1700px] flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6">
      <main className="min-w-0 flex-1 space-y-4 lg:basis-[72%]">
        <VideoPlayer src={video.videoUrl} poster={video.thumbnail} title={video.title} />
        <VideoDetails video={video} />
        <VideoDescription video={video} />
        <div className="pt-2">
          <CommentsSection comments={mockComments} totalCount={mockCommentCount} />
        </div>
      </main>
      <div className="w-full lg:w-[360px] lg:shrink-0 xl:w-[400px]">
        <RelatedVideos videos={mockRelatedVideos} />
      </div>
    </div>
  );
}
