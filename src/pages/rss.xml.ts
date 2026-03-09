import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../../site.config';

export async function GET(context: any) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const sorted = [...articles].sort(
    (a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime()
  );

  return rss({
    title: siteConfig.name,
    description: siteConfig.tagline,
    site: context.site,
    items: sorted.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedDate,
      link: `/${article.data.category}/${article.slug}/`,
    })),
  });
}
