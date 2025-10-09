export default function robots() {
  const baseUrl = "https://ryandave.vercel.app";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
