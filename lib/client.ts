const TWITTER_API_ENDPOINT = "https://api.twitter.com/2";

export async function downloadTweet(tweetId: string) {
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
    console.error(error);
    throw new Error("Failed to download tweet");
  }
}

export function extractMediaFromTweet(tweet: any): TweetMedia[] {
  const results: TweetMedia[] = [];
  tweet !== undefined &&
    tweet.includes !== undefined &&
    tweet.includes.media !== undefined &&
    tweet.includes.media.forEach((media: any) => {
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
