# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Dry Climate Beauty (dryclimatebeauty.com) — an Astro-based blog site in the Regrowth+ content network. Healthline variant. Deployed on Cloudflare Pages with auto-deploy from this GitHub repo. Articles are published daily by the Blog Factory pipeline (separate repo: `contextarchitect/regrowth-blog-factory`, platform ID: `blog_007`).

## Owner

Hilal Kanafani (@contextarchitect). Dubai-based.

## Key Files

- `site.config.ts` - Site name, domain, variant (healthline), colors, categories.
- `src/data/authors.json` - 4 author personas (Emma Calloway, Dr. Layla Hassan, Nadia Serhan, Priya Mehta)
- `src/data/categories.json` - 6 content categories
- `src/content/articles/` - Markdown articles with Zod-validated frontmatter
- `src/content/config.ts` - Frontmatter schema definition
- `src/styles/global.css` - CSS custom properties

## Commands

```bash
npm install              # Install dependencies
npm run dev              # Dev server (localhost:4321)
npm run build            # Production build (static output for Cloudflare Pages)
npm run preview          # Preview production build locally
```

## CRITICAL: Data Format Constraints

These constraints are enforced by the Zod schema and Astro template code. Violations cause Cloudflare build failures. **Always validate before pushing.**

### Article Frontmatter Limits (Zod schema in `src/content/config.ts`)

| Field | Constraint | What happens if violated |
|-------|-----------|--------------------------|
| `title` | **Max 70 characters** | Build fails: `InvalidContentEntryDataError` |
| `description` | **Max 160 characters** | Build fails: `InvalidContentEntryDataError` |
| `category` | Must match a slug in `categories.json` | Article won't render on category pages |
| `author` | Must match a key in `authors.json` | Author page 404s |
| `publishedDate` | Must be a valid date (YYYY-MM-DD) | Build fails |
| `heroImage` | Path must have a corresponding file in `public/` | Broken image on page |

**Before pushing any article**, count the title and description characters. A title of 71 characters will break the entire site build.

### categories.json Format (MUST be an array, NOT an object)

The template's components call `categories.find(c => c.slug === slug)` which requires an **array of objects**. Using an object keyed by slug will cause `categories.find is not a function` build errors.

**Correct format:**
```json
[
  {
    "name": "Hair & Scalp",
    "slug": "hair-scalp",
    "description": "...",
    "intro": "..."
  }
]
```

### authors.json Format (MUST be an object keyed by slug)

The template's `getStaticPaths()` calls `Object.entries(authors)` which requires an **object keyed by author slug**. This is the opposite of categories.json.

### Pre-Push Validation Checklist

Before pushing content to this repo, verify:

- [ ] All article titles are **70 characters or fewer**
- [ ] All article descriptions are **160 characters or fewer**
- [ ] `categories.json` is an **array** (starts with `[`, not `{`)
- [ ] `authors.json` is an **object keyed by slug** (starts with `{`)
- [ ] Every `heroImage` path in frontmatter has a corresponding file in `public/images/articles/`
- [ ] Every `author` slug in frontmatter has a matching key in `authors.json`
- [ ] Every `category` slug in frontmatter has a matching `slug` field in `categories.json`
- [ ] Run `npm run build` locally before pushing if making structural changes

## DCB-Specific: Editorial Voice

- Healthline variant: warm, empathetic, medically reviewed
- Second-person empathetic: "If you've noticed...", "What you can do..."
- Key Takeaways box mandatory on every article
- Medical reviewer: Dr. Layla Hassan (on all YMYL/health articles)
- Hedge language: "may", "research suggests", "some studies show"
- Author rotation: Emma Calloway (primary), Nadia Serhan (motherhood), Priya Mehta (nutrition)
- Geographic scope broader than GCC (also Arizona, Australia, Spain, California)

## Image Generation

The Blog Factory repo (`contextarchitect/regrowth-blog-factory`) has an image generation script. The `KIE_API_KEY` is set on the VPS. **Always prefer batch mode** for generating multiple images concurrently.

```bash
cd ~/regrowth-blog-factory
export PYTHONPATH=$(pwd)/src:$PYTHONPATH

# Batch mode (concurrent - generates all images at once)
python3 -m scripts.generate_site_images batch \
  --manifest ~/image-manifest.json \
  --output-dir ~/dry-climate-beauty/

# Single headshot
python3 -m scripts.generate_site_images headshot \
  --name "Author Name" \
  --description "Physical description" \
  --output ~/dry-climate-beauty/public/images/authors/slug.webp

# Single custom image
python3 -m scripts.generate_site_images custom \
  --prompt "Prompt text" \
  --ratio 1:1 \
  --output ~/dry-climate-beauty/public/images/categories/slug.webp
```

## Article Frontmatter Schema

```yaml
---
title: "Article Title"       # STRICT MAX: 70 characters
description: "Meta desc"     # STRICT MAX: 160 characters
category: "category-slug"    # Must match categories.json
author: "author-slug"        # Must match authors.json
reviewedBy: "dr-layla-hassan"  # Required on all YMYL articles
publishedDate: 2026-03-07
heroImage: "/images/articles/slug-hero.webp"
heroAlt: "Descriptive alt text"
readingTime: 7
tags: ["tag1", "tag2"]
featured: false
hasAffiliateLinks: false
---
```

## Content Rules

- No em dashes or en dashes
- No AI vocabulary: delve, arguably, notably, underscore, leverage, robust, comprehensive
- Use contractions naturally
- Paragraph max: 4 sentences (most 2-3)
- Open with the problem within first 3 sentences
- NEVER name specific GCC cities or countries
- Environmental angle (water, climate, heat) in every article
- Regrowth+ mentioned as one option among many, never exclusively promoted

## Network Context

Network docs in `contextarchitect/regrowth-blog-factory`:
- `docs/NETWORK-REGISTRY.md` - All platforms
- `docs/PLATFORM-BRANDING.md` - Full branding specs per site
- `docs/CONTENT-LOG.md` - All published articles (check for overlap)
- `docs/DCB_Keyword_Schedule.md` - DCB 30-day editorial calendar

## Deployment

- Cloudflare Pages (auto-deploy from main branch)
- Build command: `npm run build`
- Output directory: `dist`
