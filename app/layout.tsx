import "./globals.css";

export const metadata = {
  title: "Twitter Media Downloader",
  description: "This apps helps you download media files from tweets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
