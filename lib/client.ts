const TWITTER_API_ENDPOINT = "https://api.twitter.com/2";

export function extractStatusIdFromUrl(url: string): string {
  url = url.startsWith("https://") ? url : "https://" + url;
  const _url = new URL(url);
  if (
    _url.hostname !== "twitter.com" ||
    !_url.pathname.match(/^\S+\/status\/\d+$/)
  ) {
    throw new Error("Invalid twitter status url ");
  }

  return _url.pathname.split("/").pop() ?? "";
}

export async function downloadTweet(tweetUrl: string) {
  const tweetId = extractStatusIdFromUrl(tweetUrl);
  const params = new URLSearchParams({
    expansions: "attachments.media_keys",
    "media.fields": "media_key,url,preview_image_url,alt_text,variants",
  });

  try {
    const response = await fetch(
      `${TWITTER_API_ENDPOINT}/tweets/${tweetId}?${params}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        }),
      }
    );

    if (response.status !== 200) {
      throw new Error("Cannot be found tweet");
    }

    return response.json();
  } catch (error) {
    throw new Error("Failed to download tweet");
  }
}

export function extractMediaFromTweet(tweet: any): TweetMedia[] {
  const results: TweetMedia[] = [];
  tweet?.includes?.media?.forEach((media: any) => {
    if (media.type !== undefined) {
      if (media.type === "photo") {
        results.push({
          previewUrl: media.url,
          downloadUrl: media.url,
        });
      }
      if (media.type === "animated_gif" || media.type === "video") {
        results.push({
          previewUrl: media.preview_image_url,
          downloadUrl: media.variants[0].url,
        });
      }
    }
  });
  return results;
}
