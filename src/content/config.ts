import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    // Required fields (pipeline must provide these)
    title: z.string().max(70),
    description: z.string().max(160),
    category: z.string(),
    author: z.string(),
    publishedDate: z.coerce.date(),
    heroImage: z.string(),
    heroAlt: z.string(),

    // Optional fields
    updatedDate: z.coerce.date().optional(),
    reviewedBy: z.string().optional(),
    readingTime: z.number().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),

    // SEO overrides
    titleTag: z.string().max(60).optional(),
    canonicalUrl: z.string().url().optional(),
    noindex: z.boolean().default(false),

    // Affiliate/disclosure
    hasAffiliateLinks: z.boolean().default(false),

    // Schema.org extras
    faqItems: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

export const collections = { articles };
