import { extractMediaFromTweet } from "@/lib/client";
import MediaPreviewCard from "./MediaPreviewCard";

export default function MediaPreview({
  tweet,
  query,
  error,
}: {
  tweet: any;
  query: string | undefined;
  error: string | undefined;
}) {
  const media = extractMediaFromTweet(tweet, query ?? "");
  return (
    <>
      <form method="GET">
        <div className="flex">
          <input
            type="text"
            name="url"
            className="px-4 py-2 mx-2 w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
            placeholder="https://twitter.com/example/status/12345678909875434"
            defaultValue={query ?? ""}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            PREVIEW
          </button>
        </div>
      </form>
      <div className="flex flex-col my-8">
        <div className="flex flex-col items-center">
          <div className="mx-4">
            {media.length > 0 &&
              media.map((mediaItem: TweetMedia, index: number) => {
                return <MediaPreviewCard key={index} media={mediaItem} />;
              })}
            {query !== "" &&
              query !== undefined &&
              media.length <= 0 &&
              error === undefined &&
              "Tweet contains no media"}
            {error !== undefined && error}
          </div>
        </div>
      </div>
    </>
  );
}
