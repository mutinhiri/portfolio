/**
 * useSEO.js — FlexiLogic Africa
 * ─────────────────────────────────────────────────────────────
 * Dynamically updates <head> meta tags on every route change.
 * No external dependency needed — pure DOM manipulation.
 *
 * USAGE:
 *
 *   import { useSEO } from "./useSEO";
 *
 *   // In any page component:
 *   useSEO({
 *     title:       "Page Title | FlexiLogic Africa",
 *     description: "Short description for Google (150–160 chars).",
 *     canonical:   "https://flexilogic.africa/blog/your-slug",
 *     ogImage:     "https://flexilogic.africa/og-blog-slug.png",
 *     type:        "article",          // "website" (default) | "article"
 *     publishedAt: "2025-02-12",       // ISO date, articles only
 *     keywords:    "tag1, tag2, tag3", // optional
 *   });
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect } from "react";

const SITE_NAME   = "FlexiLogic Africa";
const DEFAULT_IMG = "https://flexilogic.africa/og-image.png";
const TWITTER     = "@flexilogicafrica";

/**
 * Set or create a <meta> tag by attribute selector.
 * @param {string} attr   - The attribute to match on, e.g. "name" or "property"
 * @param {string} value  - The value of that attribute, e.g. "description"
 * @param {string} content - The content to set
 */
function setMeta(attr, value, content) {
  let el = document.querySelector(`meta[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Set or create a <link rel="canonical"> tag.
 */
function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

/**
 * useSEO — call at the top of any page component.
 *
 * @param {object} options
 * @param {string}  options.title        - Full page title (appears in browser tab + Google)
 * @param {string}  options.description  - Meta description (150–160 chars ideal)
 * @param {string}  options.canonical    - Canonical URL for this page
 * @param {string}  [options.ogImage]    - Open Graph image URL (1200×630px recommended)
 * @param {string}  [options.type]       - "website" | "article"  (default: "website")
 * @param {string}  [options.publishedAt]- ISO date string for articles (e.g. "2025-02-12")
 * @param {string}  [options.keywords]   - Comma-separated keywords
 */
export function useSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMG,
  type = "website",
  publishedAt,
  keywords,
}) {
  useEffect(() => {
    // ── <title> ──────────────────────────────────────────────
    document.title = title;

    // ── Primary meta ────────────────────────────────────────
    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("name", "robots", "index, follow");

    // ── Canonical ────────────────────────────────────────────
    if (canonical) setCanonical(canonical);

    // ── Open Graph ───────────────────────────────────────────
    setMeta("property", "og:title",       title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url",         canonical || window.location.href);
    setMeta("property", "og:image",       ogImage);
    setMeta("property", "og:type",        type);
    setMeta("property", "og:site_name",   SITE_NAME);
    setMeta("property", "og:locale",      "en_ZW");

    if (type === "article" && publishedAt) {
      setMeta("property", "article:published_time", publishedAt);
      setMeta("property", "article:author",         SITE_NAME);
    }

    // ── Twitter / X Card ─────────────────────────────────────
    setMeta("name", "twitter:card",        "summary_large_image");
    setMeta("name", "twitter:site",        TWITTER);
    setMeta("name", "twitter:title",       title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image",       ogImage);

    // ── Cleanup: restore defaults when component unmounts ────
    return () => {
      document.title = `${SITE_NAME} — Software Engineering Studio, Harare Zimbabwe`;
      setMeta("property", "og:type", "website");
    };
  }, [title, description, canonical, ogImage, type, publishedAt, keywords]);
}

/**
 * articleJsonLd — inject Article structured data for blog posts.
 * Call alongside useSEO in article pages.
 *
 * @param {object} options
 */
export function useArticleJsonLd({ title, description, slug, publishedAt, author = "FlexiLogic Team" }) {
  useEffect(() => {
    const id = "article-jsonld";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("script");
      el.id   = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context":         "https://schema.org",
      "@type":            "Article",
      "headline":         title,
      "description":      description,
      "author": {
        "@type": "Organization",
        "name":  author,
        "url":   "https://flexilogic.africa",
      },
      "publisher": {
        "@type": "Organization",
        "name":  "FlexiLogic Africa",
        "logo": {
          "@type": "ImageObject",
          "url":   "https://flexilogic.africa/logo.png",
        },
      },
      "datePublished":    publishedAt,
      "dateModified":     publishedAt,
      "mainEntityOfPage": `https://flexilogic.africa/blog/${slug}`,
      "url":              `https://flexilogic.africa/blog/${slug}`,
    });

    return () => { el?.remove(); };
  }, [title, description, slug, publishedAt]);
}