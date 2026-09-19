export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: Record<string, any>;
}

export interface PropertySEO extends SEOMetadata {
  price?: number;
  type?: string;
  area?: number;
  bedrooms?: number;
  location?: string;
}

export class SEOService {
  static generatePropertySEO(property: {
    id: string;
    title: string;
    description: string;
    price: number;
    type: string;
    area: number;
    bedrooms: number;
    address: string;
    image?: string;
  }): PropertySEO {
    const url = `https://ulotty.com/propiedades/${property.id}`;
    
    return {
      title: `${property.title} - ${property.price.toLocaleString('es-MX')} | Ulotty`,
      description: property.description.substring(0, 160),
      keywords: [
        property.type,
        'propiedad inmobiliaria',
        'comprar',
        'venta',
        property.address.split(',')[0],
      ],
      canonical: url,
      ogTitle: property.title,
      ogDescription: property.description,
      ogImage: property.image || 'https://ulotty.com/og-default.jpg',
      ogUrl: url,
      twitterCard: 'summary_large_image',
      twitterTitle: property.title,
      twitterDescription: property.description,
      twitterImage: property.image,
      price: property.price,
      type: property.type,
      area: property.area,
      bedrooms: property.bedrooms,
      location: property.address,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'RealEstateProperty',
        name: property.title,
        description: property.description,
        image: property.image,
        price: {
          '@type': 'PriceSpecification',
          priceCurrency: 'MXN',
          price: property.price,
        },
        floorSize: {
          '@type': 'QuantitativeValue',
          unitCode: 'MTK',
          value: property.area,
        },
        numberOfBedrooms: property.bedrooms,
        url: url,
        datePublished: new Date().toISOString(),
      },
    };
  }

  static generatePageSEO(page: {
    title: string;
    description: string;
    url: string;
    image?: string;
    keywords?: string[];
  }): SEOMetadata {
    return {
      title: `${page.title} | Ulotty`,
      description: page.description,
      canonical: page.url,
      ogTitle: page.title,
      ogDescription: page.description,
      ogImage: page.image || 'https://ulotty.com/og-default.jpg',
      ogUrl: page.url,
      keywords: page.keywords,
      twitterCard: 'summary',
      twitterTitle: page.title,
      twitterDescription: page.description,
      twitterImage: page.image,
    };
  }

  static generateSitemap(urls: Array<{ loc: string; lastmod: string; priority: number }>): string {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
    return xml;
  }

  static generateRobotsTxt(): string {
    return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /.env

Sitemap: https://ulotty.com/sitemap.xml
`;
  }
}
