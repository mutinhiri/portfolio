import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSEO } from "./useSEO";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`

    :root { --gold: #C8922A; --gold2: #E5A93C; }
    body { font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
    .serif { font-family: 'DM Serif Display', Georgia, serif; }
    body::after {
      content: ''; position: fixed; inset: 0; z-index: 9998; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.022;
    }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #F8F6F1; }
    ::-webkit-scrollbar-thumb { background: #C8922A; border-radius: 3px; }
    @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
    @keyframes fadeRight { from { opacity:0; transform:translateX(36px); } to { opacity:1; transform:none; } }
    @keyframes floatA    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes floatB    { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(-14px) rotate(-1deg)} }
    @keyframes ticker    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes dashFlow  { to { stroke-dashoffset:-28; } }
    @keyframes spinSlow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes shimmer   { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes pulseRing { 0%,100%{box-shadow:0 0 0 0 rgba(200,146,42,0)} 50%{box-shadow:0 0 0 8px rgba(200,146,42,0.18)} }
    @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
    @keyframes scaleIn   { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
    @keyframes videoPulse{ 0%,100%{opacity:.6} 50%{opacity:1} }
    @keyframes successPop{ 0%{opacity:0;transform:scale(0.85) translateY(12px)} 60%{transform:scale(1.03) translateY(-2px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
    @keyframes spinLoop  { to{transform:rotate(360deg)} }
    @keyframes blogSlide { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
    .afu  { animation: fadeUp    0.75s ease both; }
    .afr  { animation: fadeRight 0.75s ease both; }
    .af1  { animation: floatA    5s ease-in-out infinite; }
    .af2  { animation: floatB    7s ease-in-out infinite; }
    .spin { animation: spinSlow 22s linear infinite; }
    .path-dashed { stroke-dasharray:16 9; animation: dashFlow 1.6s linear infinite; }
    .btn-shimmer {
      background: linear-gradient(90deg,#C8922A 0%,#E5A93C 40%,#C8922A 60%,#E5A93C 100%);
      background-size: 200% 100%; animation: shimmer 3s linear infinite;
    }
    .ticker-inner { display:inline-flex; animation: ticker 32s linear infinite; }
    .pulse-node   { animation: pulseRing 3s ease-in-out infinite; }
    .rv     { opacity:0; transform:translateY(26px); transition:opacity .65s ease,transform .65s ease; }
    .rv.rl  { transform:translateX(-34px); }
    .rv.rr  { transform:translateX(34px); }
    .rv.vis { opacity:1 !important; transform:none !important; }
    .modal-overlay { animation: fadeIn .25s ease both; }
    .modal-panel   { animation: scaleIn .3s ease both; }
    .video-pulse   { animation: videoPulse 2s ease-in-out infinite; }
    .success-pop   { animation: successPop .5s cubic-bezier(.22,.68,0,1.2) both; }
    .spin-loader   { animation: spinLoop .8s linear infinite; }
    .cf-label { display:block; font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:rgba(255,255,255,0.45); margin-bottom:7px; }
    .cf-label span { color: #C8922A; }
    .cf-input { width:100%; background:rgba(255,255,255,0.05); border:1.5px solid rgba(255,255,255,0.10); border-radius:10px; padding:12px 16px; color:#fff; font-family:'DM Sans',sans-serif; font-size:14px; outline:none; transition:border-color .18s,background .18s,box-shadow .18s; }
    .cf-input::placeholder { color:rgba(255,255,255,0.20); }
    .cf-input:focus { border-color:#C8922A; background:rgba(200,146,42,0.06); box-shadow:0 0 0 3px rgba(200,146,42,0.10); }
    .cf-input.err { border-color:#ff7070; box-shadow:0 0 0 3px rgba(255,112,112,0.10); }
    /* Mobile menu */
    .mob-menu { display:none; flex-direction:column; gap:4px; cursor:pointer; background:none; border:none; padding:6px; }
    .mob-menu span { display:block; width:22px; height:2px; background:#fff; border-radius:2px; transition:all .25s; }
    .nav-links-desktop { display:flex; }
    .nav-links-mobile { display:none; }
    @media (max-width: 768px) {
      .mob-menu { display:flex; }
      .nav-links-desktop { display:none !important; }
      .nav-ctas-desktop { display:none !important; }
      .nav-links-mobile.open { display:flex; flex-direction:column; gap:4px; position:fixed; top:64px; left:0; right:0; background:#0B1221; border-bottom:1px solid rgba(255,255,255,0.08); padding:16px 24px 24px; z-index:99; }
    }
    /* Accessibility utilities */
    .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border-width:0; }
    .focus\:not-sr-only:focus { position:fixed; width:auto; height:auto; padding:0; margin:0; overflow:visible; clip:auto; white-space:normal; }
    textarea.cf-input { resize:vertical; min-height:110px; }
    select.cf-input option { background:#131D35; color:#fff; }
    .cf-error { font-size:11px; color:#ff8888; margin-top:5px; }

    /* ── Blog cards ── */
    .blog-card {
      cursor: pointer;
      transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease;
    }
    .blog-card:hover { transform: translateY(-6px); box-shadow: 0 28px 60px rgba(11,18,33,0.12); border-color: rgba(200,146,42,0.35) !important; }
    .blog-cover-img { transition: transform .5s ease; }
    .blog-card:hover .blog-cover-img { transform: scale(1.05); }
  `}</style>
);

