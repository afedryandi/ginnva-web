import { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/seo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ginnva.id';

async function getNewsSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/news?limit=100`, {
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    return (json.data || [])
      .filter((n: { source_url: string | null }) => !n.source_url)
      .map((n: { slug: string }) => n.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/brand`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/product/kaca-film-mobil`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/product/film-pelindung-cat`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/product/film-pengubah-warna`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/product/film-kaca-bangunan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/warranty`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/dealers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/quote`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${SITE_URL}/case`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/kemitraan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/karier`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/legal`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ];

  const slugs = await getNewsSlugs();
  const newsPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/news/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...newsPages];
}