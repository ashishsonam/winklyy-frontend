const path = require('path');
const fs = require('fs');

const baseUrl = 'https://www.winklyy.com';
const now = new Date().toISOString();

const dest = path.resolve('./public', 'sitemap.xml');

const routes = [
  '/',
  '/home',
  '/about',
  '/contactus',
  '/login',
  '/signup',
  '/social',
  '/404',
];

const staticRoutes = routes.map((route) => {
  return `
    <url>
      <loc>${baseUrl}${route}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1</priority>
    </url>`;
});

// Generate sitemap and return Sitemap instance
const sitemap = `<?xml version="1.0" encoding="UTF-8"?> 
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes}
</urlset>`.replaceAll(',', '');

// write sitemap.xml file in /public folder
// Access the sitemap content by converting it with .toString() method
fs.writeFileSync(dest, sitemap.toString());
