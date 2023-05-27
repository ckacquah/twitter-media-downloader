import { downloadTweet } from "@/lib/client";
import MediaPreview from "@/components/MediaPreview";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let tweet;
  let error;

  const tweetUrl = searchParams.tweetUrl;
  if (tweetUrl !== undefined && typeof tweetUrl === "string") {
    try {
      tweet = await downloadTweet(tweetUrl);
    } catch (err) {
      if (typeof err === "object" && err !== null && "toString" in err) {
        error = err.toString();
      } else {
        error = "Error downloading tweet";
      }
    }
  }

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-start m-0 p-24">
      <p className="text-5xl">Twitter Media Downloader</p>
      <div className="flex flex-col items-center p-12">
        <MediaPreview tweet={tweet} query={tweetUrl} error={error} />
      </div>
    </main>
  );
}
