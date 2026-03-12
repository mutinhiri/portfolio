/**
 * App.jsx  —  FlexiLogic Africa
 * ─────────────────────────────
 * React Router v6 entry point.
 *
 * SETUP (if not done yet):
 *   npm install react-router-dom
 *
 * In your main.jsx / index.jsx make sure you render:
 *   import App from './App'
 *   ReactDOM.createRoot(document.getElementById('root')).render(<App />)
 *
 * FILE STRUCTURE expected:
 *   src/
 *     App.jsx                    ← this file
 *     FlexilogicPortfolio.jsx    ← home page  (rename/move as needed)
 *     FlexilogicBlogArticle.jsx  ← article template
 *     blog/
 *       building-school-management-system-zimbabwe.jsx
 *       why-african-startups-choose-flutter.jsx
 *       zero-downtime-deployments-node.jsx
 *       ... (one file per post, see HOW TO ADD A NEW POST below)
 *
 * ─────────────────────────────────────────────────────────────
 * HOW TO ADD A NEW BLOG POST:
 *
 *  1. Add an entry to BLOG_POSTS in FlexilogicPortfolio.jsx
 *     (cards on the portfolio automatically appear).
 *
 *  2. Copy FlexilogicBlogArticle.jsx → src/your-slug.jsx
 *     Fill in the ARTICLE const at the top of that file.
 *
 *  3. Import and add ONE line here in the blogRoutes array:
 *       { slug: "your-slug", component: lazy(() => import("./your-slug")) }
 *
 *  That's it. The route /blog/your-slug will work automatically.
 * ─────────────────────────────────────────────────────────────
 */

import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

import FlexilogicPortfolio from "./FlexilogicPortfolio";

/* ── Lazy-load each blog article for code-splitting ─────────── */
const SchoolManagementArticle = lazy(() =>
  import("./building-school-management-system-zimbabwe")
);
const FlutterArticle = lazy(() =>
  import("./why-african-startups-choose-flutter")
);
const DeploymentArticle = lazy(() =>
  import("./zero-downtime-deployments-node")
);

/* ── Service blog articles ───────────────────────────────────── */
const WebPlatformsArticle  = lazy(() => import("./web-platforms-zimbabwe"));
const MobileAppsArticle    = lazy(() => import("./mobile-apps-zimbabwe"));
const CloudDevOpsArticle   = lazy(() => import("./cloud-devops-africa"));
const AIAutomationArticle  = lazy(() => import("./ai-automation-africa"));
const CybersecurityArticle = lazy(() => import("./cybersecurity-zimbabwe"));
const DataAnalyticsArticle = lazy(() => import("./data-analytics-africa"));

/* ── Register your posts here ───────────────────────────────── */
const blogRoutes = [
  { slug: "building-school-management-system-zimbabwe", component: SchoolManagementArticle },
  { slug: "why-african-startups-choose-flutter",        component: FlutterArticle },
  { slug: "zero-downtime-deployments-node",             component: DeploymentArticle },
  { slug: "web-platforms-zimbabwe",                     component: WebPlatformsArticle },
  { slug: "mobile-apps-zimbabwe",                       component: MobileAppsArticle },
  { slug: "cloud-devops-africa",                        component: CloudDevOpsArticle },
  { slug: "ai-automation-africa",                       component: AIAutomationArticle },
  { slug: "cybersecurity-zimbabwe",                     component: CybersecurityArticle },
  { slug: "data-analytics-africa",                      component: DataAnalyticsArticle },
  // ← add new posts here
];

/* ── Loading fallback ───────────────────────────────────────── */
function ArticleLoader() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F6F1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C8922A"
        strokeWidth="2"
        style={{ animation: "spin .8s linear infinite" }}
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
      <span style={{ color: "#6B7592", fontSize: 13, fontWeight: 600 }}>
        Loading article…
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ── Dynamic blog router — picks the right article by slug ─── */
function BlogArticleRouter() {
  const { slug } = useParams();
  const match = blogRoutes.find((r) => r.slug === slug);

  if (!match) {
    // Unknown slug → 404 back to home
    return <Navigate to="/" replace />;
  }

  const ArticleComponent = match.component;
  return (
    <Suspense fallback={<ArticleLoader />}>
      <ArticleComponent />
    </Suspense>
  );
}

