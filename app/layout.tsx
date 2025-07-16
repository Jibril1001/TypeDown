import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TypeDown | Simple and Fast Markup Editor",
  description: "TypeDown is a clean, fast, and minimal markup editor for developers and writers.",
  keywords: ["markup editor", "markdown editor", "TypeDown", "minimal editor", "code editor"],
  authors: [{ name: "Jibril Mustefa and Elnata Getu", url: "https://vercel.com/jibril1001s-projects/type-down" }],
  creator: "Jibril Mustefa and Elnata Getu",
  openGraph: {
    title: "TypeDown | Simple and Fast Markup Editor",
    description: "Write and edit markup with ease using TypeDown.",
    url: "https://vercel.com/jibril1001s-projects/type-down",
    siteName: "TypeDown",
    type: "website",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist&family=Geist+Mono&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
