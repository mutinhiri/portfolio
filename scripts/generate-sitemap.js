// scripts/generate-sitemap.js
import fs from 'fs';
import { BLOG_POSTS } from '../src/FlexilogicPortfolio.jsx';

const BASE = 'https://flexilogic.africa';
const today = new Date().toISOString().split('T')[0];

const staticUrls = [
  { loc: `${BASE}/`, priority: '1.0', changefreq: 'weekly' },
  { loc: `${BASE}/blog`, priority: '0.8', changefreq: 'weekly' },
];

const articleUrls = BLOG_POSTS.map(post => ({
  loc: `${BASE}/blog/${post.slug}`,
  priority: post.featured ? '0.9' : '0.8',
  changefreq: 'monthly',
}));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...articleUrls]
  .map(u => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`)
  .join('\n')}
</urlset>`;

fs.writeFileSync('./public/sitemap.xml', xml);
console.log(`✓ sitemap.xml generated with ${staticUrls.length + articleUrls.length} URLs`);