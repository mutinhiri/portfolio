/**
 * useSEO.js — FlexiLogic Africa
 * ─────────────────────────────────────────────────────────────
 * Dynamically updates <head> meta tags on every route change.
 *
 * EXPORTS:
 *   useSEO(options)            — updates all meta tags per page
 *   useArticleJsonLd(options)  — injects Article JSON-LD for blog posts
 *   useBreadcrumb(crumbs)      — injects BreadcrumbList JSON-LD
 *
 * USAGE — Homepage:
 *   useSEO({
 *     title:       "FlexiLogic Africa — Software Engineering Studio",
 *     description: "...",
 *     canonical:   "https://flexilogic.africa/",
 *   });
 *
 * USAGE — Blog article:
 *   useSEO({ title, description, canonical, type: "article", publishedAt });
 *   useArticleJsonLd({ title, description, slug, publishedAt });
 *   useBreadcrumb([
 *     { name: "Home",  url: "https://flexilogic.africa/" },
 *     { name: "Blog",  url: "https://flexilogic.africa/blog" },
 *     { name: "Article Title", url: "https://flexilogic.africa/blog/slug" },
 *   ]);
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect } from "react";

const SITE_NAME   = "FlexiLogic Africa";
const BASE_URL    = "https://flexilogic.africa";
const DEFAULT_IMG = `${BASE_URL}/og-image.png`;

// ─── Helpers ──────────────────────────────────────────────────

function setMeta(attr, value, content) {
  let el = document.querySelector(`meta[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

function injectJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.id   = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
  return el;
}

// ─── useSEO ───────────────────────────────────────────────────

/**
 * @param {object} options
 * @param {string}  options.title
 * @param {string}  options.description
 * @param {string}  options.canonical
 * @param {string}  [options.ogImage]
 * @param {string}  [options.type]        "website" | "article"
 * @param {string}  [options.publishedAt] ISO date for articles
 * @param {string}  [options.keywords]
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
    document.title = title;

    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("name", "robots", "index, follow");

    if (canonical) setCanonical(canonical);

    // Open Graph
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

    // Twitter / X
    setMeta("name", "twitter:card",        "summary_large_image");
    setMeta("name", "twitter:title",       title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image",       ogImage);

    return () => {
      document.title = `${SITE_NAME} — Software Engineering Studio, Harare Zimbabwe`;
      setMeta("property", "og:type", "website");
    };
  }, [title, description, canonical, ogImage, type, publishedAt, keywords]);
}

// ─── useArticleJsonLd ─────────────────────────────────────────

/**
 * Injects Article structured data for blog posts.
 * @param {object} options
 * @param {string} options.title
 * @param {string} options.description
 * @param {string} options.slug
 * @param {string} options.publishedAt   ISO date e.g. "2025-02-12"
 * @param {string} [options.author]
 */
export function useArticleJsonLd({
  title,
  description,
  slug,
  publishedAt,
  author = "FlexiLogic Team",
}) {
  useEffect(() => {
    const el = injectJsonLd("article-jsonld", {
      "@context":         "https://schema.org",
      "@type":            "Article",
      "headline":         title,
      "description":      description,
      "author": {
        "@type": "Organization",
        "name":  author,
        "url":   BASE_URL,
      },
      "publisher": {
        "@type": "Organization",
        "name":  SITE_NAME,
        "logo":  { "@type": "ImageObject", "url": `${BASE_URL}/logo.png` },
      },
      "datePublished":    publishedAt,
      "dateModified":     publishedAt,
      "mainEntityOfPage": `${BASE_URL}/blog/${slug}`,
      "url":              `${BASE_URL}/blog/${slug}`,
      "image":            DEFAULT_IMG,
    });
    return () => el?.remove();
  }, [title, description, slug, publishedAt]);
}

// ─── useBreadcrumb ────────────────────────────────────────────

/**
 * Injects BreadcrumbList JSON-LD.
 * Shows "Home > Blog > Article" in Google results — improves
 * click-through rate and helps Google understand site structure.
 *
 * @param {Array<{name: string, url: string}>} crumbs
 *
 * @example
 *   useBreadcrumb([
 *     { name: "Home",  url: "https://flexilogic.africa/" },
 *     { name: "Blog",  url: "https://flexilogic.africa/blog" },
 *     { name: "Web Platforms in Zimbabwe", url: "https://flexilogic.africa/blog/web-platforms-zimbabwe" },
 *   ]);
 */
export function useBreadcrumb(crumbs) {
  useEffect(() => {
    if (!crumbs?.length) return;

    const el = injectJsonLd("breadcrumb-jsonld", {
      "@context": "https://schema.org",
      "@type":    "BreadcrumbList",
      "itemListElement": crumbs.map((crumb, i) => ({
        "@type":    "ListItem",
        "position": i + 1,
        "name":     crumb.name,
        "item":     crumb.url,
      })),
    });
    return () => el?.remove();
  }, [JSON.stringify(crumbs)]);
}