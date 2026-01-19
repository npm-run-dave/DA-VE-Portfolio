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
      name: "Dave",
      url: "https://www.linkedin.com/in/imvinojanv/",
    },
  ],

  metadataBase: new URL("https://ryandave.vercel.app"),

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/LOGO-128.png",
    apple: "/LOGO-128.png",
  },

  openGraph: {
    title: "ryandave Portfolio",
    description:
      "Explore Dave's web development projects, creative services, and contact details — built with Next.js 14, Tailwind, and Vercel.",
    url: "https://da-ve-portfolio.vercel.app/",
    siteName: "ryandave Portfolio",
    images: [
      {
        url: "/LOGO-128.png",
        width: 1200,
        height: 630,
        alt: "ryandave Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ryandave Portfolio",
    description:
      "Explore Dave's web development projects, creative services, and contact details.",
    images: ["/LOGO-128.png"],
    creator: "@imvinojanv",
  },

  verification: {
    facebook: "q8a8ladzrqvaanzxmka7i3wzugq4lb",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
