import { downloadTweet } from "@/lib/client";
import MediaPreview from "@/components/MediaPreview";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let tweet;
  const tweetId = searchParams.tweetId;
  if (tweetId !== undefined && typeof tweetId === "string") {
    try {
      tweet = await downloadTweet(tweetId);
    } catch (error) {
      console.error(error);
      tweet = error;
    }
  }

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-start m-0 p-24">
      <p className="text-5xl">Twitter Media Downloader</p>
      <div className="flex flex-col items-center p-12">
        <MediaPreview tweet={tweet} query={tweetId} />
      </div>
    </main>
  );
}
