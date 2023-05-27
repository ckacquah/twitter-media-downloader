import Image from "next/image";

function MediaPreviewCardDownloadButton({
  downloadUrl,
  name,
}: {
  downloadUrl: string;
  name: string;
}) {
  return (
    <a
      href={downloadUrl}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
    >
      {name.toUpperCase()}
      <svg
        aria-hidden="true"
        className="w-4 h-4 ml-2 -mr-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </a>
  );
}

export default function MediaPreviewCard({ media }: { media: TweetMedia }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <a href={media.tweetUrl}>
        <Image
          className="rounded-t-lg"
          src={media.previewUrl}
          width={300}
          height={300}
          alt="Tweet media preview"
        />
      </a>
      <div className="p-5">
        {media.downloadUrl !== undefined && (
          <MediaPreviewCardDownloadButton
            downloadUrl={media.downloadUrl ?? ""}
            name={"download"}
          />
        )}
        {media.downloadUrl === undefined &&
          media.downloadVariants?.map((variant, index) => {
            return (
              <div className="py-2 m-0" key={index}>
                <MediaPreviewCardDownloadButton
                  downloadUrl={variant.downloadUrl}
                  name={
                    variant.resolution === undefined
                      ? variant.contentType
                      : `${variant.contentType} (${variant.resolution})`
                  }
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