/* ── All-articles list page (simple, scrollable) ────────────── */
import { BLOG_POSTS } from "./FlexilogicPortfolio";
import { useNavigate } from "react-router-dom";
import { useSEO } from "./useSEO";

function AllArticlesPage() {
  const navigate = useNavigate();

  useSEO({
    title:       "All Articles — FlexiLogic Africa Blog",
    description: "Engineering deep-dives, case studies, and product thinking from the FlexiLogic Africa team. Web platforms, mobile apps, cloud, AI, cybersecurity, and data analytics.",
    canonical:   "https://www.flexilogicafrica.com/blog",
    keywords:    "software engineering blog Zimbabwe, web development Africa, mobile apps Africa, cloud devops, AI automation, cybersecurity Africa",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F6F1",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700;9..40,800&display=swap');
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        .all-card { cursor:pointer; transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
        .all-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(11,18,33,0.10); border-color: rgba(200,146,42,0.32) !important; }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .btn-shimmer {
          background: linear-gradient(90deg,#C8922A 0%,#E5A93C 40%,#C8922A 60%,#E5A93C 100%);
          background-size:200% 100%; animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(248,246,241,0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #E4E1D9",
          padding: "0 48px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 700,
            color: "#6B7592",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to site
        </button>
        <button
          onClick={() => navigate("/#contact")}
          className="btn-shimmer"
          style={{
            fontWeight: 700,
            fontSize: 12,
            color: "#0B1221",
            border: "none",
            borderRadius: 10,
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Start a Project →
        </button>
      </nav>

      {/* Header */}
      <div
        style={{
          padding: "64px 48px 48px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "#FDF3E0",
            border: "1px solid rgba(200,146,42,0.25)",
            color: "#C8922A",
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            padding: "4px 12px",
            borderRadius: 999,
            marginBottom: 16,
          }}
        >
          From the Studio
        </div>
        <h1
          className="serif"
          style={{
            fontSize: "clamp(32px,5vw,56px)",
            fontStyle: "italic",
            color: "#0B1221",
            margin: "0 0 12px",
            lineHeight: 1.05,
          }}
        >
          All{" "}
          <span style={{ color: "#C8922A", textDecoration: "underline", textDecorationColor: "#C8922A", textUnderlineOffset: 6 }}>
            Articles
          </span>
        </h1>
        <p style={{ color: "#6B7592", fontSize: 15, lineHeight: 1.75, margin: 0 }}>
          Engineering deep-dives, case studies, and product thinking from the FlexiLogic team.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 48px 96px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {BLOG_POSTS.map((post) => (
          <div
            key={post.slug}
            className="all-card"
            onClick={() => navigate(`/blog/${post.slug}`)}
            style={{
              background: "#fff",
              border: "1px solid #E4E1D9",
              borderRadius: 24,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Cover */}
            <div
              style={{
                background: post.coverBg,
                aspectRatio: "16/9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <div style={{ fontSize: 56, opacity: 0.25, userSelect: "none" }}>{post.cover}</div>
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 20,
                }}
              >
                <span
                  className={post.categoryColor}
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: 999,
                    border: "1px solid currentColor",
                    borderColor: "rgba(255,255,255,0.25)",
                  }}
                >
                  {post.category}
                </span>
              </div>
            </div>
            {/* Content */}
            <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 11,
                  color: "#6B7592",
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                <span>{post.date}</span>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#C8922A", display: "inline-block" }} />
                <span>{post.readTime}</span>
              </div>
              <h3
                className="serif"
                style={{ fontSize: 18, fontStyle: "italic", color: "#0B1221", lineHeight: 1.35, margin: "0 0 12px", flex: 1 }}
              >
                {post.title}
              </h3>
              <p style={{ fontSize: 13, color: "#6B7592", lineHeight: 1.72, margin: "0 0 20px" }}>{post.excerpt}</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#C8922A",
                  fontWeight: 700,
                  fontSize: 12,
                  paddingTop: 16,
                  borderTop: "1px solid #E4E1D9",
                }}
              >
                Read Article
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════ */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home — portfolio */}
        <Route path="/" element={<FlexilogicPortfolio />} />

        {/* All articles list */}
        <Route path="/blog" element={<AllArticlesPage />} />

        {/* Individual article — dynamic by slug */}
        <Route path="/blog/:slug" element={<BlogArticleRouter />} />

        {/* Catch-all → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}