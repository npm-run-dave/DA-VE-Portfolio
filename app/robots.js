export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://da-ve-portfolio.vercel.app/sitemap.xml",
    host: "https://da-ve-portfolio.vercel.app",
  };
}
