import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "DA VE Portfolio | Frontend Developer",
    template: "%s | DA VE Portfolio",
  },

  description:
    "DA VE Portfolio by Dave, a frontend developer specializing in Next.js, React, and Tailwind CSS. View projects, services, and experience.",

  generator: "Next.js",
  manifest: "/manifest.json",

  keywords: [
    "frontend developer",
    "nextjs developer",
    "react developer",
    "tailwind css",
    "portfolio website",
    "web developer",
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

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: "/LOGO-128.png",
    apple: "/LOGO-128.png",
  },

  openGraph: {
    title: "ryandave Portfolio",
    description:
      "Explore Dave's web development projects, creative services, and contact details — built with Next.js and Tailwind CSS.",
    url: "https://ryandave.vercel.app",
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
