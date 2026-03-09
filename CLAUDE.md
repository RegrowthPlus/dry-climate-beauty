# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

An Astro-based blog site in the Regrowth+ content network. Deployed on Cloudflare Pages with auto-deploy from this GitHub repo. Articles are published daily by the Blog Factory pipeline (separate repo: `contextarchitect/regrowth-blog-factory`).

## Owner

Hilal Kanafani (@contextarchitect). Dubai-based.

## Key Files

- `site.config.ts` - **THE** config file. Site name, domain, variant (healthline/wirecutter), colors, categories. This is the ONLY file that changes between sites.
- `src/data/authors.json` - Author personas (name, bio, credentials, photo path)
- `src/data/categories.json` - Content categories (name, slug, description, intro paragraph)
- `src/content/articles/` - Markdown articles with Zod-validated frontmatter
- `src/content/config.ts` - Frontmatter schema definition
- `src/styles/global.css` - CSS custom properties for both variants

## Commands

```bash
npm install              # Install dependencies
npm run dev              # Dev server (localhost:4321)
npm run build            # Production build (static output for Cloudflare Pages)
npm run preview          # Preview production build locally
```

## Template Variants

This template supports two visual variants controlled by `site.config.ts`:

- **`"healthline"`** - Warm, trust-heavy editorial (teal accent, DM Serif Display + Inter/DM Sans, rounded cards, medical review boxes, Key Takeaways)
- **`"wirecutter"`** - Clean newspaper editorial (navy + brass, Playfair Display + Source Sans 3, square cards, product callout boxes, comparison tables)

Switching variants: change `variant` in `site.config.ts`. CSS custom properties on `:root[data-variant]` handle all color/font/spacing differences. Components with structural differences use conditional rendering.

## Image Generation (IMPORTANT)

**When building or configuring a new blog site, ALWAYS generate real images. Never leave placeholder paths without actual files.**

The Blog Factory repo (`contextarchitect/regrowth-blog-factory`) has an image generation script that uses the Kie.ai API (Nano Banana 2 model). The `KIE_API_KEY` environment variable is already set on the VPS.

### How to generate images

From the Blog Factory repo directory:

```bash
cd ~/regrowth-blog-factory
export PYTHONPATH=$(pwd)/src:$PYTHONPATH

# Author headshot (provide physical description, prompt is auto-generated)
python3 -m scripts.generate_site_images headshot \
  --name "Author Name" \
  --description "Male, mid 30s, short dark hair, clean-shaven, professional, wearing navy sweater" \
  --output ~/this-site-repo/public/images/authors/author-slug.webp

# Homepage hero background
python3 -m scripts.generate_site_images hero \
  --prompt "VISIBLE LAYER:\nYour three-layer prompt here..." \
  --ratio 21:9 \
  --output ~/this-site-repo/public/images/site/hero-bg.webp

# Batch mode (most efficient - generate everything at once)
python3 -m scripts.generate_site_images batch \
  --manifest ~/image-manifest.json \
  --output-dir ~/this-site-repo/
```

### What images a site needs

| Image | Path | Aspect Ratio | How to Generate |
|-------|------|-------------|-----------------|
| Author headshots | `public/images/authors/{slug}.webp` | 1:1 | `headshot` command with physical description |
| Homepage hero | `public/images/site/hero-bg.webp` | 21:9 | `hero` command with full Three-Layer prompt |
| Category icons | `public/images/categories/{slug}.webp` | 1:1 | `custom` type in batch manifest |
| Article hero images | `public/images/articles/{slug}-hero.webp` | 16:9 (WC) or 3:2 (HL) | `hero` command or `custom` in batch |

### Batch manifest format

```json
{
  "images": [
    {"type": "headshot", "name": "Author Name", "description": "Physical desc", "output": "public/images/authors/slug.webp"},
    {"type": "hero", "prompt": "Full prompt...", "ratio": "21:9", "resolution": "2K", "output": "public/images/site/hero.webp"},
    {"type": "custom", "prompt": "Icon prompt...", "ratio": "1:1", "resolution": "1K", "output": "public/images/categories/slug.webp"}
  ]
}
```

### Headshot descriptions

When generating headshots, describe the person naturally. The script wraps your description in a Three-Layer Constraint Framework prompt optimized for editorial author photos. Include: gender, approximate age, ethnicity/complexion, hair style, facial hair, expression, and clothing.

## Article Frontmatter Schema

Required fields for pipeline-published articles:
```yaml
---
title: "Article Title" # max 70 chars
description: "Meta description" # max 160 chars
category: "category-slug"
author: "author-slug"
publishedDate: 2026-03-07
heroImage: "/images/articles/slug-hero.webp"
heroAlt: "Descriptive alt text"
---
```

Optional fields: `updatedDate`, `reviewedBy`, `readingTime`, `tags`, `featured`, `draft`, `titleTag`, `canonicalUrl`, `noindex`, `hasAffiliateLinks`, `faqItems`

## Content Rules

- No em dashes or en dashes
- No AI vocabulary: delve, arguably, notably, underscore, leverage, robust, comprehensive
- Use contractions naturally
- Paragraph max: 4 sentences (most 2-3)
- Open with the problem within first 3 sentences
- NEVER name specific GCC cities or countries — use "the GCC", "the Gulf", "the region"
- Environmental angle (water, climate, heat) in every article
- FTC disclosure at top of articles with affiliate links
- Regrowth+ mentioned as one option among many, never exclusively promoted

## Network Context

This site is part of a multi-blog network. Network docs live in `contextarchitect/regrowth-blog-factory`:
- `docs/NETWORK-REGISTRY.md` - All platforms, their purposes, and keyword themes
- `docs/PLATFORM-BRANDING.md` - Full branding specs per site
- `docs/CONTENT-LOG.md` - All published articles across all sites (check for overlap before adding topics)

## Deployment

- Cloudflare Pages (static output, auto-deploy from GitHub main branch)
- DNS: CNAME to Cloudflare Pages domain
- SSL: Auto-provisioned by Cloudflare
- Build command: `npm run build`
- Output directory: `dist`
