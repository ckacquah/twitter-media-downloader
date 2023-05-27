import { describe, expect, it } from "@jest/globals";
import { extractStatusIdFromUrl } from "./client";

describe("Extract status from twitter url", () => {
  it.each([
    [
      "https://twitter.com/ChemsYouTube/status/1662096435402387458?s=20",
      "1662096435402387458",
    ],
    [
      "twitter.com/ChemsYouTube/status/1662096435402387458?s=20",
      "1662096435402387458",
    ],
    [
      "https://twitter.com/zanele_makamo/status/1661716989176365056?t=02N1M9kzjYlYDY_SvKVFyA&s=19",
      "1661716989176365056",
    ],
    [
      "twitter.com/zanele_makamo/status/1661716989176365056?t=02N1M9kzjYlYDY_SvKVFyA&s=19",
      "1661716989176365056",
    ],
  ])(
    "expects status id extract from %p to be %p",
    (url: string, result: string) => {
      expect(extractStatusIdFromUrl(url)).toEqual(result);
    }
  );

  it.each([
    ["https://facebook.com/ChemsYouTube/status/1662096435402387458?s=20"],
    ["facebook.com/ChemsYouTube/status/1662096435402387458?s=20"],
    [
      "https://facebook.com/zanele_makamo/status/1661716989176365056?t=02N1M9kzjYlYDY_SvKVFyA&s=19",
    ],
    [
      "facebook.com/zanele_makamo/status/1661716989176365056?t=02N1M9kzjYlYDY_SvKVFyA&s=19",
    ],
    ["googlesearch?q="],
    ["temp/q="],
    ["https://google.com/search?q="],
    ["https://twitter.com/status/1662082737472172032"],
  ])(
    "expects invalid status path exception to be thrown for %p",
    (url: string) => {
      expect(() => extractStatusIdFromUrl(url)).toThrow(/Invalid Status URL/);
    }
  );
});
