export async function GET() {
  const baseUrl = "https://da-ve-portfolio.vercel.app";

  const urls = [
    { loc: `${baseUrl}/`, priority: 1.0 },
    { loc: `${baseUrl}/projects`, priority: 0.9 },
    { loc: `${baseUrl}/services`, priority: 0.8 },
    { loc: `${baseUrl}/experience`, priority: 0.7 },
    { loc: `${baseUrl}/contact`, priority: 0.6 },
  ];

  const lastmod = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url>
  <loc>${url.loc}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>monthly</changefreq>
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
