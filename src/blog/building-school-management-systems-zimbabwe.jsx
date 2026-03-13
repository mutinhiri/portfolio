import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════════
   FlexilogicBlogArticle.jsx
   ─────────────────────────────────────────────────────────────
   HOW TO USE THIS TEMPLATE FOR EVERY NEW BLOG POST:

   1. Copy this file (or import it as a route component).
   2. Find the const ARTICLE = { … } object below and fill it in:
        - slug, title, category, date, readTime, author, excerpt
        - content: array of blocks (heading, paragraph, image,
          quote, code, callout, list) — examples are in the
          sample article below.
   3. In your router, add a route like:
        <Route path="/blog/:slug" element={<FlexilogicBlogArticle />} />
      The component reads the :slug param and finds the right
      article from BLOG_POSTS (imported from the portfolio file)
      or you can keep the article data right here.
   4. Make sure the `slug` here matches the `slug` in BLOG_POSTS
      in FlexilogicPortfolio.jsx so the card links to this page.
   ═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   ARTICLE DATA  ← Edit everything in this object for each post


/* ─── Styles ─── */
const ARTICLE = {
  slug: "building-school-management-system-zimbabwe",
  category: "Product",
  categoryColor: "bg-[#00C896]/15 text-[#00C896]",
  title: "Eduverse: How We Built a Full-Stack School Management System for African Schools",
  subtitle: "One platform for admins, teachers, parents, and accountants — how we designed and shipped Eduverse, a school management system built for the real operational challenges facing Zimbabwean schools in 2025.",
  date: "13 March 2025",
  readTime: "10 min read",
  author: {
    name: "FlexiLogic Team",
    role: "Engineering & Product",
    avatar: "FL",
  },
  coverEmoji: "🏫",
  coverBg: "linear-gradient(135deg,#0B1221 0%,#1B2847 100%)",

  content: [
    {
      type: "paragraph",
      text: "Most school management systems were built for schools that have reliable electricity, stable internet, a dedicated IT administrator, and a single fee currency. Zimbabwean schools have none of those things by default. Eduverse was built for the reality on the ground — multi-role access, offline-resilient design, flexible fee structures, and communication channels that actually reach parents.",
    },
    {
      type: "paragraph",
      text: "In this post we break down exactly what Eduverse does, how we architected the four core role portals (Admin, Teacher, Parent, Accountant), the product decisions that shaped each module, and why we believe this is the right foundation for school management software across sub-Saharan Africa.",
    },
    { type: "divider" },
    {
      type: "heading",
      level: 2,
      text: "What Is Eduverse?",
    },
    {
      type: "paragraph",
      text: "Eduverse is a web-based school management system (SMS) designed for secondary and primary schools in Zimbabwe and the broader African market. It consolidates four traditionally siloed administrative workflows — school administration, classroom management, parent communication, and fee accounting — into a single, role-based platform. Each user type sees only the tools relevant to their job, reducing training overhead and minimising data exposure.",
    },
    {
      type: "callout",
      emoji: "🎯",
      title: "Who Eduverse is built for",
      text: "School administrators who need to manage terms, timetables, and staff assignments. Teachers who need to set homework, record marks, and take attendance. Parents who want real-time visibility into their child's progress and fees. Accountants who need to issue invoices, track payments, and reconcile fee collections — all in one place.",
    },
    {
      type: "heading",
      level: 2,
      text: "The Admin Portal: Running the School from One Dashboard",
    },
    {
      type: "paragraph",
      text: "School administrators are the power users of Eduverse. The admin portal is built around three core workflows: academic configuration, staff management, and school-wide reporting. Before a new term begins, the admin sets up the term calendar — defining start and end dates, holiday blocks, and examination periods. This term configuration becomes the backbone that every other module references.",
    },
    {
      type: "heading",
      level: 3,
      text: "Timetable Management",
    },
    {
      type: "paragraph",
      text: "Timetabling is one of the most complex scheduling problems in secondary education. Each form has a different subject combination, teachers have maximum period loads, and rooms have capacity constraints. We built a drag-and-drop timetable builder that lets admins construct weekly schedules visually and then publishes them to every teacher and student automatically. Clash detection runs in real time — if you try to assign the same teacher to two classes at the same period, the system flags it immediately rather than letting the error silently propagate.",
    },
    {
      type: "callout",
      emoji: "💡",
      title: "Design decision",
      text: "We deliberately kept timetable data separate from attendance data at the database level. This means historical attendance records remain accurate even when timetables are revised mid-term — a common occurrence in schools running make-up lessons or reshuffling staff.",
    },
    {
      type: "heading",
      level: 3,
      text: "Teacher-to-Class Assignments",
    },
    {
      type: "paragraph",
      text: "Admin users can view a live matrix of which teachers are assigned to which classes and subjects. The assignment view also surfaces unassigned subjects — a common pain point at the start of term when staff changes happen. Reassigning a teacher cascades through to their personal timetable and updates the affected class's timetable view in real time, with no manual syncing required.",
    },
    {
      type: "heading",
      level: 2,
      text: "The Teacher Portal: From Timetable to Markbook",
    },
    {
      type: "paragraph",
      text: "When a teacher logs in to Eduverse, the first thing they see is today's schedule pulled directly from the published timetable — which periods they have, which classes, and which subjects. Every action a teacher needs to take during their working day is reachable in two clicks or fewer from that home screen.",
    },
    {
      type: "heading",
      level: 3,
      text: "Homework and Assessments",
    },
    {
      type: "paragraph",
      text: "Teachers can create homework tasks and formal assessments directly from their class view. Each task has a due date, a maximum mark, and an optional description or file attachment. Once published, the task appears in the parent portal so families know what is expected and when. For assessments, teachers can configure whether the mark contributes to the term average and at what weighting — supporting both continuous assessment models and single-examination grading schemes.",
    },
    {
      type: "heading",
      level: 3,
      text: "Mark Recording",
    },
    {
      type: "paragraph",
      text: "The markbook is a spreadsheet-style grid where teachers enter raw scores that are automatically converted to percentages, grades, and comments based on the school's grading scale (which the admin configures once at setup). Bulk import from CSV is supported for teachers who prefer to record marks offline first. Every mark entry is timestamped and attributed to the recording teacher, creating a full audit trail for moderation purposes.",
    },
    {
      type: "heading",
      level: 3,
      text: "Attendance Register",
    },
    {
      type: "paragraph",
      text: "Each period on a teacher's timetable has a one-tap attendance register. The teacher sees their class list, marks present or absent for each student, and optionally adds a reason code (sick, late, suspended, etc.). Submission takes under two minutes for a class of 40. The system aggregates attendance data continuously, so by the time a parent gets an SMS alert about low attendance, the data has already been cross-referenced against excused absences to reduce false alarms.",
    },
    {
      type: "quote",
      text: "Before Eduverse, I was keeping three separate registers — one for the school office, one for my markbook, and one for the department head. Now I enter it once and everyone sees it. It has saved me at least an hour every single school day.",
      author: "Form 4 Maths Teacher, Harare",
    },
    {
      type: "heading",
      level: 2,
      text: "The Parent Portal: Visibility Without the Phone Call",
    },
    {
      type: "paragraph",
      text: "Parent engagement is one of the strongest predictors of student academic outcomes — and one of the hardest things for schools to operationalise at scale. Most schools default to paper reports sent home once a term and phone calls when something goes wrong. Eduverse replaces both with a real-time parent portal and push notifications.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Attendance summary — daily and weekly attendance percentage per subject, with absence reason codes visible where provided",
        "Mark recordings — test and assignment results appear as soon as a teacher submits them, with the class average shown for context",
        "Upcoming homework and assessments — due dates and task descriptions set by teachers",
        "Fee balance — current amount owed, payment history, and any outstanding invoices",
        "School notifications — term dates, event notices, and urgent announcements from the admin",
      ],
    },
    {
      type: "paragraph",
      text: "Notifications are delivered via SMS for critical alerts (low attendance threshold crossed, a fee payment confirmed, a new report card published) and in-app for general updates. We chose SMS as the primary push channel because smartphone penetration among parents in our target market is growing rapidly, but data connectivity is still unreliable outside Harare's CBD. An SMS arrives even on a feature phone with no data.",
    },
    {
      type: "heading",
      level: 2,
      text: "The Accountant Portal: Fee Management That Actually Reconciles",
    },
    {
      type: "paragraph",
      text: "School fee management in Zimbabwe is genuinely complex. Fee structures differ by form, by boarding status, by subject combination, and sometimes by individual student arrangement (scholarship, sibling discount, government subsidy). Payment can come in USD cash, EcoCash mobile money, bank transfer, or a mix of all three. Any fee management system that doesn't handle this complexity from day one will be abandoned within a term.",
    },
    {
      type: "heading",
      level: 3,
      text: "Fee Structure Configuration",
    },
    {
      type: "paragraph",
      text: "Accountants (or admins with accountant permissions) configure fee structures at the start of each term. A base fee is set per form and boarding status, and individual adjustments — discounts, scholarships, surcharges — can be applied per student with a mandatory reason field and approval workflow. This creates the complete audit trail that school boards and auditors require.",
    },
    {
      type: "code",
      lang: "sql",
      text: `-- Core fee obligation model (simplified)
CREATE TABLE fee_structures (
  id            UUID PRIMARY KEY,
  term_id       UUID REFERENCES terms(id),
  form          SMALLINT NOT NULL,         -- 1–6
  is_boarding   BOOLEAN DEFAULT false,
  base_amount   NUMERIC(10,2) NOT NULL,
  currency      TEXT DEFAULT 'USD',
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE student_fee_adjustments (
  id                  UUID PRIMARY KEY,
  student_id          UUID REFERENCES students(id),
  fee_structure_id    UUID REFERENCES fee_structures(id),
  adjustment_type     TEXT,  -- 'discount' | 'scholarship' | 'surcharge'
  amount              NUMERIC(10,2),
  reason              TEXT NOT NULL,
  approved_by         UUID REFERENCES staff(id),
  approved_at         TIMESTAMPTZ
);

CREATE TABLE fee_payments (
  id              UUID PRIMARY KEY,
  student_id      UUID REFERENCES students(id),
  term_id         UUID REFERENCES terms(id),
  amount_paid     NUMERIC(10,2),
  payment_method  TEXT,  -- 'cash' | 'ecocash' | 'bank_transfer'
  reference       TEXT,
  recorded_by     UUID REFERENCES staff(id),
  paid_at         TIMESTAMPTZ DEFAULT now()
);`,
    },
    {
      type: "paragraph",
      text: "The separation of base structures, per-student adjustments, and payment records into three distinct tables is intentional. It means we can always reconstruct the exact fee obligation for any student at any point in time — useful for disputes, audits, and the government returns that schools are required to file.",
    },
    {
      type: "heading",
      level: 3,
      text: "Payment Recording and Receipts",
    },
    {
      type: "paragraph",
      text: "When a payment is recorded, Eduverse automatically generates a PDF receipt and sends an SMS notification to the parent. The accountant's dashboard shows a live collection rate — total collected versus total invoiced — broken down by form, class, and payment method. End-of-term reconciliation, which previously took senior accountants up to six hours, now takes under forty minutes.",
    },
    {
      type: "heading",
      level: 2,
      text: "Architecture and Technical Decisions",
    },
    {
      type: "paragraph",
      text: "Eduverse is a React single-page application fronted by a Node.js/Express REST API, with PostgreSQL as the primary data store. We chose this stack for three reasons: our engineering team knows it deeply, it handles Eduverse's relational data model well, and it is cost-effective to host on AWS in the af-south-1 (Cape Town) region — reducing latency for southern African users compared to EU or US regions.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "React + Tailwind CSS — component-driven UI with rapid iteration cycles",
        "Node.js / Express — REST API with JWT-based role authentication",
        "PostgreSQL — relational schema with row-level security per school (multi-tenancy)",
        "Redis + Bull — background job queues for SMS dispatch, PDF generation, and report aggregation",
        "AWS S3 — document storage for report cards, receipts, and uploaded resources",
        "AWS Lambda — serverless PDF generation triggered by S3 events",
        "Twilio SMS — parent and staff notifications with delivery status webhooks",
      ],
    },
{
  type: "heading",
  level: 3,
  text: "Single-School Deployment: One System, One School",
},
{
  type: "paragraph",
  text: "Eduverse is intentionally deployed as a dedicated instance per school. Each school gets their own hosted environment — their own database, their own subdomain, their own configuration — with no data shared across institutions. This is a deliberate product decision, not a technical limitation.",
},
{
  type: "callout",
  emoji: "🏫",
  title: "Why single-school deployment?",
  text: "Every school operates differently. Fee structures, grading scales, timetable formats, subject combinations, and reporting requirements vary not just by country but by individual institution. A shared multi-tenant platform forces schools into a lowest-common-denominator configuration. Dedicated deployments mean each school's Eduverse instance is configured exactly for how that school actually runs — with no compromises.",
},
{
  type: "paragraph",
  text: "In practice this means a school in Bulawayo running a Cambridge A-Level programme and a school in Mutare on the ZIMSEC curriculum can both use Eduverse without either having to work around the other's setup. Grading scales, term structures, subject naming, fee categories, and report card templates are all configured independently per deployment.",
},
{
  type: "paragraph",
  text: "From an infrastructure standpoint, each deployment is a lightweight stack — a containerised Node.js API, a PostgreSQL database, and a static React frontend served via CDN. Provisioning a new school takes under 30 minutes. Updates and patches are rolled out across all deployments centrally by the FlexiLogic team, so schools get new features without needing any IT intervention on their side.",
},
    {
      type: "heading",
      level: 2,
      text: "Lessons Learned Building EdTech for African Schools",
    },
    {
      type: "paragraph",
      text: "Building software for this market taught us things that no amount of desk research could have surfaced. We share them here because we think they apply broadly to anyone building institutional software in emerging markets.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Design for low-bandwidth first. Every data-heavy view in Eduverse has a skeleton loader and incremental data fetching — the page is usable before all data has loaded.",
        "SMS beats push notifications every time. In-app notifications are nice-to-have. SMS is the contract with the parent. Never let anything important live only in-app.",
        "Role separation is a feature, not just an access control decision. Teachers do not want to see fee data. Parents do not want to see the timetable builder. Scoping each portal tightly reduces training burden dramatically.",
        "The data model for fees must be designed before a single line of application code is written. Retrofitting flexible fee structures onto a rigid schema is extremely painful and almost always results in hacky workarounds that break at audit time.",
        "Build an audit trail into every write operation from day one. Schools are accountable to boards, parents, and government. If you cannot show who changed what and when, you will lose institutional trust.",
      ],
    },
    {
      type: "quote",
      text: "The single best investment we made was spending a full sprint on the data model before building any UI. Every week of schema design saved us three weeks of migrations.",
      author: "Lead Engineer, FlexiLogic Africa",
    },
    {
      type: "heading",
      level: 2,
      text: "What's Coming Next",
    },
    {
      type: "paragraph",
      text: "Eduverse is a living platform. Based on feedback from our pilot schools and the broader market, the next development phase includes a parent-facing mobile app (Flutter, to maintain a single codebase for Android and iOS), a multi-school reporting dashboard for school network owners, an AI-assisted report card comment generator for teachers, and integration with Zimbabwe's ZIMSEC examination registration portal.",
    },
    {
      type: "callout",
      emoji: "🚀",
      title: "Now onboarding new schools",
      text: "Eduverse is open for enrolment. Whether you're running a single school or a network of campuses, we'll have you live within two weeks. Get in touch with the FlexiLogic team to book a demo.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "If you're a school owner, a school network operator, an EdTech founder, or a developer thinking about building school management software for the African market — we'd love to compare notes. The problems are hard, the market is underserved, and the impact of getting it right is genuinely significant.",
    },
  ],

  related: [
    {
      slug: "zero-downtime-deployments-node",
      category: "DevOps",
      categoryColor: "bg-[#C8922A]/15 text-[#C8922A]",
      title: "Zero-Downtime Deployments on a Budget: Our Node.js Playbook",
      date: "10 Jan 2025",
      readTime: "5 min read",
      cover: "☁️",
      coverBg: "linear-gradient(135deg,#0a1628 0%,#0d2137 100%)",
    },
    {
      slug: "why-african-startups-choose-flutter",
      category: "Engineering",
      categoryColor: "bg-[#7C9FFF]/15 text-[#7C9FFF]",
      title: "Why African Startups Are Choosing Flutter Over React Native in 2025",
      date: "28 Jan 2025",
      readTime: "6 min read",
      cover: "📱",
      coverBg: "linear-gradient(135deg,#0d1b2a 0%,#1a2f4a 100%)",
    },
  ],
};
const ArticleStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
    :root { --gold: #C8922A; }
    * { box-sizing: border-box; }
    body { font-family: 'DM Sans', sans-serif; background: #F8F6F1; margin: 0; overflow-x: hidden; }
    .serif { font-family: 'DM Serif Display', Georgia, serif; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #F8F6F1; }
    ::-webkit-scrollbar-thumb { background: #C8922A; border-radius: 2px; }

    /* Reading progress bar */
    #read-progress {
      position: fixed; top: 0; left: 0; height: 3px; z-index: 200;
      background: linear-gradient(90deg,#C8922A,#E5A93C);
      transition: width .1s linear;
    }

    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
    @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
    .btn-shimmer {
      background: linear-gradient(90deg,#C8922A 0%,#E5A93C 40%,#C8922A 60%,#E5A93C 100%);
      background-size: 200% 100%; animation: shimmer 3s linear infinite;
    }
    .afu { animation: fadeUp 0.6s ease both; }

    /* Article body prose */
    .prose-body { font-size: 17px; line-height: 1.85; color: #3D4461; }
    .prose-body p { margin: 0 0 1.6em; }

    /* Code block */
    .code-block {
      background: #0B1221;
      border: 1px solid rgba(200,146,42,0.15);
      border-radius: 14px;
      overflow: hidden;
      margin: 2em 0;
    }
    .code-block pre {
      margin: 0; padding: 22px 24px;
      font-family: 'Fira Code', 'Cascadia Code', 'Courier New', monospace;
      font-size: 13px; line-height: 1.7; color: #E2E8F0;
      overflow-x: auto;
    }
    .code-lang-badge {
      background: rgba(200,146,42,0.12);
      color: #C8922A;
      font-size: 10px; font-weight: 800;
      letter-spacing: .1em; text-transform: uppercase;
      padding: 6px 14px;
      border-bottom: 1px solid rgba(200,146,42,0.15);
    }

    /* TOC sticky */
    .toc-item {
      font-size: 12px; font-weight: 600; color: #6B7592;
      padding: 6px 0 6px 12px;
      border-left: 2px solid #E4E1D9;
      cursor: pointer;
      transition: color .18s, border-color .18s;
      line-height: 1.4;
    }
    .toc-item:hover, .toc-item.active { color: #C8922A; border-color: #C8922A; }
    .toc-item.h3 { padding-left: 24px; font-weight: 500; font-size: 11px; }

    /* Related card hover */
    .related-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; cursor: pointer; }
    .related-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(11,18,33,0.1); border-color: rgba(200,146,42,0.3) !important; }
  `}</style>
);

/* ─── Icons ─── */
const Arr = ({ sz = 14 }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);
const ArrLeft = ({ sz = 14 }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
);
const LogoMark = ({ size = 34 }) => (
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

/* ─── Hooks ─── */
function useReadProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const calc = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", calc, { passive: true });
    return () => window.removeEventListener("scroll", calc);
  }, []);
  return progress;
}

/* ─── Content block renderer ─── */
function Block({ block }) {
  switch (block.type) {
    case "paragraph":
      return <p className="prose-body">{block.text}</p>;

    case "heading":
      if (block.level === 2) return (
        <h2
          id={block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          className="serif italic text-[#0B1221] mt-12 mb-5"
          style={{ fontSize: "clamp(22px,3vw,28px)", scrollMarginTop: "96px" }}
        >
          {block.text}
        </h2>
      );
      return (
        <h3
          id={block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          className="serif italic text-[#0B1221] mt-9 mb-4 text-[20px]"
          style={{ scrollMarginTop: "96px" }}
        >
          {block.text}
        </h3>
      );

    case "quote":
      return (
        <blockquote className="my-8 pl-7 border-l-[3px] border-[#C8922A]">
          <p className="serif italic text-[#0B1221] text-[18px] leading-[1.7] mb-3">{block.text}</p>
          {block.author && <cite className="text-[12px] font-bold text-[#6B7592] not-italic">— {block.author}</cite>}
        </blockquote>
      );

    case "callout":
      return (
        <div className="my-7 bg-[#FDF3E0] border border-[#C8922A]/25 rounded-2xl px-6 py-5 flex gap-4">
          <div className="text-[22px] flex-shrink-0 mt-0.5">{block.emoji}</div>
          <div>
            {block.title && <div className="text-[11px] font-extrabold tracking-[.1em] text-[#C8922A] uppercase mb-2">{block.title}</div>}
            <p className="text-[14px] text-[#3D4461] leading-[1.75] m-0">{block.text}</p>
          </div>
        </div>
      );

    case "list":
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className={`my-6 pl-5 space-y-2 ${block.ordered ? "list-decimal" : "list-none"}`}>
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] text-[#3D4461] leading-[1.75]">
              {!block.ordered && (
                <span className="flex-shrink-0 mt-[6px] w-4 h-4 rounded-full bg-[#C8922A]/15 border border-[#C8922A]/30 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8922A] inline-block" />
                </span>
              )}
              {block.ordered && <span className="flex-shrink-0 w-5 text-right text-[#C8922A] font-bold text-[13px] mt-0.5">{i + 1}.</span>}
              <span>{item}</span>
            </li>
          ))}
        </Tag>
      );

    case "code":
      return (
        <div className="code-block">
          {block.lang && <div className="code-lang-badge">{block.lang}</div>}
          <pre><code>{block.text}</code></pre>
        </div>
      );

    case "image":
      return (
        <figure className="my-8">
          <img src={block.src} alt={block.caption || ""} className="w-full rounded-2xl border border-[#E4E1D9]" />
          {block.caption && <figcaption className="text-center text-[12px] text-[#6B7592] mt-3 font-medium">{block.caption}</figcaption>}
        </figure>
      );

    case "divider":
      return (
        <div className="my-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#E4E1D9]" />
          <span className="text-[#C8922A] text-xs">◆</span>
          <div className="flex-1 h-px bg-[#E4E1D9]" />
        </div>
      );

    default:
      return null;
  }
}

/* ─── Table of Contents ─── */
function TableOfContents({ content }) {
  const [active, setActive] = useState("");
  const headings = content.filter(b => b.type === "heading");

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-20% 0px -75% 0px" });
    headings.forEach(h => {
      const id = h.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24">
      <div className="text-[9px] font-extrabold tracking-[.15em] text-[#6B7592] uppercase mb-4">In this article</div>
      <nav className="flex flex-col gap-0.5">
        {headings.map((h, i) => {
          const id = h.text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <button
              key={i}
              className={`toc-item text-left ${h.level === 3 ? "h3" : ""} ${active === id ? "active" : ""}`}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            >
              {h.text}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* ─── Share buttons ─── */
function ShareBar({ title, slug }) {
  const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`;
  const encoded = encodeURIComponent(url);
  const titleEnc = encodeURIComponent(title);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[10px] font-bold tracking-[.1em] uppercase text-[#6B7592] mr-1">Share</span>
      <a href={`https://twitter.com/intent/tweet?url=${encoded}&text=${titleEnc}`} target="_blank" rel="noreferrer"
        className="w-8 h-8 rounded-lg bg-[#0B1221] flex items-center justify-center text-white hover:bg-[#1DA1F2] transition-colors no-underline">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noreferrer"
        className="w-8 h-8 rounded-lg bg-[#0B1221] flex items-center justify-center text-white hover:bg-[#0A66C2] transition-colors no-underline">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
      <button onClick={copy}
        className="w-8 h-8 rounded-lg bg-[#0B1221] flex items-center justify-center text-white hover:bg-[#C8922A] transition-colors cursor-pointer border-none">
        {copied
          ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        }
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function FlexilogicBlogArticle() {
  const progress = useReadProgress();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    window.scrollTo(0, 0);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const goTo = (slug) => {
    if (slug === "all") navigate("/blog");
    else navigate(`/blog/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <ArticleStyles />

      {/* Reading progress bar */}
      <div id="read-progress" style={{ width: `${progress}%` }} />

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] px-12 h-16 flex items-center justify-between transition-all duration-300 ${scrolled ? "bg-[#F8F6F1]/95 backdrop-blur-[18px] border-b border-[#E4E1D9]" : "bg-transparent"}`}>
        <div className="flex items-center gap-8">
          {/* Back to portfolio */}
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-[13px] font-semibold text-[#6B7592] hover:text-[#0B1221] transition-colors cursor-pointer bg-transparent border-none"
          >
            <ArrLeft sz={13} /> Back
          </button>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <LogoMark size={34} />
            <div>
              <div className="text-[14px] font-extrabold text-[#0B1221] tracking-tight leading-tight">FLEXILOGIC</div>
              <div className="text-[7px] font-bold tracking-[.2em] text-[#C8922A]">AFRICA</div>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ShareBar title={ARTICLE.title} slug={ARTICLE.slug} />
          <Link to="/#contact" className="btn-shimmer font-bold text-[12px] text-[#0B1221] border-none rounded-[10px] px-4 py-2 cursor-pointer flex items-center gap-1.5 no-underline ml-2">
            Start a Project <Arr sz={12} />
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="relative overflow-hidden pt-28 pb-16 px-12" style={{ background: ARTICLE.coverBg }}>
        {/* Subtle grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 1200 400" preserveAspectRatio="none">
          {[100,200,300,400,500,600,700,800,900,1000,1100].map(x=><line key={x} x1={x} y1="0" x2={x} y2="400" stroke="#C8922A" strokeWidth="1"/>)}
          {[50,100,150,200,250,300,350].map(y=><line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="#C8922A" strokeWidth="1"/>)}
        </svg>
        {/* Big cover emoji */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 text-[160px] opacity-[0.08] select-none pointer-events-none leading-none">
          {ARTICLE.coverEmoji}
        </div>

        <div className="relative z-10 max-w-[780px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/35 text-[11px] font-semibold mb-6">
            <Link to="/" className="hover:text-white/70 transition-colors no-underline text-white/35">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-white/70 transition-colors no-underline text-white/35">Blog</Link>
            <span>/</span>
            <span className="text-white/55 truncate max-w-[240px]">{ARTICLE.title}</span>
          </div>

          {/* Category tag */}
          <div className={`inline-flex items-center text-[9px] font-extrabold tracking-[.1em] uppercase px-3 py-1.5 rounded-full border border-current/25 mb-5 ${ARTICLE.categoryColor}`}>
            {ARTICLE.category}
          </div>

          {/* Title */}
          <h1 className="serif italic text-white leading-[1.05] mb-5 afu" style={{ fontSize: "clamp(28px,4.5vw,50px)" }}>
            {ARTICLE.title}
          </h1>

          {/* Subtitle */}
          <p className="text-white/55 text-[16px] leading-[1.75] mb-8 max-w-[600px] afu" style={{ animationDelay: ".1s" }}>
            {ARTICLE.subtitle}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-5 flex-wrap afu" style={{ animationDelay: ".18s" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C8922A] flex items-center justify-center text-[11px] font-extrabold text-[#0B1221]">
                {ARTICLE.author.avatar}
              </div>
              <div>
                <div className="text-white text-[12px] font-bold leading-none">{ARTICLE.author.name}</div>
                <div className="text-white/40 text-[10px] mt-0.5">{ARTICLE.author.role}</div>
              </div>
            </div>
            <div className="w-px h-7 bg-white/15" />
            <div className="text-white/45 text-[12px] font-semibold">{ARTICLE.date}</div>
            <div className="w-1 h-1 rounded-full bg-[#C8922A] inline-block" />
            <div className="text-white/45 text-[12px] font-semibold">{ARTICLE.readTime}</div>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <main className="px-12 py-16" style={{ background: "#F8F6F1" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid gap-16" style={{ gridTemplateColumns: "1fr 220px" }}>

            {/* Article content */}
            <article>
              {ARTICLE.content.map((block, i) => <Block key={i} block={block} />)}

              {/* Author card */}
              <div className="mt-14 p-6 bg-white border border-[#E4E1D9] rounded-2xl flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#C8922A] flex items-center justify-center text-[18px] font-extrabold text-[#0B1221] flex-shrink-0">
                  {ARTICLE.author.avatar}
                </div>
                <div>
                  <div className="text-[12px] font-extrabold uppercase tracking-[.1em] text-[#C8922A] mb-1">Written by</div>
                  <div className="serif text-[#0B1221] text-[18px] mb-1">{ARTICLE.author.name}</div>
                  <div className="text-[13px] text-[#6B7592]">{ARTICLE.author.role} · FlexiLogic Africa</div>
                </div>
              </div>

              {/* Share row */}
              <div className="mt-8 pt-8 border-t border-[#E4E1D9] flex items-center justify-between flex-wrap gap-4">
                <ShareBar title={ARTICLE.title} slug={ARTICLE.slug} />
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-[13px] font-bold text-[#6B7592] hover:text-[#0B1221] cursor-pointer bg-transparent border-none transition-colors"
                >
                  <ArrLeft sz={13} /> Back to Blog
                </button>
              </div>
            </article>

            {/* Sticky sidebar */}
            <aside>
              <TableOfContents content={ARTICLE.content} />
            </aside>

          </div>
        </div>
      </main>

      {/* ── RELATED POSTS ── */}
      {ARTICLE.related?.length > 0 && (
        <section className="px-12 py-16 bg-[#EEE9DF] border-t border-[#E4E1D9]">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex text-[10px] font-extrabold tracking-[.1em] uppercase text-[#C8922A] bg-[#FDF3E0] border border-[#C8922A]/25 px-3 py-1 rounded-full mb-3">More from the Studio</div>
                <h3 className="serif italic text-[#0B1221] text-[28px]">Keep Reading</h3>
              </div>
              <button
                onClick={() => goTo("all")}
                className="font-bold text-[13px] bg-transparent text-[#0B1221] border border-[#E4E1D9] rounded-xl px-5 py-2.5 flex items-center gap-2 cursor-pointer hover:border-[#C8922A]/30 transition-all"
              >
                All Articles <Arr />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {ARTICLE.related.map(post => (
                <div
                  key={post.slug}
                  className="related-card bg-white border border-[#E4E1D9] rounded-3xl overflow-hidden flex flex-col"
                  onClick={() => goTo(post.slug)}
                >
                  <div className="relative overflow-hidden aspect-video flex items-center justify-center" style={{ background: post.coverBg }}>
                    <div className="text-[56px] opacity-25 select-none">{post.cover}</div>
                    <div className="absolute top-4 left-5">
                      <span className={`text-[9px] font-extrabold tracking-[.1em] uppercase px-2.5 py-1 rounded-full border border-current/25 ${post.categoryColor}`}>{post.category}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2.5 text-[11px] text-[#6B7592] font-semibold mb-3">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-[#C8922A] inline-block" />
                      <span>{post.readTime}</span>
                    </div>
                    <h4 className="serif italic text-[#0B1221] text-[18px] leading-tight mb-4 flex-1">{post.title}</h4>
                    <div className="flex items-center gap-1.5 text-[#C8922A] font-bold text-[12px] pt-4 border-t border-[#E4E1D9]">
                      Read Article <Arr sz={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FOOTER STRIP ── */}
      <div className="px-12 py-12 border-t border-[#E4E1D9]" style={{ background: "linear-gradient(135deg,#0B1221 0%,#131D35 100%)" }}>
        <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-8">
          <div>
            <div className="text-[10px] font-extrabold tracking-[.12em] text-[#C8922A] uppercase mb-1.5">Work with us</div>
            <h3 className="serif italic text-white text-[26px] leading-tight mb-1">Got a project in mind?</h3>
            <p className="text-white/40 text-[13px]">We're currently taking on new clients for Q2 2025.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link to="/blog" className="font-bold text-[13px] bg-transparent text-white border border-white/20 rounded-xl px-5 py-2.5 cursor-pointer flex items-center gap-2 no-underline hover:border-white/40 transition-colors">
              More Articles
            </Link>
            <Link to="/#contact" className="btn-shimmer font-bold text-[13px] text-[#0B1221] border-none rounded-xl px-6 py-2.5 cursor-pointer flex items-center gap-2 no-underline">
              Start a Project <Arr sz={13} />
            </Link>
          </div>
        </div>
      </div>

    </>
  );
}