/* ─── Hooks ─── */
function useRev(t = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Counter({ to, suf = "" }) {
  const [n, setN] = useState(0);
  const [ref, vis] = useRev(0.5);
  useEffect(() => {
    if (!vis) return;
    const end = parseInt(to), dur = 1600;
    let cur = 0;
    const id = setInterval(() => { cur++; setN(cur); if (cur >= end) clearInterval(id); }, dur / end);
    return () => clearInterval(id);
  }, [vis, to]);
  return <span ref={ref}>{vis ? n : 0}{suf}</span>;
}

/* ─── Icons ─── */
const Arr = ({ sz = 14 }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);
const PlayIcon = ({ sz = 48 }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
);
const CloseIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
);
const CheckCircle = () => (
  <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" /></svg>
);
const LogoMark = ({ size = 38 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect width="100" height="100" rx="14" fill="#0B1221" />
    <path d="M38 14 C30 16 24 22 22 30 C20 38 22 44 20 50 C18 58 22 66 28 72 C34 78 40 82 46 84 C52 86 58 82 62 76 C66 70 66 62 68 56 C70 50 74 44 72 38 C70 32 64 28 60 22 C56 16 46 12 38 14Z" fill="#F8F6F1" opacity="0.92" />
    <line x1="50" y1="60" x2="50" y2="38" stroke="#0B1221" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="50" y1="52" x2="42" y2="44" stroke="#0B1221" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="50" y1="38" x2="58" y2="30" stroke="#C8922A" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="50" cy="62" r="3.5" fill="#6B7592" />
    <circle cx="42" cy="43" r="3.5" fill="#6B7592" />
    <circle cx="58" cy="29" r="3.5" fill="#C8922A" />
    <circle cx="50" cy="37" r="3.5" fill="#C8922A" />
  </svg>
);

/* ═══════════════════════════════════════════════════════
   BLOG DATA
   ────────────────────────────────────────────────────────
   HOW TO ADD A NEW POST:
   1. Copy any object below and paste it at the TOP of the array
   2. Fill in your details — especially `slug` (must be unique)
   3. Create a matching FlexilogicBlogArticle.jsx page and set
      the same slug as the route param
   4. The card will automatically appear in the blog section
   ═══════════════════════════════════════════════════════ */
export const BLOG_POSTS = [
  /* ── SERVICE POSTS — one per service ─────────────────── */
  {
    slug: "web-platforms-zimbabwe",
    featured: false,
    category: "Web Platforms",
    categoryColor: "bg-[#7C9FFF]/15 text-[#7C9FFF]",
    title: "How We Build Scalable Web Platforms for African Businesses",
    excerpt: "From architecture decisions to framework choices — our end-to-end approach to shipping fast, conversion-optimised web platforms that hold up under real African market conditions.",
    date: "3 Mar 2025",
    readTime: "7 min read",
    author: "FlexiLogic Team",
    cover: "⚡",
    coverBg: "linear-gradient(135deg,#0B1221 0%,#1a2f5e 100%)",
  },
  {
    slug: "mobile-apps-zimbabwe",
    featured: false,
    category: "Mobile Apps",
    categoryColor: "bg-[#A78BFA]/15 text-[#A78BFA]",
    title: "Building Mobile Apps for Low-Bandwidth Markets: Our Flutter Playbook",
    excerpt: "Offline-first design, lightweight bundles, and graceful degradation — the exact patterns we apply when shipping iOS & Android apps for Zimbabwean and broader African users.",
    date: "18 Feb 2025",
    readTime: "6 min read",
    author: "FlexiLogic Team",
    cover: "📲",
    coverBg: "linear-gradient(135deg,#0d1b2a 0%,#2d1b4e 100%)",
  },
  {
    slug: "cloud-devops-africa",
    featured: false,
    category: "Cloud & DevOps",
    categoryColor: "bg-[#C8922A]/15 text-[#C8922A]",
    title: "Cloud Infrastructure for African Scale: AWS, GCP & Zero-Downtime Pipelines",
    excerpt: "How we architect and deploy cloud infrastructure for African businesses — keeping costs lean, latency low, and uptime close to 100% even on constrained budgets.",
    date: "10 Jan 2025",
    readTime: "5 min read",
    author: "FlexiLogic Team",
    cover: "☁️",
    coverBg: "linear-gradient(135deg,#0a1628 0%,#0d2137 100%)",
  },
  {
    slug: "ai-automation-africa",
    featured: false,
    category: "AI & Automation",
    categoryColor: "bg-[#00C896]/15 text-[#00C896]",
    title: "Practical AI for African Businesses: What Actually Works in 2025",
    excerpt: "Cutting through the hype — the AI and automation integrations we've shipped for real clients, what moved the needle, and what was just expensive noise.",
    date: "25 Feb 2025",
    readTime: "8 min read",
    author: "FlexiLogic Team",
    cover: "🤖",
    coverBg: "linear-gradient(135deg,#0a1f14 0%,#0d2e1e 100%)",
  },
  {
    slug: "cybersecurity-zimbabwe",
    featured: false,
    category: "Cybersecurity",
    categoryColor: "bg-[#FF6B6B]/15 text-[#FF6B6B]",
    title: "Cybersecurity in Zimbabwe: The Threats Local Businesses Are Ignoring",
    excerpt: "Social engineering, unpatched systems, and weak API design — the three vulnerabilities we find in almost every security audit we run for Zimbabwean companies.",
    date: "14 Feb 2025",
    readTime: "7 min read",
    author: "FlexiLogic Team",
    cover: "🔐",
    coverBg: "linear-gradient(135deg,#1a0a0a 0%,#2e0d0d 100%)",
  },
  {
    slug: "data-analytics-africa",
    featured: false,
    category: "Data & Analytics",
    categoryColor: "bg-[#FFD700]/15 text-[#C8922A]",
    title: "From Raw Data to Real Decisions: How We Build Analytics That Get Used",
    excerpt: "Most dashboards get opened once and abandoned. Here's our framework for building data pipelines and visualisations that business owners actually rely on every day.",
    date: "5 Feb 2025",
    readTime: "6 min read",
    author: "FlexiLogic Team",
    cover: "📊",
    coverBg: "linear-gradient(135deg,#1a1400 0%,#2e2200 100%)",
  },
  /* ── CASE STUDIES & OTHER POSTS ──────────────────────── */
  {
    slug: "building-school-management-system-zimbabwe",
    featured: true,
    category: "Case Study",
    categoryColor: "bg-[#00C896]/15 text-[#00C896]",
    title: "How We Built a School Management System for 1,200+ Zimbabwean Students",
    excerpt: "From a single-school pilot in Harare to a platform handling enrolment, grades, fees and parent communication — here's exactly how we did it in 12 weeks.",
    date: "12 Feb 2025",
    readTime: "8 min read",
    author: "FlexiLogic Team",
    cover: "🏫",
    coverBg: "linear-gradient(135deg,#0B1221 0%,#1B2847 100%)",
  },
  {
    slug: "why-african-startups-choose-flutter",
    featured: false,
    category: "Engineering",
    categoryColor: "bg-[#7C9FFF]/15 text-[#7C9FFF]",
    title: "Why African Startups Are Choosing Flutter Over React Native in 2025",
    excerpt: "We've shipped both. Here's our honest side-by-side — performance, community, hiring, and what actually matters when you're building for low-bandwidth markets.",
    date: "28 Jan 2025",
    readTime: "6 min read",
    author: "FlexiLogic Team",
    cover: "📱",
    coverBg: "linear-gradient(135deg,#0d1b2a 0%,#1a2f4a 100%)",
  },
  {
    slug: "zero-downtime-deployments-node",
    featured: false,
    category: "DevOps",
    categoryColor: "bg-[#C8922A]/15 text-[#C8922A]",
    title: "Zero-Downtime Deployments on a Budget: Our Node.js Playbook",
    excerpt: "You don't need Kubernetes to ship without interrupting users. Here's the lean pipeline we run for every FlexiLogic client launch.",
    date: "10 Jan 2025",
    readTime: "5 min read",
    author: "FlexiLogic Team",
    cover: "☁️",
    coverBg: "linear-gradient(135deg,#0a1628 0%,#0d2137 100%)",
  },
];

/* ─── Blog Card ─── */
function BlogCard({ post, idx, onNavigate }) {
  const [ref, vis] = useRev(0.1);

  // Featured card — horizontal on desktop, stacked on mobile
  if (post.featured) {
    return (
      <div
        ref={ref}
        className={`rv ${vis ? "vis" : ""} blog-card sm:col-span-2 lg:col-span-3 bg-white border border-[#E4E1D9] rounded-3xl overflow-hidden`}
        style={{ transitionDelay: `${idx * 0.07}s` }}
        onClick={() => onNavigate(post.slug)}
      >
        {/* Mobile: stacked (cover on top, content below) */}
        {/* Desktop: side-by-side grid */}
        <div className="flex flex-col sm:grid sm:grid-cols-[1.1fr_1fr]">
          {/* Cover art */}
          <div className="relative overflow-hidden h-48 sm:h-auto sm:min-h-[300px] flex items-center justify-center" style={{ background: post.coverBg }}>
            <div className="blog-cover-img text-[72px] sm:text-[110px] opacity-25 select-none leading-none">{post.cover}</div>
            <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 400 300" preserveAspectRatio="none">
              <line x1="0" y1="150" x2="400" y2="150" stroke="#C8922A" strokeWidth="1" />
              <line x1="200" y1="0" x2="200" y2="300" stroke="#C8922A" strokeWidth="1" />
              <circle cx="200" cy="150" r="50" fill="none" stroke="#C8922A" strokeWidth="1" strokeDasharray="6 4" />
              {[0,60,120,180,240,300].map((a,i)=>(
                <circle key={i} cx={200+50*Math.cos(a*Math.PI/180)} cy={150+50*Math.sin(a*Math.PI/180)} r="3" fill="#C8922A"/>
              ))}
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B1221]/50 pointer-events-none" />
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <span className={`text-[9px] font-extrabold tracking-[.1em] uppercase px-3 py-1.5 rounded-full border border-current/25 ${post.categoryColor}`}>
                {post.category}
              </span>
            </div>
          </div>
          {/* Content */}
          <div className="p-6 sm:p-10 flex flex-col justify-center sm:border-l border-t sm:border-t-0 border-[#E4E1D9]">
            <div className="flex items-center gap-3 text-[11px] text-[#6B7592] font-semibold mb-4">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-[#C8922A] inline-block" />
              <span>{post.readTime}</span>
            </div>
            <h3 className="serif italic text-[#0B1221] leading-tight mb-3" style={{ fontSize: "clamp(18px,2vw,26px)" }}>
              {post.title}
            </h3>
            <p className="text-[13px] sm:text-[14px] text-[#6B7592] leading-[1.78] mb-6">{post.excerpt}</p>
            <div className="flex items-center gap-2 text-[#C8922A] font-bold text-[13px]">
              Read Article <Arr sz={13} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular card — vertical
  return (
    <div
      ref={ref}
      className={`rv ${vis ? "vis" : ""} blog-card bg-white border border-[#E4E1D9] rounded-3xl overflow-hidden flex flex-col`}
      style={{ transitionDelay: `${idx * 0.07}s` }}
      onClick={() => onNavigate(post.slug)}
    >
      {/* Cover */}
      <div className="relative overflow-hidden aspect-video flex items-center justify-center flex-shrink-0" style={{ background: post.coverBg }}>
        <div className="blog-cover-img text-[64px] opacity-25 select-none leading-none">{post.cover}</div>
        <div className="absolute top-4 left-5">
          <span className={`text-[9px] font-extrabold tracking-[.1em] uppercase px-2.5 py-1 rounded-full border border-current/25 ${post.categoryColor}`}>
            {post.category}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2.5 text-[11px] text-[#6B7592] font-semibold mb-3">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-[#C8922A] inline-block" />
          <span>{post.readTime}</span>
        </div>
        <h3 className="serif italic text-[#0B1221] text-[18px] leading-tight mb-3 flex-1">{post.title}</h3>
        <p className="text-[13px] text-[#6B7592] leading-[1.72] mb-5">{post.excerpt}</p>
        <div className="flex items-center gap-1.5 text-[#C8922A] font-bold text-[12px] pt-4 border-t border-[#E4E1D9]">
          Read Article <Arr sz={12} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BLOG SECTION
   Place this between Trusted By and Contact.
   onNavigate = your router's navigate() or
   window.location replacement — see comment below.
───────────────────────────────────────────── */
function BlogSection() {
  const [hRef, hVis] = useRev(0.08);

  const navigate = useNavigate();
  const handleNavigate = (slug) => {
    if (slug === "all") navigate("/blog");
    else navigate(`/blog/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <section id="blog" aria-label="Blog articles" className="py-16 md:py-24 px-6 md:px-12 bg-[#F8F6F1]">
      <div className="max-w-[1100px] mx-auto">

        {/* Section header */}
        <div ref={hRef} className={`rv ${hVis ? "vis" : ""} flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 md:mb-14`}>
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-[.1em] uppercase text-[#C8922A] bg-[#FDF3E0] border border-[#C8922A]/25 px-3 py-1 rounded-full mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8922A] inline-block" />
              From the Studio
            </div>
            <h2 className="serif italic text-[#0B1221] leading-tight" style={{ fontSize: "clamp(30px,4vw,48px)" }}>
              Insights &amp; <span className="text-[#C8922A] underline decoration-[#C8922A] underline-offset-[6px]">Articles</span>
            </h2>
            <p className="text-[14px] text-[#6B7592] mt-3 max-w-[420px] leading-[1.75]">
              Engineering deep-dives, case studies, and product thinking — straight from our team.
            </p>
          </div>
          <button
            className="font-bold text-[13px] bg-transparent text-[#0B1221] border border-[#E4E1D9] rounded-xl px-5 py-2.5 flex items-center gap-2 mb-2 cursor-pointer hover:border-[#C8922A]/30 transition-all"
            onClick={() => { navigate("/blog"); window.scrollTo(0, 0); }}
          >
            All Articles <Arr />
          </button>
        </div>

        {/* Card grid
            Featured post spans all 3 cols; remaining posts fill the row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BLOG_POSTS.map((post, i) => (
            <BlogCard key={post.slug} post={post} idx={i} onNavigate={handleNavigate} />
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="mt-12 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg,#0B1221 0%,#131D35 100%)" }}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-6 md:px-10 py-7 md:py-8">
            <div>
              <div className="text-[10px] font-extrabold tracking-[.12em] text-[#C8922A] uppercase mb-1.5">Stay in the loop</div>
              <h4 className="serif italic text-white text-[22px] leading-tight mb-1">
                Get new articles delivered.
              </h4>
              <p className="text-white/40 text-[13px]">Engineering & design insights — no spam, ever.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto md:flex-shrink-0">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-2.5 text-[13px] text-white placeholder-white/25 outline-none focus:border-[#C8922A]/60 transition-colors w-full sm:w-52"
              />
              <button className="btn-shimmer font-bold text-[13px] text-[#0B1221] border-none rounded-xl px-5 py-2.5 cursor-pointer flex items-center gap-1.5 whitespace-nowrap">
                Subscribe <Arr sz={13} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Data ─── */
const STEPS = [
  { id: "01", title: "Discovery & Strategy", sub: "We learn before we leap", desc: "Immersive stakeholder sessions, competitive mapping, and technical scoping — distilled into a crystal-clear product brief that anchors every decision.", tags: ["Stakeholder Workshops", "Market Research", "Tech Scoping", "Product Brief"], metric: "2–4", mUnit: "days", mLabel: "Discovery sprint", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4M8 11h6M11 8v6" /></svg> },
  { id: "02", title: "UX / UI Design", sub: "Every pixel, intentional", desc: "Wireframes that evolve into clickable prototypes. Design systems built for scale. Every interaction validated against real users before code is written.", tags: ["Wireframing", "Design System", "Prototyping", "User Testing"], metric: "1–3", mUnit: "weeks", mLabel: "Design phase", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg> },
  { id: "03", title: "Agile Development", sub: "2-week sprints, zero drift", desc: "React, Next.js, Node, Flutter — we pick the right tool, not the trendy one. CI/CD from day one. You see working software every fortnight.", tags: ["Sprint Planning", "Code Reviews", "CI/CD Pipeline", "Daily Standups"], metric: "2-week", mUnit: "", mLabel: "Sprint cadence", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg> },
  { id: "04", title: "QA & Security Testing", sub: "Ships only when bulletproof", desc: "Unit tests, end-to-end flows, penetration testing, and load audits. We find every bug so your users never encounter one.", tags: ["E2E Testing", "Perf Audits", "Pen Testing", "UAT"], metric: "99.8", mUnit: "%", mLabel: "Post-launch uptime", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  { id: "05", title: "Deployment & Launch", sub: "Zero-downtime, full confidence", desc: "Infrastructure provisioned as code, monitoring armed, rollback ready. Your product goes live with an ops team watching every metric in real time.", tags: ["Cloud Infra", "Zero-Downtime", "Live Monitoring", "Rollback Plan"], metric: "<24", mUnit: "hrs", mLabel: "Average deploy time", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 19V5M5 12l7-7 7 7" /><path d="M19 21H5" /></svg> },
  { id: "06", title: "Support & Growth", sub: "We grow as you grow", desc: "Monthly retainers, feature roadmaps, 24/7 alerting, and a dedicated technical partner who treats your product like their own.", tags: ["24/7 Monitoring", "Monthly Releases", "Roadmap Mgmt", "Priority SLA"], metric: "100", mUnit: "+", mLabel: "Long-term clients", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0" /><path d="M12 8v4l3 3" /></svg> },
];
const SERVICES = [
  { e: "⚡", t: "Web Platforms",    d: "Scalable web apps with modern frameworks, optimised for speed and conversion.", slug: "web-platforms-zimbabwe" },
  { e: "📲", t: "Mobile Apps",      d: "Cross-platform iOS & Android experiences via Flutter and React Native.",        slug: "mobile-apps-zimbabwe" },
  { e: "☁️", t: "Cloud & DevOps",   d: "AWS, GCP, Azure — infrastructure as code with zero-downtime pipelines.",       slug: "cloud-devops-africa" },
  { e: "🤖", t: "AI & Automation",  d: "Smart features, intelligent workflows, and LLM-powered product experiences.",   slug: "ai-automation-africa" },
  { e: "🔐", t: "Cybersecurity",    d: "Penetration testing, security audits, and secure-by-design architecture.",     slug: "cybersecurity-zimbabwe" },
  { e: "📊", t: "Data & Analytics", d: "Dashboards, data pipelines, and insights that drive real business decisions.", slug: "data-analytics-africa" },
];

const SMSMockup = () => (
  <div className="w-full h-full bg-gradient-to-br from-[#0B1221] to-[#1B2847] p-4 flex flex-col gap-2.5">
    <div className="flex items-center justify-between bg-white/5 border border-white/[0.07] rounded-xl px-3 py-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-[#C8922A] flex items-center justify-center text-sm">🏫</div>
        <span className="text-[11px] font-extrabold text-white">EduAdmin Pro</span>
      </div>
      <div className="flex gap-1">
        {["Dashboard", "Students", "Grades", "Finance", "Reports"].map((p, i) => (
          <span key={p} className={`text-[8px] font-bold px-2 py-1 rounded-full ${i === 0 ? "bg-[#C8922A]/20 text-[#C8922A]" : "text-white/40"}`}>{p}</span>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-[#C8922A] flex items-center justify-center text-[9px] text-[#0B1221] font-bold">A</div>
        <span className="text-[9px] text-white/40">Admin</span>
      </div>
    </div>
    <div className="flex gap-2.5 flex-1 min-h-0">
      <div className="w-24 bg-white/[0.03] border border-white/[0.05] rounded-xl p-2 flex flex-col gap-1">
        {["📊 Overview", "👥 Students", "📚 Classes", "📝 Exams", "💰 Fees", "📋 Reports", "⚙️ Settings"].map((item, i) => (
          <div key={item} className={`text-[7.5px] font-semibold px-2 py-1.5 rounded-lg ${i === 0 ? "bg-[#C8922A]/15 text-[#C8922A]" : "text-white/35"}`}>{item}</div>
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="grid grid-cols-4 gap-1.5">
          {[{ label: "Students", val: "1,248", sub: "+12 this term" }, { label: "Teachers", val: "87", sub: "Active staff" }, { label: "Attendance", val: "94%", sub: "+2% vs last" }, { label: "Fee Coll.", val: "91%", sub: "$128k" }].map(s => (
            <div key={s.label} className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-2">
              <div className="text-[6.5px] font-bold uppercase tracking-widest text-white/35 mb-1">{s.label}</div>
              <div className="text-[15px] font-extrabold text-white leading-none">{s.val}</div>
              <div className="text-[6.5px] text-[#00C896] mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-white/[0.03] border border-white/[0.05] rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 px-3 py-2 bg-white/[0.04] border-b border-white/[0.04]">
            {["Student", "Class", "Attend.", "Grade"].map(h => (
              <span key={h} className="text-[6.5px] font-extrabold uppercase tracking-widest text-white/35">{h}</span>
            ))}
          </div>
          {[
            { name: "Chiedza Moyo", cls: "Form 4A", att: "98%", grade: "A", gc: "bg-[#00C896]/15 text-[#00C896]" },
            { name: "Tinashe Banda", cls: "Form 3B", att: "91%", grade: "B+", gc: "bg-[#7C9FFF]/15 text-[#7C9FFF]" },
            { name: "Rudo Mutasa", cls: "Form 5A", att: "95%", grade: "A-", gc: "bg-[#00C896]/15 text-[#00C896]" },
            { name: "Farai Chirwa", cls: "Form 2C", att: "87%", grade: "B", gc: "bg-[#7C9FFF]/15 text-[#7C9FFF]" },
            { name: "Tendai Dube", cls: "Form 4B", att: "79%", grade: "C+", gc: "bg-[#C8922A]/15 text-[#C8922A]" },
          ].map(r => (
            <div key={r.name} className="grid grid-cols-4 px-3 py-1.5 border-b border-white/[0.03] items-center">
              <span className="text-[8.5px] text-white/70">{r.name}</span>
              <span className="text-[8.5px] text-white/50">{r.cls}</span>
              <span className="text-[8.5px] text-white/50">{r.att}</span>
              <span className={`text-[7.5px] font-extrabold px-1.5 py-0.5 rounded-full w-fit ${r.gc}`}>{r.grade}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ELearnMockup = () => (
  <div className="w-full h-full bg-gradient-to-br from-[#0A1628] to-[#0D2137] p-4 flex flex-col gap-2.5 font-sans">
    <div className="flex items-center justify-between bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#00CFFF] to-[#0080CC] flex items-center justify-center text-sm">🎓</div>
        <div>
          <span className="text-[10px] font-extrabold text-white tracking-tight">ZimLearner</span>
          <span className="text-[10px] font-extrabold text-[#00CFFF] tracking-tight">Spot</span>
        </div>
        <span className="text-[6.5px] text-white/25 ml-1">zimlearnerspot.co.zw</span>
      </div>
      <div className="flex gap-1">
        {["Home", "Subjects", "Library", "Progress", "Pricing"].map((p, i) => (
          <span key={p} className={`text-[8px] font-bold px-2 py-1 rounded-full ${i === 4 ? "bg-[#00CFFF]/20 text-[#00CFFF]" : "text-white/40"}`}>{p}</span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-gradient-to-r from-[#00CFFF] to-[#0080CC] text-[#0A1628] text-[7px] font-extrabold px-2.5 py-1 rounded-full">Get Access — $12/yr</div>
        <div className="w-5 h-5 rounded-full bg-[#00CFFF]/20 border border-[#00CFFF]/40 flex items-center justify-center text-[9px] text-[#00CFFF] font-bold">T</div>
      </div>
    </div>
    <div className="flex gap-2.5 flex-1 min-h-0">
      <div className="w-24 bg-white/[0.03] border border-white/[0.05] rounded-xl p-2 flex flex-col gap-1">
        {["📖 My Subjects", "📁 Materials", "🎬 Videos", "📝 Quizzes", "🏆 Progress", "🔖 Saved", "⚙️ Settings"].map((item, i) => (
          <div key={item} className={`text-[7.5px] font-semibold px-2 py-1.5 rounded-lg ${i === 0 ? "bg-[#00CFFF]/15 text-[#00CFFF]" : "text-white/35"}`}>{item}</div>
        ))}
        <div className="mt-auto pt-2 border-t border-white/[0.05]">
          <div className="bg-gradient-to-br from-[#00CFFF]/10 to-[#0080CC]/10 border border-[#00CFFF]/20 rounded-lg p-2 text-center">
            <div className="text-[7px] font-extrabold text-[#00CFFF] leading-tight">ALL SUBJECTS</div>
            <div className="text-[14px] font-extrabold text-white leading-none my-0.5">$12</div>
            <div className="text-[6px] text-white/40">per year</div>
            <div className="text-[6px] text-white/25 mt-0.5">or $2/month</div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="grid grid-cols-4 gap-1.5">
          {[{ label: "Subjects", val: "24", sub: "All levels", color: "text-[#00CFFF]" }, { label: "Resources", val: "3,400+", sub: "PDFs & videos", color: "text-[#FFD166]" }, { label: "Students", val: "12k+", sub: "Active learners", color: "text-[#06D6A0]" }, { label: "Access", val: "$12", sub: "Full year / all", color: "text-[#FF6B9D]" }].map(s => (
            <div key={s.label} className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-2">
              <div className="text-[6.5px] font-bold uppercase tracking-widest text-white/30 mb-1">{s.label}</div>
              <div className={`text-[15px] font-extrabold leading-none ${s.color}`}>{s.val}</div>
              <div className="text-[6.5px] text-white/35 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 flex-1 min-h-0">
          <div className="flex-1 bg-white/[0.03] border border-white/[0.05] rounded-xl overflow-hidden flex flex-col">
            <div className="px-3 py-2 bg-white/[0.04] border-b border-white/[0.04] flex items-center justify-between">
              <span className="text-[8px] font-extrabold text-white/70 uppercase tracking-widest">📚 Your Subjects</span>
              <span className="text-[7px] text-[#00CFFF] font-bold">View all →</span>
            </div>
            {[
              { sub: "Mathematics", form: "Form 4", progress: 78, color: "bg-[#00CFFF]", icon: "➕" },
              { sub: "English Language", form: "Form 5", progress: 62, color: "bg-[#FFD166]", icon: "✏️" },
              { sub: "Biology", form: "Form 3", progress: 90, color: "bg-[#06D6A0]", icon: "🔬" },
              { sub: "History", form: "Form 4", progress: 45, color: "bg-[#FF6B9D]", icon: "📜" },
              { sub: "Chemistry", form: "Form 5", progress: 33, color: "bg-[#B48EFF]", icon: "⚗️" },
            ].map(r => (
              <div key={r.sub} className="px-3 py-1.5 border-b border-white/[0.03] flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-white/[0.06] flex items-center justify-center text-[10px]">{r.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[8.5px] text-white/75 font-semibold">{r.sub}</span>
                    <span className="text-[7px] text-white/35">{r.form}</span>
                  </div>
                  <div className="w-full bg-white/[0.07] rounded-full h-1">
                    <div className={`${r.color} h-1 rounded-full`} style={{ width: `${r.progress}%` }}></div>
                  </div>
                </div>
                <span className="text-[7.5px] font-extrabold text-white/50 w-6 text-right">{r.progress}%</span>
              </div>
            ))}
          </div>
          <div className="w-[130px] flex flex-col gap-2">
            <div className="bg-gradient-to-br from-[#00CFFF]/10 to-[#0080CC]/5 border border-[#00CFFF]/25 rounded-xl p-2.5">
              <div className="text-[7px] font-extrabold uppercase tracking-widest text-[#00CFFF] mb-1.5">💡 Full Access</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-[22px] font-extrabold text-white leading-none">$12</span>
                <span className="text-[8px] text-white/40 mb-0.5">/ year</span>
              </div>
              <div className="text-[6.5px] text-white/35 mb-0.5">or just <span className="text-[#00CFFF] font-bold">$2/month</span></div>
              {["All subjects & forms", "3,400+ resources", "Videos & past papers", "Unlimited access"].map(f => (
                <div key={f} className="flex items-center gap-1 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#06D6A0]/20 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#06D6A0]"></div>
                  </div>
                  <span className="text-[6.5px] text-white/50">{f}</span>
                </div>
              ))}
              <div className="mt-2 bg-gradient-to-r from-[#00CFFF] to-[#0080CC] rounded-lg py-1.5 text-center">
                <span className="text-[7.5px] font-extrabold text-[#0A1628]">Subscribe Now</span>
              </div>
            </div>
            <div className="flex-1 bg-white/[0.03] border border-white/[0.05] rounded-xl p-2 flex flex-col">
              <div className="text-[7px] font-extrabold uppercase tracking-widest text-white/30 mb-1.5">🕐 Recent</div>
              {[
                { title: "Quadratic Equations", type: "PDF", time: "2h ago", color: "text-[#FFD166]" },
                { title: "Essay Writing Tips", type: "Video", time: "Yesterday", color: "text-[#00CFFF]" },
                { title: "Cell Division Quiz", type: "Quiz", time: "2d ago", color: "text-[#06D6A0]" },
              ].map(a => (
                <div key={a.title} className="flex items-center gap-1.5 mb-1.5">
                  <div className={`text-[7px] font-extrabold px-1 py-0.5 rounded ${a.color} bg-white/[0.05]`}>{a.type}</div>
                  <div>
                    <div className="text-[7.5px] text-white/60 leading-tight">{a.title}</div>
                    <div className="text-[6px] text-white/25">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PROJECTS = [
  { id: "sms", featured: true, slug: "building-school-management-system-zimbabwe", title: "Eduverse School Management System", desc: "A full-featured school administration platform for Zimbabwean secondary schools. Handles student enrollment, grade tracking, fee management, attendance, timetabling, and parent communication — unified in one dashboard.", badges: [{ label: "New", cls: "bg-[#00C896]/15 text-[#00C896]" }, { label: "Live", cls: "bg-[#C8922A]/15 text-[#C8922A]" }, { label: "Web App", cls: "bg-[#7C9FFF]/15 text-[#7C9FFF]" }], tech: ["React", "Node.js", "PostgreSQL", "Redis", "AWS S3", "Twilio SMS"], mockup: <SMSMockup /> },
  { id: "paygo", slug: "mobile-apps-zimbabwe", title: "PayGo Mobile", desc: "Cross-border mobile payment app for informal traders across Southern Africa.", badges: [{ label: "Mobile", cls: "bg-[#A78BFA]/15 text-[#A78BFA]" }, { label: "AI", cls: "bg-orange-400/15 text-orange-400" }], tech: ["Flutter", "Firebase", "Node.js"], mockup: <div className="w-full h-full bg-gradient-to-br from-[#0d1b2a] to-[#1a2f4a] flex flex-col items-center justify-center gap-2"><span className="text-4xl opacity-60">📲</span><span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">PayGo Mobile</span></div> },
  { id: "agrilink", slug: "web-platforms-zimbabwe", title: "AgriLink Portal", desc: "Connecting smallholder farmers to markets, weather data, and financing.", badges: [{ label: "Web", cls: "bg-[#7C9FFF]/15 text-[#7C9FFF]" }], tech: ["Vue.js", "Django", "PostgreSQL"], mockup: <div className="w-full h-full bg-gradient-to-br from-[#0a1f0a] to-[#1a3a1a] flex flex-col items-center justify-center gap-2"><span className="text-4xl opacity-60">🌾</span><span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">AgriLink Portal</span></div> },
  { id: "eduvest", featured: true, slug: "why-african-startups-choose-flutter", title: "Zim Learner Spot", desc: "Impact investment platform connecting education-focused startups with African investors.", badges: [{ label: "Live", cls: "bg-[#C8922A]/15 text-[#C8922A]" }, { label: "Web", cls: "bg-[#7C9FFF]/15 text-[#7C9FFF]" }], tech: ["Next.js", "Stripe", "Supabase"], mockup: <ELearnMockup /> },
];

function ShowreelModal({ onClose }) {
  useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="modal-overlay fixed inset-0 z-[999] flex items-center justify-center p-6 bg-[#0B1221]/92 backdrop-blur-2xl" onClick={onClose}>
      <div className="modal-panel relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-11 right-0 flex items-center gap-2 text-white/50 hover:text-white text-[13px] font-semibold transition-colors">Close <CloseIcon /></button>
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#080F1E]" style={{ aspectRatio: "16/9" }}>
          <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#0B1221] via-[#131D35] to-[#1B2847]">
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-[#C8922A]/10 border border-[#C8922A]/30">
              <div className="absolute inset-0 rounded-full border border-[#C8922A]/15 scale-125" />
              <div className="video-pulse text-[#C8922A] pl-1"><PlayIcon sz={40} /></div>
            </div>
            <div className="text-center z-10">
              <p className="serif italic text-white text-[22px] mb-2">Showreel Coming Soon</p>
              <p className="text-white/40 text-[13px] max-w-sm text-center leading-relaxed">Add your video URL or file path to <code className="text-[#C8922A] text-xs bg-white/[0.06] px-1.5 py-0.5 rounded">ShowreelModal</code> inside this component to go live instantly.</p>
            </div>
          </div>
        </div>
        <p className="text-center text-white/50 text-xs mt-4 tracking-wide">FlexiLogic Africa · Studio Showreel · 2025 · Press Esc to close</p>
      </div>
    </div>
  );
}

function ProcessPath() {
  const d = "M400 40 C610 180 660 340 400 490 C140 640 90 800 400 950 C660 1100 710 1260 400 1410 C90 1560 70 1720 400 1870 C720 2020 730 2180 400 2330 C90 2480 100 2600 400 2700";
  return (
    // Hidden on mobile — desktop zigzag path only
    <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 1 }} viewBox="0 0 800 2800" preserveAspectRatio="none">
      <defs>
        <linearGradient id="pg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#C8922A" stopOpacity=".9" /><stop offset="50%" stopColor="#E5A93C" stopOpacity=".9" /><stop offset="100%" stopColor="#C8922A" stopOpacity=".9" /></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <path d={d} fill="none" stroke="url(#pg)" strokeWidth="12" filter="url(#glow)" opacity=".18" strokeLinecap="round" />
      <path d={d} fill="none" stroke="url(#pg)" strokeWidth="2" className="path-dashed" opacity=".65" strokeLinecap="round" />
    </svg>
  );
}

function StepCard({ step, idx }) {
  const [desktopRef, desktopVis] = useRev(0.18);
  const isLeft = idx % 2 === 0;

  const CardInner = () => (
    <>
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px] bg-gradient-to-r from-[#C8922A] to-[#E5A93C]/50" />
      <div className="flex items-start gap-3.5 mb-3.5">
        <div className="w-11 h-11 rounded-[11px] flex-shrink-0 bg-[#FDF3E0] text-[#C8922A] border border-[#C8922A]/20 flex items-center justify-center">{step.icon}</div>
        <div>
          <div className="text-[10px] font-extrabold tracking-[.1em] text-[#C8922A] mb-0.5 uppercase">Step {step.id}</div>
          <div className="serif text-[19px] text-[#0B1221] leading-tight">{step.title}</div>
          <div className="text-[11px] text-[#6B7592] mt-0.5 italic">{step.sub}</div>
        </div>
      </div>
      <p className="text-[13px] leading-[1.78] text-[#6B7592] mb-4">{step.desc}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">{step.tags.map(t => <span key={t} className="text-[10px] font-bold tracking-[.06em] px-2.5 py-0.5 rounded-full uppercase bg-[#FDF3E0] text-[#C8922A] border border-[#C8922A]/20">{t}</span>)}</div>
      <div className="flex items-baseline gap-1.5 pt-3.5 border-t border-[#E4E1D9]">
        <span className="serif text-[28px] text-[#0B1221] italic">{step.metric}</span>
        <span className="text-[12px] font-bold text-[#0B1221]">{step.mUnit}</span>
        <span className="text-[11px] text-[#6B7592] ml-1">{step.mLabel}</span>
      </div>
    </>
  );

  return (
    <>
      {/* MOBILE — no rv class, cards always visible (observer watches hidden element on desktop) */}
      <div className="md:hidden flex gap-4 mb-8">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="pulse-node w-8 h-8 rounded-full bg-white border-2 border-[#C8922A] flex items-center justify-center" style={{ boxShadow: "0 0 0 5px rgba(200,146,42,0.12)" }}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#C8922A]" />
          </div>
          {idx < 5 && <div className="w-px flex-1 mt-2 bg-gradient-to-b from-[#C8922A]/40 to-transparent min-h-[32px]" />}
        </div>
        <div className="relative overflow-hidden bg-white border border-[#E4E1D9] rounded-[20px] p-5 flex-1">
          <CardInner />
        </div>
      </div>

      {/* DESKTOP — rv animation, watched by desktopRef */}
      <div className="hidden md:flex relative items-center min-h-[220px] mb-14">
        <div className={`serif absolute top-1/2 -translate-y-1/2 text-[120px] leading-none italic text-[#C8922A] opacity-[0.055] pointer-events-none select-none ${isLeft ? "right-0" : "left-0"}`}>{step.id}</div>
        <div className="pulse-node absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[34px] h-[34px] rounded-full bg-white border-2 border-[#C8922A] flex items-center justify-center" style={{ boxShadow: "0 0 0 7px rgba(200,146,42,0.12),0 4px 14px rgba(11,18,33,0.12)" }}>
          <div className="w-[11px] h-[11px] rounded-full bg-[#C8922A]" />
        </div>
        <div ref={desktopRef} className={`rv ${isLeft ? "rl" : "rr"} ${desktopVis ? "vis" : ""} relative overflow-hidden bg-white border border-[#E4E1D9] rounded-[20px] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#C8922A]/30 ${isLeft ? "mr-auto" : "ml-auto"}`} style={{ width: "calc(50% - 46px)", transitionDelay: `${idx * 0.08}s` }}>
          <CardInner />
        </div>
      </div>
    </>
  );
}

function ProjectCard({ project }) {
  const [ref, vis] = useRev(0.1);
  const navigate = useNavigate();
  const go = () => { navigate(`/blog/${project.slug}`); window.scrollTo(0, 0); };
  return (
    <div ref={ref} onClick={go} className={`rv ${vis ? "vis" : ""} group bg-white border border-[#E4E1D9] rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#C8922A]/30 ${project.featured ? "col-span-2" : ""}`}>
      <div className={`w-full overflow-hidden bg-[#0B1221] ${project.featured ? "aspect-[21/9]" : "aspect-video"}`}>{project.mockup}</div>
      <div className="p-6">
        <div className="flex gap-1.5 flex-wrap mb-3">{project.badges.map(b => <span key={b.label} className={`text-[9px] font-extrabold tracking-[.1em] px-2.5 py-0.5 rounded-full uppercase ${b.cls}`}>{b.label}</span>)}</div>
        <h3 className={`serif text-[#0B1221] mb-2 leading-tight ${project.featured ? "text-[22px]" : "text-[18px]"}`}>{project.title}</h3>
        <p className="text-[13px] leading-[1.72] text-[#6B7592] mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E4E1D9] mb-3">{project.tech.map(t => <span key={t} className="text-[10px] font-semibold text-[#6B7592] bg-[#F8F6F1] border border-[#E4E1D9] px-2.5 py-0.5 rounded-full">{t}</span>)}</div>
        <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#C8922A] mt-2 group-hover:gap-3 transition-all">View Case Study <Arr sz={12} /></div>
      </div>
    </div>
  );
}

function ContactSection() {
  const [sRef, sVis] = useRev(0.05);
  const BLANK = { name: "", company: "", email: "", phone: "", service: "", budget: "", timeline: "", message: "" };
  const [form, setForm] = useState(BLANK);
  const [errs, setErrs] = useState({});
  const [loading, setLd] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrs(e => ({ ...e, [k]: "" })); };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Your name is required";
    if (!form.email.trim()) e.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.service) e.service = "Please select a service";
    if (!form.message.trim()) e.message = "Tell us about your project";
    return e;
  };
  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrs(e); return; }
    setLd(true);
    try {
      const response = await fetch("https://formspree.io/f/xkgqlbjd", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: form.name, company: form.company, email: form.email, phone: form.phone, service: form.service, timeline: form.timeline, message: form.message }),
      });
      if (response.ok) { setSent(true); }
      else { const data = await response.json(); setErrs({ submit: data.errors?.map(err => err.message).join(", ") || "Something went wrong." }); }
    } catch { setErrs({ submit: "Network error — please check your connection and try again." }); }
    finally { setLd(false); }
  };
  const SVCS = ["Web Platform / App", "Mobile App (iOS & Android)", "Cloud & DevOps Setup", "AI & Automation", "Cybersecurity Audit", "Data & Analytics", "School Management System", "Other / Not Sure Yet"];
  const TIMES = ["ASAP / Within a month", "1–3 months", "3–6 months", "6+ months / Ongoing"];
  const INFO = [{ icon: "📧", label: "Email", value: "flexilogicafrica@gmail.com" }, { icon: "📞", label: "Phone", value: "+263 77 000 0000" }, { icon: "📍", label: "Location", value: "Harare, Zimbabwe" }, { icon: "⚡", label: "Response", value: "Within 24 hours" }];
  return (
    <section id="contact" aria-label="Contact us" className="relative overflow-hidden py-16 md:py-24 px-6 md:px-12" style={{ background: "linear-gradient(160deg,#0B1221 0%,#131D35 60%,#1B2847 100%)" }}>
      <div className="absolute bottom-[-8%] right-[-4%] w-[320px] h-[320px] opacity-[0.05] pointer-events-none">
        <svg width="320" height="320" viewBox="0 0 320 320"><circle cx="160" cy="160" r="120" fill="none" stroke="#C8922A" strokeWidth="1" strokeDasharray="8 5" /><circle cx="160" cy="160" r="65" fill="none" stroke="#C8922A" strokeWidth="1" />{[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => <circle key={i} cx={160 + 65 * Math.cos(a * Math.PI / 180)} cy={160 + 65 * Math.sin(a * Math.PI / 180)} r="3" fill="#C8922A" />)}</svg>
      </div>
      <div className="absolute top-0 left-[8%] w-px h-full bg-gradient-to-b from-transparent via-[#C8922A]/15 to-transparent pointer-events-none" />
      <div ref={sRef} className={`rv ${sVis ? "vis" : ""} relative z-10 max-w-[1100px] mx-auto`}>
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#C8922A]/10 border border-[#C8922A]/25 text-[#C8922A] text-[10px] font-bold tracking-[.12em] px-3.5 py-1.5 rounded-full mb-4 uppercase"><span className="w-1.5 h-1.5 rounded-full bg-[#C8922A] inline-block" />Start a Conversation</div>
          <h2 className="serif italic text-white leading-[.95] mb-4" style={{ fontSize: "clamp(34px,5vw,60px)" }}>Let's Make <span className="text-[#C8922A]">Something</span><br />Legendary.</h2>
          <p className="text-[15px] text-white/50 max-w-[480px] leading-[1.78]">Tell us what you're building. We review every submission personally and reply within 24 hours.</p>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-[1fr_300px]">
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm">
            {sent ? (
              <div className="success-pop flex flex-col items-center justify-center text-center py-14 gap-5">
                <div className="w-16 h-16 rounded-full bg-[#00C896]/15 border border-[#00C896]/35 flex items-center justify-center text-[#00C896]"><CheckCircle /></div>
                <div><h3 className="serif italic text-white text-[26px] mb-2">Message sent!</h3><p className="text-white/50 text-[14px] leading-relaxed max-w-xs">Thanks for reaching out. We'll be in touch within <span className="text-[#C8922A] font-semibold">24 hours</span>.</p></div>
                <button onClick={() => { setSent(false); setForm(BLANK); }} className="mt-1 text-[12px] font-bold text-[#C8922A] border border-[#C8922A]/30 px-5 py-2 rounded-lg hover:bg-[#C8922A]/10 transition-all cursor-pointer bg-transparent">Send another message →</button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="cf-label">Full Name <span>*</span></label><input className={`cf-input${errs.name ? " err" : ""}`} placeholder="Tinashe Banda" value={form.name} onChange={e => set("name", e.target.value)} />{errs.name && <p className="cf-error">{errs.name}</p>}</div>
                  <div><label className="cf-label">Company / Organisation</label><input className="cf-input" placeholder="ZimTech Holdings" value={form.company} onChange={e => set("company", e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="cf-label">Email Address <span>*</span></label><input type="email" className={`cf-input${errs.email ? " err" : ""}`} placeholder="you@company.co.zw" value={form.email} onChange={e => set("email", e.target.value)} />{errs.email && <p className="cf-error">{errs.email}</p>}</div>
                  <div><label className="cf-label">Phone / WhatsApp</label><input className="cf-input" placeholder="+263 77 000 0000" value={form.phone} onChange={e => set("phone", e.target.value)} /></div>
                </div>
                <div><label htmlFor="cf-service" className="cf-label">Service Needed <span>*</span></label><select id="cf-service" className={`cf-input${errs.service ? " err" : ""}`} value={form.service} onChange={e => set("service", e.target.value)} aria-required="true" aria-invalid={!!errs.service} aria-describedby={errs.service ? "cf-service-err" : undefined}><option value="">Select a service…</option>{SVCS.map(s => <option key={s} value={s}>{s}</option>)}</select>{errs.service && <p id="cf-service-err" className="cf-error" role="alert">{errs.service}</p>}</div>
                <div><label htmlFor="cf-timeline" className="cf-label">Timeline</label><select id="cf-timeline" className="cf-input" value={form.timeline} onChange={e => set("timeline", e.target.value)}><option value="">When do you need it?</option>{TIMES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                <div><label className="cf-label">Tell Us About Your Project <span>*</span></label><textarea className={`cf-input${errs.message ? " err" : ""}`} placeholder="Describe your idea, the problem it solves, and any technical details…" value={form.message} onChange={e => set("message", e.target.value)} />{errs.message && <p className="cf-error">{errs.message}</p>}</div>
                {errs.submit && <p className="text-center text-[12px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">{errs.submit}</p>}
                <button onClick={handleSubmit} disabled={loading} className="btn-shimmer w-full font-bold text-[15px] text-[#0B1221] border-none rounded-xl py-3.5 cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed mt-1">
                  {loading ? (<><svg className="spin-loader" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>Sending…</>) : (<>Send Message <Arr sz={15} /></>)}
                </button>
                <p className="text-center text-white/50 text-[11px]">We respect your privacy — your details are never shared with third parties.</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {INFO.map(c => (
              <div key={c.label} className="flex items-center gap-3.5 bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3.5 hover:border-[#C8922A]/30 hover:bg-[#C8922A]/[0.04] transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#C8922A]/15 flex items-center justify-center text-lg flex-shrink-0">{c.icon}</div>
                <div><div className="text-[10px] font-bold uppercase tracking-[.08em] text-white/55 mb-0.5">{c.label}</div><div className="text-[13px] font-semibold text-white/80">{c.value}</div></div>
              </div>
            ))}
            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5 mt-1">
              <div className="text-[10px] font-extrabold tracking-[.1em] text-[#C8922A] uppercase mb-4">Why FlexiLogic?</div>
              {["Global standards", "Fixed-scope or retainer options", "Dedicated PM on every project", "Post-launch support included", "Transparent pricing, no surprises"].map(item => (
                <div key={item} className="flex items-start gap-2.5 mb-3 last:mb-0">
                  <div className="w-4 h-4 rounded-full bg-[#C8922A]/20 flex items-center justify-center flex-shrink-0 mt-0.5"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#C8922A" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg></div>
                  <span className="text-[13px] text-white/50 leading-snug">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl p-4 border-l-[3px] border-[#C8922A]">
              <p className="serif italic text-[13px] text-[#0B1221] leading-snug mb-3">"Delivered in 6 weeks. Exactly what we envisioned."</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#C8922A] flex items-center justify-center text-[11px] font-bold text-[#0B1221]">C</div>
                <div><div className="text-[11px] font-bold text-[#0B1221]">Chiedza M.</div><div className="text-[10px] text-[#6B7592]">CEO, EduVest Africa</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ MAIN ═══════════════════ */
export default function FlexilogicPortfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [showreel, setShowreel] = useState(false);
  const [mobNav, setMobNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useSEO({
    title:       "FlexiLogic Africa — Software Engineering Studio, Harare Zimbabwe",
    description: "FlexiLogic Africa builds flexible, scalable software — web platforms, mobile apps, cloud infrastructure, AI automation, and cybersecurity for businesses across Africa.",
    canonical:   "https://www.flexilogicafrica.com/",
    keywords:    "software development Zimbabwe, web development Harare, mobile app development Africa, Flutter developer Zimbabwe, cloud devops Zimbabwe, AI automation Africa, cybersecurity Zimbabwe",
  });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Scroll to hash section on load or when hash changes (e.g. navigating from /blog/x to /#contact)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    let attempts = 0;
    const interval = setInterval(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        clearInterval(interval);
      } else if (++attempts > 30) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [location.hash]);

  return (
    <>
      <GlobalStyles />
      {showreel && <ShowreelModal onClose={() => setShowreel(false)} />}

      {/* ═══ SKIP NAV (accessibility) ═══ */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-[#C8922A] focus:text-[#0B1221] focus:font-bold focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm">Skip to main content</a>

      {/* ═══ NAV ═══ */}
      <nav aria-label="Main navigation" className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 h-16 flex items-center justify-between transition-all duration-300 ${scrolled ? "bg-[#0B1221]/95 backdrop-blur-[18px] border-b border-white/[0.07]" : "bg-transparent"}`}>
        <div className="flex items-center gap-2.5">
          <LogoMark size={38} />
          <div>
            <div className="text-[16px] font-extrabold text-white tracking-tight leading-tight">FLEXILOGIC</div>
            <div className="text-[8px] font-bold tracking-[.2em] text-[#C8922A]">AFRICA</div>
          </div>
        </div>
        {/* Desktop nav */}
        <div className="nav-links-desktop items-center gap-0.5">
          {["Services", "Process", "Work", "Blog", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[13px] font-semibold text-white/65 px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.08] transition-all no-underline">{l}</a>
          ))}
        </div>
        <div className="nav-ctas-desktop flex gap-2">
          <button onClick={() => { const el = document.getElementById("work"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="font-semibold text-xs bg-white/[0.08] text-white border border-white/[0.14] rounded-[10px] px-4 py-2 hover:bg-white/[0.14] transition-all cursor-pointer">View Work</button>
          <a href="#contact" className="btn-shimmer font-bold text-xs text-[#0B1221] border-none rounded-[10px] px-4 py-2 cursor-pointer flex items-center gap-1.5 no-underline">Start Project <Arr /></a>
        </div>
        {/* Mobile hamburger */}
        <button className="mob-menu" onClick={() => setMobNav(v => !v)} aria-label="Toggle navigation" aria-expanded={mobNav}>
          <span style={mobNav ? {transform:"rotate(45deg) translate(4px,4px)"} : {}} />
          <span style={mobNav ? {opacity:0} : {}} />
          <span style={mobNav ? {transform:"rotate(-45deg) translate(4px,-4px)"} : {}} />
        </button>
        {/* Mobile menu dropdown */}
        <div className={`nav-links-mobile ${mobNav ? "open" : ""}`}>
          {["Services", "Process", "Work", "Blog", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobNav(false)} className="text-[15px] font-semibold text-white/75 px-3 py-3 rounded-lg hover:text-white hover:bg-white/[0.08] transition-all no-underline border-b border-white/[0.05]">{l}</a>
          ))}
          <a href="#contact" onClick={() => setMobNav(false)} className="btn-shimmer font-bold text-[14px] text-[#0B1221] border-none rounded-xl px-5 py-3 cursor-pointer flex items-center justify-center gap-1.5 no-underline mt-3">Start Project <Arr /></a>
        </div>
      </nav>

      {/* ═══ MAIN CONTENT ═══ */}
      <main id="main-content">

      {/* ═══ HERO ═══ */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-12 pt-24 pb-20" style={{ background: "linear-gradient(160deg,#0B1221 0%,#131D35 55%,#1B2847 100%)" }}>
        <div className="absolute top-0 right-0 w-[480px] h-[480px] opacity-[0.06] pointer-events-none">
          <svg width="480" height="480" viewBox="0 0 480 480"><line x1="240" y1="0" x2="240" y2="480" stroke="#C8922A" strokeWidth="1" /><line x1="0" y1="240" x2="480" y2="240" stroke="#C8922A" strokeWidth="1" /><circle cx="240" cy="240" r="120" fill="none" stroke="#C8922A" strokeWidth="1" /><circle cx="240" cy="240" r="200" fill="none" stroke="#C8922A" strokeWidth=".5" strokeDasharray="6 4" />{[0, 60, 120, 180, 240, 300].map((a, i) => <circle key={i} cx={240 + 120 * Math.cos(a * Math.PI / 180)} cy={240 + 120 * Math.sin(a * Math.PI / 180)} r="5" fill="#C8922A" />)}</svg>
        </div>
        <div className="spin absolute bottom-[10%] left-[5%] w-44 h-44 border border-[#C8922A]/10 rounded-full pointer-events-none" />
        <div className="absolute pointer-events-none" style={{ bottom: "calc(10% + 28px)", left: "calc(5% + 28px)", width: 124, height: 124, border: "1px solid rgba(200,146,42,0.07)", borderRadius: "50%" }} />
        <div className="absolute top-[20%] right-[30%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(200,146,42,0.07) 0%,transparent 70%)" }} />
        <div className="relative z-10 max-w-[1200px] mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div>
              <div className="afu inline-flex items-center gap-2 bg-[#C8922A]/12 border border-[#C8922A]/30 text-[#C8922A] text-[10px] font-bold tracking-[.12em] px-3.5 py-1.5 rounded-full mb-7 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8922A] inline-block" />Software Engineering Studio · Africa
              </div>
              <h1 className="serif afu text-white leading-[.95] mb-5 italic tracking-tight" style={{ fontSize: "clamp(46px,6vw,78px)", animationDelay: ".08s" }}>
                We Design<br /><span className="text-[#C8922A]">&amp; Build</span><br />Products
              </h1>
              <p className="serif italic afu text-white/45 text-[15px] font-light mb-5 max-w-sm" style={{ animationDelay: ".1s" }}>that actually matter.</p>
              <p className="afu text-[15px] leading-[1.78] text-white/60 max-w-[430px] mb-9" style={{ animationDelay: ".18s" }}>
                FlexiLogic Africa builds flexible, scalable software solutions that help businesses across Africa solve real problems and grow with confidence.
              </p>
              <div className="afu flex flex-col sm:flex-row gap-3 mb-12" style={{ animationDelay: ".26s" }}>
                <a href="#contact" className="btn-shimmer font-bold text-[14px] text-[#0B1221] border-none rounded-xl px-7 py-3 cursor-pointer flex items-center gap-2 no-underline">Start a Project <Arr /></a>
                <button onClick={() => setShowreel(true)} className="group font-semibold text-[14px] bg-transparent text-white border border-white/20 rounded-xl px-7 py-3 cursor-pointer flex items-center gap-2.5 hover:border-[#C8922A]/50 hover:bg-[#C8922A]/5 transition-all">
                  <span className="w-8 h-8 rounded-full bg-[#C8922A]/15 border border-[#C8922A]/30 flex items-center justify-center group-hover:bg-[#C8922A]/25 transition-all pl-0.5"><PlayIcon sz={14} /></span>
                  Watch Showreel
                </button>
              </div>
              <div className="afu flex flex-wrap gap-y-4" style={{ animationDelay: ".36s" }}>
                {[["60", "+", "Projects Shipped"], ["8", "yrs", "Experience"], ["40", "+", "Clients"]].map(([v, s, l], i) => (
                  <div key={l} className={`flex-1 ${i < 2 ? "pr-7 border-r border-white/10 mr-7" : ""}`}>
                    <div className="serif text-[36px] text-[#C8922A] italic leading-none"><Counter to={v} suf={s} /></div>
                    <div className="text-[11px] text-white/45 mt-1 font-medium">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[500px] hidden md:block">
              <div className="afr af1 absolute top-0 left-[6%] w-[295px] bg-[#131D35] border border-white/[0.08] rounded-[18px] overflow-hidden shadow-[0_28px_70px_rgba(0,0,0,0.45)]" style={{ animationDelay: ".3s" }}>
                <div className="bg-[#1B2847] px-4 py-2.5 flex items-center gap-1.5 border-b border-white/[0.06]">
                  {["#ff4f6b", "#C8922A", "#00C896"].map((c, i) => <div key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />)}
                  <span className="text-[10px] text-white/60 ml-2 font-semibold tracking-[.06em]">PROJECT STATUS</span>
                </div>
                <div className="p-5">
                  {[{ n: "Eduverse School Management", s: "LIVE", col: "#00C896", bg: "rgba(0,200,150,0.1)" }, { n: "Zimlearnerspot Elearning", s: "LIVE", col: "#00C896", bg: "rgba(0,200,150,0.1)" }, { n: "Farmers Hub", s: "REVIEW", col: "#C8922A", bg: "rgba(200,146,42,0.12)" }, { n: "PayGo Mobile", s: "BUILD", col: "#7C9FFF", bg: "rgba(124,159,255,0.1)" }].map(p => (
                    <div key={p.n} className="flex items-center justify-between py-2 border-b border-white/[0.05]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.col, boxShadow: `0 0 6px ${p.col}` }} />
                        <span className="text-[12px] text-white/80 font-semibold">{p.n}</span>
                      </div>
                      <span className="text-[9px] font-extrabold tracking-[.1em] px-2 py-0.5 rounded-full" style={{ color: p.col, background: p.bg }}>{p.s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="afr af2 absolute bottom-[5%] right-0 w-[232px] bg-[#131D35] border border-white/[0.08] rounded-[18px] p-5 shadow-[0_20px_56px_rgba(0,0,0,0.38)]" style={{ animationDelay: ".48s" }}>
                <div className="text-[10px] font-extrabold tracking-[.1em] text-[#C8922A] mb-4 uppercase">Sprint Velocity</div>
                {[["Frontend", 91, "#C8922A"], ["Backend", 78, "#7C9FFF"], ["QA", 95, "#00C896"]].map(([l, p, c]) => (
                  <div key={l} className="mb-3">
                    <div className="flex justify-between mb-1"><span className="text-[11px] text-white/50">{l}</span><span className="text-[11px] font-extrabold" style={{ color: c }}>{p}%</span></div>
                    <div className="h-1 bg-white/[0.07] rounded-full"><div className="h-full rounded-full" style={{ width: `${p}%`, background: c, boxShadow: `0 0 8px ${c}55` }} /></div>
                  </div>
                ))}
              </div>
              <div className="afr absolute bg-white rounded-[16px] p-4 border-l-[3px] border-[#C8922A] shadow-[0_12px_40px_rgba(0,0,0,0.2)]" style={{ top: "68%", left: "4%", width: 212, animationDelay: ".6s" }}>
                <p className="serif italic text-[13px] text-[#0B1221] leading-snug mb-2">"Delivered in 6 weeks. Exactly what we envisioned."</p>
                <span className="text-[10px] font-bold text-[#6B7592]">— CEO, Eduverse Africa</span>
              </div>
              <div className="afr absolute bg-[#1B2847] border border-white/[0.08] rounded-[14px] p-4" style={{ top: "40%", right: "3%", width: 174, animationDelay: ".55s" }}>
                <div className="text-[9px] font-bold tracking-[.14em] text-white/60 mb-2 uppercase">Our Stack</div>
                <div className="flex gap-2 text-[19px] flex-wrap">{["⚛️", "🟢", "🐍", "📱", "☁️", "🔷"].map((e, i) => <span key={i}>{e}</span>)}</div>
              </div>
            </div>
          </div>
        </div>
        <svg className="absolute bottom-[-2px] left-0 right-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" height="60"><path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60Z" fill="#F8F6F1" /></svg>
      </section>

      {/* ═══ TICKER ═══ */}
      <div className="border-t border-b border-[#E4E1D9] py-3 bg-[#0B1221] overflow-hidden">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="ticker-inner">
            {[...Array(2)].map((_, rep) => (
              <span key={rep} className="inline-flex items-center">
                {["WEB DEVELOPMENT", "MOBILE APPS", "CLOUD & DEVOPS", "AI INTEGRATION", "CYBERSECURITY", "DATA & ANALYTICS", "UX / UI DESIGN", "AGILE DELIVERY"].map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-4 px-6">
                    <span className="text-[11px] font-bold text-white/60 tracking-[.14em] whitespace-nowrap">{item}</span>
                    <span className="text-[#C8922A] text-xs">◆</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ SERVICES ═══ */}
      <section id="services" aria-label="Our services" className="py-16 md:py-24 px-6 md:px-12 bg-[#F8F6F1]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 md:mb-14">
            <div className="rv">
              <div className="inline-flex items-center text-[10px] font-extrabold tracking-[.1em] uppercase text-[#C8922A] bg-[#FDF3E0] border border-[#C8922A]/25 px-3 py-1 rounded-full mb-3.5">What We Do</div>
              <h2 className="serif italic text-[#0B1221] leading-tight" style={{ fontSize: "clamp(30px,4vw,48px)" }}>Our <span className="text-[#C8922A] underline decoration-[#C8922A] underline-offset-[6px]">Services</span></h2>
            </div>
            <button onClick={() => { const el = document.getElementById("work"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="rv font-bold text-[13px] bg-transparent text-[#0B1221] border border-[#E4E1D9] rounded-xl px-5 py-2.5 flex items-center gap-2 mb-2 cursor-pointer hover:border-[#C8922A]/30 transition-all">See All Work <Arr /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => {
              const [ref, vis] = useRev(0.2);
              return (
                <div ref={ref} key={s.t} onClick={() => { navigate(`/blog/${s.slug}`); window.scrollTo(0,0); }} className={`rv ${vis ? "vis" : ""} group bg-white border border-[#E4E1D9] rounded-[20px] p-7 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#C8922A]/30`} style={{ transitionDelay: `${i * .06}s` }}>
                  <div className="w-[46px] h-[46px] rounded-[13px] bg-[#FDF3E0] text-[22px] flex items-center justify-center mb-4">{s.e}</div>
                  <div className="serif text-[20px] text-[#0B1221] mb-2">{s.t}</div>
                  <p className="text-[13px] leading-[1.72] text-[#6B7592]">{s.d}</p>
                  <div className="flex items-center gap-1.5 mt-4 text-[#C8922A] font-bold text-[12px] group-hover:gap-2.5 transition-all">Learn more <Arr sz={12} /></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <div className="bg-[#0B1221] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["60", "+", "Projects Shipped"], ["8", " yrs", "Industry Experience"], ["40", "+", "Clients Active"], ["12", "", "Countries Served"]].map(([v, s, l]) => (
            <div key={l}>
              <div className="serif text-[52px] text-[#C8922A] italic leading-none"><Counter to={v} suf={s} /></div>
              <div className="text-[12px] text-white/65 mt-1.5 font-medium">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ PROCESS ═══ */}
      <section id="process" className="relative py-16 md:py-24 px-4 md:px-6 bg-[#EEE9DF]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-1 rounded-full bg-gradient-to-r from-[#C8922A] to-[#E5A93C]" />
        <div className="text-center mb-20 relative z-10">
          <div className="rv inline-flex text-[10px] font-extrabold tracking-[.1em] uppercase text-[#C8922A] bg-[#FDF3E0] border border-[#C8922A]/25 px-3 py-1 rounded-full mb-3.5">How We Work</div>
          <h2 className="rv serif italic text-[#0B1221]" style={{ fontSize: "clamp(30px,5vw,56px)" }}>The <span className="text-[#C8922A]">Journey</span></h2>
          <p className="rv text-[14px] text-[#6B7592] max-w-[420px] mx-auto mt-3.5 leading-[1.78]">A transparent, battle-tested process that turns your vision into software people actually love using.</p>
        </div>
        <div className="relative max-w-[900px] mx-auto md:min-h-[1560px]">
          <ProcessPath />
          <div className="relative z-10">{STEPS.map((s, i) => <StepCard key={s.id} step={s} idx={i} />)}</div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section id="work" className="py-16 md:py-24 px-6 md:px-12 bg-[#F8F6F1]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 md:mb-14">
            <div className="rv">
              <div className="inline-flex text-[10px] font-extrabold tracking-[.1em] uppercase text-[#C8922A] bg-[#FDF3E0] border border-[#C8922A]/25 px-3 py-1 rounded-full mb-3.5">Our Work</div>
              <h2 className="serif italic text-[#0B1221] leading-tight" style={{ fontSize: "clamp(30px,4vw,48px)" }}>Featured <span className="text-[#C8922A] underline decoration-[#C8922A] underline-offset-[6px]">Projects</span></h2>
            </div>
            <button onClick={() => { const el = document.getElementById("work"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="rv font-bold text-[13px] bg-transparent text-[#0B1221] border border-[#E4E1D9] rounded-xl px-5 py-2.5 flex items-center gap-2 mb-2 cursor-pointer hover:border-[#C8922A]/30 transition-all">All Projects <Arr /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}</div>
        </div>
      </section>

      {/* ═══ SHOWREEL BANNER ═══ */}
      <div className="relative overflow-hidden py-12 md:py-16 px-6 md:px-12" style={{ background: "linear-gradient(135deg,#0B1221 0%,#1B2847 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <line x1="0" y1="100" x2="1200" y2="100" stroke="#C8922A" strokeWidth="1" />
            {[100, 300, 500, 700, 900, 1100].map(x => <g key={x}><line x1={x} y1="100" x2={x} y2="30" stroke="#C8922A" strokeWidth="1" /><circle cx={x} cy="30" r="4" fill="#C8922A" /></g>)}
          </svg>
        </div>
        <div className="relative z-10 max-w-[1100px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-extrabold tracking-[.15em] text-[#C8922A] uppercase mb-2">FlexiLogic Studio</p>
            <h3 className="serif italic text-white text-[32px] leading-tight mb-2">See our work in motion.</h3>
            <p className="text-white/45 text-[14px] leading-relaxed max-w-md">Watch how we've transformed ideas into products used across Africa and beyond.</p>
          </div>
          <button onClick={() => setShowreel(true)} className="group flex-shrink-0 flex items-center gap-4 bg-white/[0.06] hover:bg-[#C8922A]/10 border border-white/10 hover:border-[#C8922A]/40 rounded-2xl px-8 py-5 transition-all duration-300 cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-[#C8922A] flex items-center justify-center shadow-[0_0_32px_rgba(200,146,42,0.4)] group-hover:scale-110 transition-transform pl-1"><PlayIcon sz={24} /></div>
            <div className="text-left"><div className="text-white font-bold text-[15px]">Watch Showreel</div><div className="text-white/40 text-[12px]">2025 · Studio Reel</div></div>
          </button>
        </div>
      </div>

      {/* ═══ TRUSTED BY ═══ */}
      <div className="border-t border-b border-[#E4E1D9] py-6 px-6 md:px-12 bg-[#F8F6F1] flex flex-wrap items-center gap-6 md:gap-12 overflow-hidden">
        <span className="text-[10px] font-extrabold tracking-[.1em] text-[#6B7592] whitespace-nowrap uppercase">Trusted by</span>
        <div className="flex gap-12 flex-wrap">
          {["AcademyPro", "BrightMinds", "ZimTech", "PayGo", "AgriLink", "HealthBridge"].map(n => (
            <span key={n} className="text-[14px] font-bold text-[#0B1221]/50 tracking-wide">{n}</span>
          ))}
        </div>
      </div>

      {/* ═══ BLOG ═══ */}
      <BlogSection />

      {/* ═══ CONTACT ═══ */}
      <ContactSection />

      {/* ═══ FOOTER ═══ */}
      </main>{/* end #main-content */}

      <footer aria-label="Site footer" className="border-t border-white/[0.07] pt-12 md:pt-14 pb-8 px-6 md:px-12 bg-[#080F1E]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-3.5"><LogoMark size={36} /><div><div className="text-[15px] font-extrabold text-white tracking-tight">FLEXILOGIC</div><div className="text-[8px] font-bold tracking-[.2em] text-[#C8922A]">AFRICA</div></div></div>
              <p className="text-[13px] text-white/55 leading-[1.75] max-w-[240px]">Building Africa's digital future, one product at a time. Globally-minded.</p>
            </div>
            {[
              { h: "Services", ls: ["Web Development", "Mobile Apps", "Cloud & DevOps", "AI Integration", "Cybersecurity"] },
              { h: "Company", ls: ["About Us", "Our Work", "Blog", "Careers", "Press Kit"] },
              { h: "Contact", ls: ["flexilogicafrica@gmail.com", "+263 77 255 0103", "Harare, Zimbabwe", "Remote · Worldwide"] },
            ].map(col => (
              <div key={col.h}>
                <div className="text-[11px] font-extrabold text-white mb-4 tracking-[.08em] uppercase">{col.h}</div>
                {col.ls.map(l => <div key={l} className="text-[13px] text-white/55 mb-2.5 cursor-pointer hover:text-[#C8922A] transition-colors">{l}</div>)}
              </div>
            ))}
          </div>
          <div className="h-px mb-6" style={{ background: "linear-gradient(90deg,#C8922A,rgba(200,146,42,0.1),transparent)" }} />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-[12px] text-white/45">© 2025 FlexiLogic Africa. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}