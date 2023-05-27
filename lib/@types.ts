interface TweetMediaDownoadVariants {
  contentType: string;
  downloadUrl: string;
  resolution?: string;
}

interface TweetMedia {
  type: "photo" | "animated_gif" | "video";
  tweetUrl: string;
  previewUrl: string;
  downloadUrl?: string;
  downloadVariants?: TweetMediaDownoadVariants[];
}
