import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES  (fonts + tiny keyframes)
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');

    :root {
      --navy:   #0B1221;
      --navy2:  #131D35;
      --navy3:  #1B2847;
      --gold:   #C8922A;
      --gold2:  #E5A93C;
      --gold-lt:#FDF3E0;
      --cream:  #F8F6F1;
      --cream2: #EEE9DF;
      --ink:    #0B1221;
      --sub:    #6B7592;
      --line:   #E4E1D9;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--cream);
      color: var(--ink);
      overflow-x: hidden;
    }

    .serif { font-family: 'DM Serif Display', Georgia, serif; }

    /* Grain texture overlay */
    body::after {
      content: '';
      position: fixed; inset: 0; z-index: 9998; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.022;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

    /* Animations */
    @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
    @keyframes fadeLeft  { from { opacity:0; transform:translateX(-36px); } to { opacity:1; transform:none; } }
    @keyframes fadeRight { from { opacity:0; transform:translateX(36px); }  to { opacity:1; transform:none; } }
    @keyframes floatA    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes floatB    { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(-14px) rotate(-1deg)} }
    @keyframes ticker    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes dashFlow  { to { stroke-dashoffset:-28; } }
    @keyframes spinSlow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes shimmer   { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes pulseRing { 0%,100%{box-shadow:0 0 0 0 rgba(200,146,42,0)} 50%{box-shadow:0 0 0 8px rgba(200,146,42,0.18)} }

    .afu  { animation: fadeUp    0.75s ease both; }
    .afr  { animation: fadeRight 0.75s ease both; }
    .afl  { animation: fadeLeft  0.75s ease both; }
    .af1  { animation: floatA    5s ease-in-out infinite; }
    .af2  { animation: floatB    7s ease-in-out infinite; }
    .spin { animation: spinSlow 22s linear infinite; }

    /* Scroll reveal */
    .rv  { opacity:0; transform:translateY(26px); transition:opacity .65s ease,transform .65s ease; }
    .rv.rl  { transform:translateX(-34px); }
    .rv.rr  { transform:translateX(34px); }
    .rv.vis { opacity:1!important; transform:none!important; }

    /* Nav link */
    .nav-a {
      font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.65);
      text-decoration: none; padding: 6px 13px; border-radius: 8px;
      transition: color .2s, background .2s;
    }
    .nav-a:hover { color:#fff; background: rgba(255,255,255,0.08); }
    .nav-a.dark { color: var(--sub); }
    .nav-a.dark:hover { color: var(--ink); background: var(--cream2); }

    /* Dashed path */
    .path-dashed { stroke-dasharray:16 9; animation: dashFlow 1.6s linear infinite; }

    /* Gold shimmer button */
    .btn-shimmer {
      background: linear-gradient(90deg, var(--gold) 0%, var(--gold2) 40%, var(--gold) 60%, var(--gold2) 100%);
      background-size: 200% 100%;
      animation: shimmer 3s linear infinite;
    }

    /* Circuit line decorations */
    .circuit-line {
      position: absolute; background: var(--gold);
      opacity: 0.15; border-radius: 2px;
    }

    /* Ticker */
    .ticker-wrap { overflow: hidden; white-space: nowrap; }
    .ticker-inner { display: inline-flex; animation: ticker 32s linear infinite; }

    /* Card hover */
    .hov-card {
      transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
    }
    .hov-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 24px 64px rgba(11,18,33,0.12);
      border-color: rgba(200,146,42,0.35) !important;
    }
  `}</style>
);

/* ─── Reveal hook ─── */
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

/* ─── Animated counter ─── */
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

/* ─── Arrow icon ─── */
const Arr = ({ sz = 14 }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ─── Logo SVG (Africa continent + circuit) ─── */
const LogoMark = ({ size = 38 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect width="100" height="100" rx="14" fill="#0B1221" />
    {/* Africa silhouette simplified */}
    <path d="M38 14 C30 16 24 22 22 30 C20 38 22 44 20 50 C18 58 22 66 28 72 C34 78 40 82 46 84 C52 86 58 82 62 76 C66 70 66 62 68 56 C70 50 74 44 72 38 C70 32 64 28 60 22 C56 16 46 12 38 14Z" fill="#F8F6F1" opacity="0.92" />
    {/* Circuit traces */}
    <line x1="50" y1="60" x2="50" y2="38" stroke="#0B1221" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="50" y1="52" x2="42" y2="44" stroke="#0B1221" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="50" y1="38" x2="58" y2="30" stroke="#C8922A" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="50" cy="62" r="3.5" fill="#6B7592" />
    <circle cx="42" cy="43" r="3.5" fill="#6B7592" />
    <circle cx="58" cy="29" r="3.5" fill="#C8922A" />
    <circle cx="50" cy="37" r="3.5" fill="#C8922A" />
  </svg>
);

/* ─── STEPS ─── */
const STEPS = [
  {
    id: "01", title: "Discovery & Strategy", sub: "We learn before we leap",
    desc: "Immersive stakeholder sessions, competitive mapping, and technical scoping — distilled into a crystal-clear product brief that anchors every decision.",
    tags: ["Stakeholder Workshops", "Market Research", "Tech Scoping", "Product Brief"],
    metric: "2–4", mUnit: "days", mLabel: "Discovery sprint",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4M8 11h6M11 8v6" /></svg>,
  },
  {
    id: "02", title: "UX / UI Design", sub: "Every pixel, intentional",
    desc: "Wireframes that evolve into clickable prototypes. Design systems built for scale. Every interaction validated against real users before code is written.",
    tags: ["Wireframing", "Design System", "Prototyping", "User Testing"],
    metric: "1–3", mUnit: "weeks", mLabel: "Design phase",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
  },
  {
    id: "03", title: "Agile Development", sub: "2-week sprints, zero drift",
    desc: "React, Next.js, Node, Flutter — we pick the right tool, not the trendy one. CI/CD from day one. You see working software every fortnight.",
    tags: ["Sprint Planning", "Code Reviews", "CI/CD Pipeline", "Daily Standups"],
    metric: "2-week", mUnit: "", mLabel: "Sprint cadence",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  },
  {
    id: "04", title: "QA & Security Testing", sub: "Ships only when bulletproof",
    desc: "Unit tests, end-to-end flows, penetration testing, and load audits. We find every bug so your users never encounter one.",
    tags: ["E2E Testing", "Perf Audits", "Pen Testing", "UAT"],
    metric: "99.8", mUnit: "%", mLabel: "Post-launch uptime",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  },
  {
    id: "05", title: "Deployment & Launch", sub: "Zero-downtime, full confidence",
    desc: "Infrastructure provisioned as code, monitoring armed, rollback ready. Your product goes live with an ops team watching every metric in real time.",
    tags: ["Cloud Infra", "Zero-Downtime", "Live Monitoring", "Rollback Plan"],
    metric: "<24", mUnit: "hrs", mLabel: "Average deploy time",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 19V5M5 12l7-7 7 7" /><path d="M19 21H5" /></svg>,
  },
  {
    id: "06", title: "Support & Growth", sub: "We grow as you grow",
    desc: "Monthly retainers, feature roadmaps, 24/7 alerting, and a dedicated technical partner who treats your product like their own.",
    tags: ["24/7 Monitoring", "Monthly Releases", "Roadmap Mgmt", "Priority SLA"],
    metric: "100", mUnit: "+", mLabel: "Long-term clients",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0" /><path d="M12 8v4l3 3" /></svg>,
  },
];

const SERVICES = [
  { e: "⚡", t: "Web Platforms",    d: "Scalable web apps with modern frameworks, optimised for speed and conversion." },
  { e: "📲", t: "Mobile Apps",      d: "Cross-platform iOS & Android experiences via Flutter and React Native." },
  { e: "☁️", t: "Cloud & DevOps",   d: "AWS, GCP, Azure — infrastructure as code with zero-downtime pipelines." },
  { e: "🤖", t: "AI & Automation",  d: "Smart features, intelligent workflows, and LLM-powered product experiences." },
  { e: "🔐", t: "Cybersecurity",    d: "Penetration testing, security audits, and secure-by-design architecture." },
  { e: "📊", t: "Data & Analytics", d: "Dashboards, data pipelines, and insights that drive real business decisions." },
];

/* ─── Step Card ─── */
function StepCard({ step, idx }) {
  const [ref, vis] = useRev(0.18);
  const isLeft = idx % 2 === 0;

  return (
    <div ref={ref} style={{ position: "relative", display: "flex", alignItems: "center", minHeight: 220, marginBottom: 60 }}>

      {/* Ghost number */}
      <div className="serif" style={{
        position: "absolute", [isLeft ? "right" : "left"]: 0,
        top: "50%", transform: "translateY(-50%)",
        fontSize: 120, lineHeight: 1, fontStyle: "italic",
        color: "#C8922A", opacity: 0.055, pointerEvents: "none", userSelect: "none",
      }}>{step.id}</div>

      {/* Centre node */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%,-50%)", zIndex: 20,
        width: 34, height: 34, borderRadius: "50%",
        background: "#fff",
        border: "2px solid #C8922A",
        boxShadow: "0 0 0 7px rgba(200,146,42,0.12), 0 4px 14px rgba(11,18,33,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "pulseRing 3s ease-in-out infinite",
      }}>
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#C8922A" }} />
      </div>

      {/* Card */}
      <div
        className={`hov-card rv ${isLeft ? "rl" : "rr"} ${vis ? "vis" : ""}`}
        style={{
          width: "calc(50% - 46px)",
          marginLeft: isLeft ? 0 : "auto",
          marginRight: isLeft ? "auto" : 0,
          background: "#fff",
          border: "1px solid #E4E1D9",
          borderRadius: 20,
          padding: 28,
          transitionDelay: `${idx * 0.08}s`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold top accent */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#C8922A,#E5A93C88)", borderRadius: "20px 20px 0 0" }} />

        {/* Step label + title */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: "#FDF3E0", color: "#C8922A",
            border: "1px solid rgba(200,146,42,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{step.icon}</div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".1em", color: "#C8922A", marginBottom: 3, textTransform: "uppercase" }}>
              Step {step.id}
            </div>
            <div className="serif" style={{ fontSize: 19, color: "#0B1221", lineHeight: 1.1 }}>{step.title}</div>
            <div style={{ fontSize: 11, color: "#6B7592", marginTop: 2, fontStyle: "italic" }}>{step.sub}</div>
          </div>
        </div>

        <p style={{ fontSize: 13, lineHeight: 1.78, color: "#6B7592", marginBottom: 16 }}>{step.desc}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
          {step.tags.map(t => (
            <span key={t} style={{
              fontSize: 10, fontWeight: 700, letterSpacing: ".06em", padding: "3px 10px",
              borderRadius: 100, textTransform: "uppercase",
              background: "#FDF3E0", color: "#C8922A",
              border: "1px solid rgba(200,146,42,0.2)",
            }}>{t}</span>
          ))}
        </div>

        {/* Metric */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, paddingTop: 14, borderTop: "1px solid #E4E1D9" }}>
          <span className="serif" style={{ fontSize: 28, color: "#0B1221", fontStyle: "italic" }}>{step.metric}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#0B1221" }}>{step.mUnit}</span>
          <span style={{ fontSize: 11, color: "#6B7592", marginLeft: 4 }}>{step.mLabel}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Process Path SVG ─── */
function ProcessPath() {
  const d = "M400 40 C610 180 660 340 400 490 C140 640 90 800 400 950 C660 1100 710 1260 400 1410 C90 1560 70 1720 400 1870 C720 2020 730 2180 400 2330 C90 2480 100 2600 400 2700";
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 2800" preserveAspectRatio="none" style={{ pointerEvents: "none", zIndex: 1 }}>
      <defs>
        <linearGradient id="pg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C8922A" stopOpacity=".9" />
          <stop offset="50%" stopColor="#E5A93C" stopOpacity=".9" />
          <stop offset="100%" stopColor="#C8922A" stopOpacity=".9" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <path d={d} fill="none" stroke="url(#pg)" strokeWidth="12" filter="url(#glow)" opacity=".18" strokeLinecap="round" />
      <path d={d} fill="none" stroke="url(#pg)" strokeWidth="2" strokeDasharray="16 9" className="path-dashed" opacity=".65" strokeLinecap="round" />
    </svg>
  );
}

/* ─── MAIN ─── */
export default function FlexilogicPortfolio() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <GlobalStyles />

      {/* ══════════════════ NAV ══════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 48px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(11,18,33,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        transition: "all .3s ease",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LogoMark size={38} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-.01em", lineHeight: 1.1 }}>FLEXILOGIC</div>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: ".2em", color: "#C8922A" }}>AFRICA</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {["Services", "Process", "Work", "About", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-a">{l}</a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button style={{
            fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 12,
            background: "rgba(255,255,255,0.08)", color: "#fff",
            border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10,
            padding: "8px 16px", cursor: "pointer", transition: "all .2s",
          }}>View Work</button>
          <button className="btn-shimmer" style={{
            fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 12,
            color: "#0B1221", border: "none", borderRadius: 10,
            padding: "8px 18px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            Start Project <Arr />
          </button>
        </div>
      </nav>

      {/* ══════════════════ HERO ══════════════════ */}
      <section id="hero" style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center",
        padding: "100px 48px 80px",
        background: "linear-gradient(160deg, #0B1221 0%, #131D35 55%, #1B2847 100%)",
      }}>
        {/* Circuit decoration top-right */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 480, height: 480, opacity: 0.06, pointerEvents: "none" }}>
          <svg width="480" height="480" viewBox="0 0 480 480">
            <line x1="240" y1="0" x2="240" y2="480" stroke="#C8922A" strokeWidth="1" />
            <line x1="0" y1="240" x2="480" y2="240" stroke="#C8922A" strokeWidth="1" />
            <circle cx="240" cy="240" r="120" fill="none" stroke="#C8922A" strokeWidth="1" />
            <circle cx="240" cy="240" r="200" fill="none" stroke="#C8922A" strokeWidth=".5" strokeDasharray="6 4" />
            {[0,60,120,180,240,300].map((a,i)=>(
              <circle key={i} cx={240+120*Math.cos(a*Math.PI/180)} cy={240+120*Math.sin(a*Math.PI/180)} r="5" fill="#C8922A" />
            ))}
          </svg>
        </div>

        {/* Spinning ring */}
        <div className="spin" style={{ position: "absolute", bottom: "10%", left: "5%", width: 180, height: 180, border: "1px solid rgba(200,146,42,0.1)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "calc(10% + 28px)", left: "calc(5% + 28px)", width: 124, height: 124, border: "1px solid rgba(200,146,42,0.07)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Gold gradient orb */}
        <div style={{ position: "absolute", top: "20%", right: "30%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,146,42,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

            {/* LEFT */}
            <div>
              {/* Badge */}
              <div className="afu" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(200,146,42,0.12)", border: "1px solid rgba(200,146,42,0.3)",
                color: "#C8922A", fontSize: 10, fontWeight: 700, letterSpacing: ".12em",
                padding: "5px 14px", borderRadius: 100, marginBottom: 28, textTransform: "uppercase",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C8922A", display: "inline-block" }} />
                Software Development Studio · Africa
              </div>

              <h1 className="serif afu" style={{
                fontSize: "clamp(46px, 6vw, 78px)", fontStyle: "italic",
                lineHeight: .95, color: "#fff", marginBottom: 24, animationDelay: ".08s",
                letterSpacing: "-.02em",
              }}>
                We Design<br />
                <span style={{ color: "#C8922A" }}>&amp; Build</span><br />
                <span style={{ color: "#fff" }}>Products</span>
              </h1>
              <p style={{ fontSize: 15, lineHeight: 1.5, color: "rgba(255,255,255,0.45)", fontWeight: 300, letterSpacing: ".01em", marginBottom: 24, maxWidth: 380 }} className="afu serif">
                that actually matter.
              </p>

              <p className="afu" style={{ fontSize: 15, lineHeight: 1.78, color: "rgba(255,255,255,0.6)", maxWidth: 430, marginBottom: 36, animationDelay: ".18s" }}>
                FlexiLogic Africa is a full-spectrum software studio. We take ambitious ideas from napkin sketch to market-ready product — precise, fast, and built to last.
              </p>

              <div className="afu" style={{ display: "flex", gap: 12, marginBottom: 52, animationDelay: ".26s" }}>
                <button className="btn-shimmer" style={{
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 14,
                  color: "#0B1221", border: "none", borderRadius: 12,
                  padding: "13px 28px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  Start a Project <Arr />
                </button>
                <button style={{
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14,
                  background: "transparent", color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 12,
                  padding: "13px 28px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "all .2s",
                }}>Watch Showreel</button>
              </div>

              {/* Stats row */}
              <div className="afu" style={{ display: "flex", gap: 0, animationDelay: ".36s" }}>
                {[["60", "+", "Projects Shipped"], ["8", "yrs", "Experience"], ["40", "+", "Clients"]].map(([v, s, l], i) => (
                  <div key={l} style={{
                    flex: 1, paddingRight: 28,
                    borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
                    marginRight: i < 2 ? 28 : 0,
                  }}>
                    <div className="serif" style={{ fontSize: 36, color: "#C8922A", fontStyle: "italic", lineHeight: 1 }}>
                      <Counter to={v} suf={s} />
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 4, fontWeight: 500 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — floating UI cards */}
            <div style={{ position: "relative", height: 500 }}>

              {/* Project status card */}
              <div className="afr af1" style={{
                position: "absolute", top: "0%", left: "6%", width: 295,
                background: "#131D35", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18, overflow: "hidden", animationDelay: ".3s",
                boxShadow: "0 28px 70px rgba(0,0,0,0.45)",
              }}>
                <div style={{ background: "#1B2847", padding: "10px 16px", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["#ff4f6b", "#C8922A", "#00C896"].map((c, i) => <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginLeft: 8, fontWeight: 600, letterSpacing: ".06em" }}>PROJECT STATUS</span>
                </div>
                <div style={{ padding: 20 }}>
                  {[
                    { n: "EduVest Platform",  s: "LIVE",   col: "#00C896", bg: "rgba(0,200,150,0.1)" },
                    { n: "Zim Marketplace",   s: "REVIEW", col: "#C8922A", bg: "rgba(200,146,42,0.12)" },
                    { n: "PayGo Mobile",      s: "BUILD",  col: "#7C9FFF", bg: "rgba(124,159,255,0.1)" },
                    { n: "AgriLink Portal",   s: "DESIGN", col: "#A78BFA", bg: "rgba(167,139,250,0.1)" },
                  ].map(p => (
                    <div key={p.n} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.col, boxShadow: `0 0 6px ${p.col}` }} />
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{p.n}</span>
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".1em", color: p.col, background: p.bg, padding: "2px 8px", borderRadius: 100 }}>{p.s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sprint velocity card */}
              <div className="afr af2" style={{
                position: "absolute", bottom: "5%", right: "0%", width: 232,
                background: "#131D35", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18, padding: 20, animationDelay: ".48s",
                boxShadow: "0 20px 56px rgba(0,0,0,0.38)",
              }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".1em", color: "#C8922A", marginBottom: 16, textTransform: "uppercase" }}>Sprint Velocity</div>
                {[["Frontend", 91, "#C8922A"], ["Backend", 78, "#7C9FFF"], ["QA", 95, "#00C896"]].map(([l, p, c]) => (
                  <div key={l} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{l}</span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: c }}>{p}%</span>
                    </div>
                    <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2 }}>
                      <div style={{ height: "100%", width: `${p}%`, background: c, borderRadius: 2, boxShadow: `0 0 8px ${c}55` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial card */}
              <div className="afr" style={{
                position: "absolute", top: "68%", left: "4%", width: 212,
                background: "#fff", borderRadius: 16, padding: "16px 18px",
                animationDelay: ".6s",
                borderLeft: "3px solid #C8922A",
                boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
              }}>
                <div className="serif" style={{ fontSize: 13, fontStyle: "italic", color: "#0B1221", lineHeight: 1.55, marginBottom: 8 }}>
                  "Delivered in 6 weeks. Exactly what we envisioned."
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#6B7592" }}>— CEO, EduVest Africa</div>
              </div>

              {/* Stack badge */}
              <div className="afr" style={{
                position: "absolute", top: "40%", right: "3%", width: 174,
                background: "#1B2847", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14, padding: "14px 16px", animationDelay: ".55s",
              }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".14em", color: "rgba(255,255,255,0.4)", marginBottom: 8, textTransform: "uppercase" }}>Our Stack</div>
                <div style={{ display: "flex", gap: 8, fontSize: 19, flexWrap: "wrap" }}>
                  {["⚛️", "🟢", "🐍", "📱", "☁️", "🔷"].map((e, i) => <span key={i}>{e}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <svg style={{ position: "absolute", bottom: -2, left: 0, right: 0, width: "100%" }} viewBox="0 0 1440 60" preserveAspectRatio="none" height="60">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60Z" fill="#F8F6F1" />
        </svg>
      </section>

      {/* ══════════════════ TICKER ══════════════════ */}
      <div style={{ borderTop: "1px solid #E4E1D9", borderBottom: "1px solid #E4E1D9", padding: "13px 0", background: "#0B1221", overflow: "hidden" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...Array(2)].map((_, rep) => (
              <span key={rep} style={{ display: "inline-flex", alignItems: "center" }}>
                {["WEB DEVELOPMENT", "MOBILE APPS", "CLOUD & DEVOPS", "AI INTEGRATION", "CYBERSECURITY", "DATA & ANALYTICS", "UX / UI DESIGN", "AGILE DELIVERY"].map((item, i) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 16, padding: "0 24px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: ".14em", whiteSpace: "nowrap" }}>{item}</span>
                    <span style={{ color: "#C8922A", fontSize: 12 }}>◆</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════ SERVICES ══════════════════ */}
      <section id="services" style={{ padding: "100px 48px", background: "#F8F6F1" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56 }}>
            <div className="rv">
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                fontSize: 10, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase",
                color: "#C8922A", background: "#FDF3E0",
                border: "1px solid rgba(200,146,42,0.25)",
                padding: "5px 13px", borderRadius: 100, marginBottom: 14,
              }}>What We Do</div>
              <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 48px)", fontStyle: "italic", color: "#0B1221", lineHeight: 1.05 }}>
                Our <span style={{ color: "#C8922A", textDecoration: "underline", textDecorationColor: "#C8922A", textUnderlineOffset: 6 }}>Services</span>
              </h2>
            </div>
            <button className="rv" style={{
              fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 13,
              background: "transparent", color: "#0B1221",
              border: "1.5px solid #E4E1D9", borderRadius: 12,
              padding: "10px 20px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 7,
              transition: "all .2s", marginBottom: 8,
            }}>See All Work <Arr /></button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {SERVICES.map((s, i) => {
              const [ref, vis] = useRev(0.2);
              return (
                <div ref={ref} key={s.t}
                  className={`hov-card rv ${vis ? "vis" : ""}`}
                  style={{ background: "#fff", border: "1px solid #E4E1D9", borderRadius: 20, padding: 28, cursor: "pointer", transitionDelay: `${i * .06}s` }}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: "#FDF3E0", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{s.e}</div>
                  <div className="serif" style={{ fontSize: 20, color: "#0B1221", marginBottom: 8 }}>{s.t}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.72, color: "#6B7592" }}>{s.d}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 18, color: "#C8922A", fontWeight: 700, fontSize: 12 }}>
                    Learn more <Arr sz={12} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <div style={{ background: "#0B1221", padding: "64px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center" }}>
          {[["60", "+", "Projects Shipped"], ["8", " yrs", "Industry Experience"], ["40", "+", "Clients Active"], ["12", "", "Countries Served"]].map(([v, s, l]) => (
            <div key={l}>
              <div className="serif" style={{ fontSize: 52, color: "#C8922A", fontStyle: "italic", lineHeight: 1 }}>
                <Counter to={v} suf={s} />
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6, fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════ PROCESS PATH ══════════════════ */}
      <section id="process" style={{ padding: "100px 24px", position: "relative", background: "#EEE9DF" }}>
        {/* Gold rule accent */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 60, height: 4, background: "linear-gradient(90deg,#C8922A,#E5A93C)", borderRadius: 2 }} />

        <div style={{ textAlign: "center", marginBottom: 80, position: "relative", zIndex: 2 }}>
          <div className="rv" style={{
            display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10, fontWeight: 800,
            letterSpacing: ".1em", color: "#C8922A", background: "#FDF3E0",
            border: "1px solid rgba(200,146,42,0.25)", padding: "5px 13px",
            borderRadius: 100, marginBottom: 14, textTransform: "uppercase",
          }}>How We Work</div>
          <h2 className="rv serif" style={{ fontSize: "clamp(30px, 5vw, 56px)", fontStyle: "italic", color: "#0B1221" }}>
            The <span style={{ color: "#C8922A" }}>Journey</span>
          </h2>
          <p className="rv" style={{ fontSize: 14, color: "#6B7592", maxWidth: 420, margin: "14px auto 0", lineHeight: 1.78 }}>
            A transparent, battle-tested process that turns your vision into software people actually love using.
          </p>
        </div>

        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", minHeight: STEPS.length * 260 }}>
          <ProcessPath />
          <div style={{ position: "relative", zIndex: 2 }}>
            {STEPS.map((s, i) => <StepCard key={s.id} step={s} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════ TRUSTED BY ══════════════════ */}
      <div style={{ borderTop: "1px solid #E4E1D9", borderBottom: "1px solid #E4E1D9", padding: "28px 48px", background: "#F8F6F1", display: "flex", alignItems: "center", gap: 48, overflow: "hidden" }}>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".1em", color: "#6B7592", whiteSpace: "nowrap", textTransform: "uppercase" }}>Trusted by</span>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          {["AcademyPro", "BrightMinds", "ZimTech", "PayGo", "AgriLink", "HealthBridge"].map(n => (
            <span key={n} style={{ fontSize: 14, fontWeight: 700, color: "rgba(11,18,33,0.2)", letterSpacing: ".03em" }}>{n}</span>
          ))}
        </div>
      </div>

      {/* ══════════════════ CTA ══════════════════ */}
      <section id="contact" style={{
        padding: "120px 48px", position: "relative", overflow: "hidden",
        background: "linear-gradient(160deg,#0B1221 0%,#131D35 60%,#1B2847 100%)",
      }}>
        {/* Circuit decoration */}
        <div style={{ position: "absolute", bottom: "-5%", right: "-5%", width: 360, height: 360, opacity: 0.05, pointerEvents: "none" }}>
          <svg width="360" height="360" viewBox="0 0 360 360">
            <circle cx="180" cy="180" r="140" fill="none" stroke="#C8922A" strokeWidth="1" strokeDasharray="8 5" />
            <circle cx="180" cy="180" r="80" fill="none" stroke="#C8922A" strokeWidth="1" />
            {[0,45,90,135,180,225,270,315].map((a,i)=>(
              <circle key={i} cx={180+80*Math.cos(a*Math.PI/180)} cy={180+80*Math.sin(a*Math.PI/180)} r="4" fill="#C8922A" />
            ))}
          </svg>
        </div>
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 1, height: "60%", background: "linear-gradient(to bottom,transparent,rgba(200,146,42,0.2),transparent)" }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10, fontWeight: 700, letterSpacing: ".12em", color: "#C8922A", background: "rgba(200,146,42,0.1)", border: "1px solid rgba(200,146,42,0.25)", padding: "5px 14px", borderRadius: 100, marginBottom: 20, textTransform: "uppercase" }} className="rv">
            Ready to Build?
          </div>
          <h2 className="rv serif" style={{ fontSize: "clamp(38px, 7vw, 72px)", fontStyle: "italic", color: "#fff", lineHeight: .95, marginBottom: 22, letterSpacing: "-.02em" }}>
            Let's Make<br />
            <span style={{ color: "#C8922A" }}>Something</span><br />
            Legendary.
          </h2>
          <p className="rv" style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 40, lineHeight: 1.78 }}>
            Tell us your vision. We turn bold ideas into scalable, beautiful digital products — on time, every time.
          </p>
          <div className="rv" style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            <button className="btn-shimmer" style={{
              fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 15,
              color: "#0B1221", border: "none", borderRadius: 12,
              padding: "14px 32px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
            }}>Start a Project <Arr /></button>
            <button style={{
              fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15,
              background: "transparent", color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.18)", borderRadius: 12,
              padding: "14px 32px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
            }}>flexilogicafrica@gmail.com</button>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "60px 48px 32px", background: "#080F1E" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <LogoMark size={36} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "-.01em" }}>FLEXILOGIC</div>
                  <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: ".2em", color: "#C8922A" }}>AFRICA</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.75, maxWidth: 240 }}>
                Building Africa's digital future, one product at a time. Harare-based, globally-minded.
              </p>
            </div>
            {[
              { h: "Services", ls: ["Web Development", "Mobile Apps", "Cloud & DevOps", "AI Integration", "Cybersecurity"] },
              { h: "Company",  ls: ["About Us", "Our Work", "Careers", "Blog", "Press Kit"] },
              { h: "Contact",  ls: ["flexilogicafrica@gmail.com", "+263 77 000 0000", "Harare, Zimbabwe", "Remote · Worldwide"] },
            ].map(col => (
              <div key={col.h}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#fff", marginBottom: 16, letterSpacing: ".08em", textTransform: "uppercase" }}>{col.h}</div>
                {col.ls.map(l => (
                  <div key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 9, cursor: "pointer", transition: "color .2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#C8922A"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
                  >{l}</div>
                ))}
              </div>
            ))}
          </div>
          {/* Gold divider */}
          <div style={{ height: 1, background: "linear-gradient(90deg, #C8922A, rgba(200,146,42,0.1), transparent)", marginBottom: 24 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2025 FlexiLogic Africa. All rights reserved.</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Built in Zimbabwe 🇿🇼 · Serving the world 🌍</span>
          </div>
        </div>
      </footer>
    </>
  );
}