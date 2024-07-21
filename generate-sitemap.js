import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obteniendo el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Lista de rutas de tu aplicación
const links = [
  { url: '/', changefreq: 'daily', priority: 0.9 },
  { url: '/especie/48662', changefreq: 'monthly', priority: 0.7 },
  { url: '/especie/41970', changefreq: 'monthly', priority: 0.7 },
  { url: '/especie/20856', changefreq: 'monthly', priority: 0.7 },
  { url: '/especie/39677', changefreq: 'monthly', priority: 0.7 },
  { url: '/especie/26777', changefreq: 'monthly', priority: 0.7 },
  { url: '/especie/41443', changefreq: 'monthly', priority: 0.7 },
  { url: '/especie/5355', changefreq: 'monthly', priority: 0.7 },
  { url: '/especie/42652', changefreq: 'monthly', priority: 0.7 },
  
  // Agrega más rutas según tu aplicación
];

// Generar el sitemap
const stream = new SitemapStream({ hostname: 'https://biodiversityai.netlify.app' });
const xml = streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
  data.toString()
);

xml.then((sitemap) => {
  fs.writeFileSync(path.resolve(__dirname, 'public', 'sitemap.xml'), sitemap);
});