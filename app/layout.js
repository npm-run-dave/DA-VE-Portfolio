import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DA VE Portfolio",
  description:
    "A modern developer portfolio by Dave — showcasing web development, design, and interactive projects built with Next.js and Tailwind CSS.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "nextjs",
    "next14",
    "pwa",
    "frontend developer",
    "fullstack developer",
    "portfolio",
    "react",
    "tailwindcss",
  ],
  authors: [
    {
      name: "imvinojanv",
      url: "https://www.linkedin.com/in/imvinojanv/",
    },
  ],
  openGraph: {
    title: "DA VE Portfolio",
    description:
      "Explore Dave's web development projects, creative services, and contact details — built with Next.js 14, Tailwind, and Vercel.",
    url: "https://da-ve-portfolio.vercel.app/",
    siteName: "DA VE Portfolio",
    images: [
      {
        url: "https://da-ve-portfolio.vercel.app/LOGO-128.png",
        width: 1200,
        height: 630,
        alt: "DA VE Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: [
    { rel: "apple-touch-icon", url: "/LOGO-128.png" },
    { rel: "icon", url: "/LOGO-128.png" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="zrr_4MxKf4tBpVG93XQb-neL0lwwrK9sa0jD-BMXd2E"
        />

        {/* ✅ Basic SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dave" />

        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />

        <meta property="og:image" content="/LOGO-128.png" />
        <meta property="og:type" content="website" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
