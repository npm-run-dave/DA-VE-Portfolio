export async function GET() {
  const baseUrl = "https://da-ve-portfolio.vercel.app";

  const routes = ["", "projects", "services", "experience", "contact"].map(
    (route) => ({
      loc: `${baseUrl}/${route}`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: route === "" ? 1.0 : 0.8,
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (url) => `<url>
  <loc>${url.loc}</loc>
  <lastmod>${url.lastmod}</lastmod>
  <changefreq>${url.changefreq}</changefreq>
  <priority>${url.priority}</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
