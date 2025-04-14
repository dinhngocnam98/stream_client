const {SitemapStream, streamToPromise} = require('sitemap');
const fs = require('fs');

// Danh sách các URL của bạn
const links = [
  {url: '/', changefreq: 'daily', priority: 1.0},
  {url: '/about', changefreq: 'weekly', priority: 0.8},
  {url: '/contact', changefreq: 'monthly', priority: 0.7},
];

(async () => {
  const stream = new SitemapStream({hostname: 'https://yourdomain.com'});
  links.forEach(link => stream.write(link));
  stream.end();

  const sitemap = await streamToPromise(stream).then(sm => sm.toString());

  // Ghi sitemap.xml vào thư mục public
  fs.writeFileSync('./public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully!');
})();
