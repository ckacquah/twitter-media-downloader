import { extractMediaFromTweet } from "@/lib/client";
import MediaPreviewCard from "./MediaPreviewCard";

export default function MediaPreview({
  tweet,
  query,
}: {
  tweet: any;
  query: string | undefined;
}) {
  const media = extractMediaFromTweet(tweet);
  return (
    <>
      <form method="GET">
        <div className="flex">
          <input
            type="text"
            name="tweetId"
            className="px-4 py-2 mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
            placeholder="Enter the twitter status id"
            defaultValue={query !== undefined ? query : ""}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            PREVIEW
          </button>
        </div>
      </form>
      <div className="flex flex-col my-8">
        <div className="flex flex-col items-center">
          <p className="text-3xl">Preview</p>
          <div className="mx-4">
            {media.length > 0 &&
              media.map((mediaItem: TweetMedia, index: number) => {
                return <MediaPreviewCard key={index} media={mediaItem} />;
              })}
            {media.length <= 0 && "Tweet contains no media"}
          </div>
        </div>
      </div>
    </>
  );
}
