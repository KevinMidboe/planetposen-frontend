import type { IProductsDTO } from '$lib/interfaces/ApiResponse';

const domain = 'planet.schleppe.cloud';
const pages: Array<ISitemapPage> = [
  {
    name: 'home',
    modified: '2022-11-16T14:00:00.000Z'
  },
  {
    name: 'shop',
    modified: '2022-11-16T14:00:00.000Z'
  },
  {
    name: 'privacy-policy',
    modified: '2022-11-16T14:00:00.000Z'
  },
  {
    name: 'cookies',
    modified: '2022-11-16T14:00:00.000Z'
  },
  {
    name: 'terms-and-condition',
    modified: '2022-11-16T14:00:00.000Z'
  }
];

interface ISitemapPage {
  name: string;
  modified: string;
}

export async function GET() {
  const body = await buildSitemap();
  const headers = {
    'Content-Type': 'application/xml',
    'Cache-Control': `max-age=0, s-max-age=${3600}`
  };

  return new Response(body, { headers });
}

function buildSitemapUrl(path: string, modified: string, frequency: string) {
  return `<url>
 <loc>https://${domain}${path}</loc>
  <lastmod>${modified}</lastmod>
  <changefreq>${frequency}</changefreq>
</url>`;
}

function sitemapPages(): string {
  return pages.map((page) => buildSitemapUrl(`/${page.name}`, page.modified, 'yearly')).join('\n');
}

async function sitemapShopPages(): Promise<string> {
  const res = await fetch('/api/products');
  const productResponse: IProductsDTO = await res.json();

  return productResponse?.products
    ?.map((product) =>
      buildSitemapUrl(`/shop/${product.product_no}`, String(product.updated), 'daily')
    )
    .join('\n');
}

async function buildSitemap(): Promise<string> {
  const generalPages = sitemapPages();
  const shopPages = await sitemapShopPages();

  return `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${generalPages}
      ${shopPages}
    </urlset>`.trim();
}
