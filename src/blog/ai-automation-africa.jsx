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
  slug: "ai-automation-africa-opportunity-2025",
  category: "AI & Automation",
  categoryColor: "bg-[#A78BFA]/15 text-[#A78BFA]",
  title: "AI Automation in Africa: The Opportunity, The Reality, and What to Build First",
  subtitle: "Artificial intelligence is not a future technology for African businesses — it is a present one. The organisations moving now are compressing years of operational efficiency gains into months. Here is what that looks like in practice.",
  date: "13 March 2025",
  readTime: "12 min read",
  author: {
    name: "FlexiLogic Team",
    role: "Engineering & Product",
    avatar: "FL",
  },
  coverEmoji: "🤖",
  coverBg: "linear-gradient(135deg,#0d0a1a 0%,#1a1035 100%)",

  content: [
    {
      type: "paragraph",
      text: "A clinic in Bulawayo is using an AI assistant to triage patient intake forms, flag high-risk cases for immediate attention, and draft referral letters — tasks that previously consumed two hours of a senior nurse's day. A fintech startup in Harare has automated the document verification step of its loan application process, cutting approval time from three days to forty minutes. An e-commerce retailer is using predictive analytics to know which products will run out of stock before they actually do, eliminating the lost sales that used to cost them 15% of monthly revenue.",
    },
    {
      type: "paragraph",
      text: "None of these organisations have dedicated AI research teams. None of them spent millions building proprietary models. They identified specific, high-friction operational problems and applied AI tools that already exist — integrated thoughtfully, configured carefully, and built to fit the way their businesses actually work. This is what AI automation looks like in practice for African businesses in 2025, and it is far more accessible than most decision-makers realise.",
    },
    { type: "divider" },
    {
      type: "heading",
      level: 2,
      text: "Why Africa Is Not Behind on AI — It Is Differently Positioned",
    },
    {
      type: "paragraph",
      text: "The dominant narrative about AI in Africa frames the continent as a late adopter playing catch-up with Silicon Valley and Shenzhen. We think this framing is wrong and strategically unhelpful. African businesses are not inheriting legacy systems built before AI existed. They are not trying to retrofit intelligence into decades-old enterprise software. They are building digital operations now, in an era where capable AI models are available via API for cents per thousand tokens, and where the gap between a manual process and an automated one is a focused engineering engagement rather than a multi-year transformation programme.",
    },
    {
      type: "callout",
      emoji: "🌍",
      title: "The leapfrog opportunity",
      text: "Just as Africa leapfrogged fixed-line telecoms by going straight to mobile, and leapfrogged traditional banking by going straight to mobile money, African businesses have the opportunity to leapfrog the painful, expensive first generation of enterprise automation and go straight to AI-native operations. The organisations that recognise this window are the ones that will define their sectors for the next decade.",
    },
    {
      type: "paragraph",
      text: "There are also structural characteristics of African business operations that make certain AI applications particularly high-value. Labour-intensive manual processes — data entry, document verification, customer triage, report compilation — remain common across sectors because automation has historically been expensive and technically complex. AI changes that calculus dramatically. The processes that cost the most in staff time and operational errors are often exactly the processes that AI handles best.",
    },
    {
      type: "heading",
      level: 2,
      text: "The Six AI Automation Services We Deliver",
    },
    {
      type: "heading",
      level: 3,
      text: "AI Chatbots and Virtual Assistants",
    },
    {
      type: "paragraph",
      text: "Modern AI chatbots are not the rule-based decision trees that frustrated users a decade ago. Built on large language models like OpenAI's GPT-4o, Anthropic's Claude, or Google's Gemini, they understand natural language, handle ambiguous questions, maintain conversational context across a session, and escalate to a human agent when the situation requires it. For African businesses, the most impactful deployments we have built fall into three categories: customer service automation, internal staff assistants, and intake and triage workflows.",
    },
    {
      type: "paragraph",
      text: "A customer service chatbot trained on your product documentation, pricing, and policies can handle 60–80% of inbound support queries without human intervention — in English, Shona, Ndebele, or any other language your customers use. An internal staff assistant connected to your company knowledge base answers HR policy questions, surfaces the right procedure document, and helps new employees onboard without requiring a colleague to stop what they are doing. A triage assistant on a healthcare or financial services intake form collects structured information, asks intelligent follow-up questions, and presents a summarised case to the human professional who handles it next.",
    },
    {
      type: "heading",
      level: 3,
      text: "Workflow and Process Automation",
    },
    {
      type: "paragraph",
      text: "The highest-value automation targets in most African businesses are not the glamorous ones — they are the unglamorous, repetitive, error-prone manual processes that happen dozens of times a day. Data copied from one system to another. Approval emails sent manually. Reports compiled by hand from multiple spreadsheets every Monday morning. Invoices generated one by one. These processes are not just inefficient — they are fragile. They break when the person who knows the process goes on leave. They produce errors that take hours to find and fix. And they scale linearly with headcount, meaning growth requires hiring rather than efficiency.",
    },
    {
      type: "paragraph",
      text: "We map clients' operational workflows, identify the highest-friction manual steps, and build automated pipelines that handle them reliably without human intervention. Integrations span accounting software, CRM systems, communication platforms, cloud storage, payment gateways, and custom internal tools — connected through APIs and orchestrated with AI decision logic where the process requires judgment rather than just rules.",
    },
    {
      type: "code",
      lang: "javascript",
      text: `// Example: AI-powered loan application workflow automation
// Step 1 — Document arrives (WhatsApp, email, or portal upload)
// Step 2 — OCR extracts text from ID and payslip
// Step 3 — AI validates extracted data against application form
// Step 4 — Risk model scores the application
// Step 5 — Auto-approve, flag for review, or reject with reason

async function processLoanApplication(applicationId) {
  const application = await db.applications.findById(applicationId);

  // Extract structured data from uploaded documents
  const idData = await ocr.extract(application.idDocumentUrl);
  const payslipData = await ocr.extract(application.payslipUrl);

  // AI validation — cross-reference documents against application
  const validation = await ai.validate({
    model: "claude-sonnet-4-6",
    documents: { idData, payslipData },
    application: application.formData,
    prompt: "Cross-reference these documents against the application form. Flag any discrepancies, missing fields, or inconsistencies. Return structured JSON.",
  });

  // Risk scoring
  const riskScore = await riskModel.score({
    income: payslipData.netSalary,
    requestedAmount: application.loanAmount,
    employmentDuration: payslipData.employmentMonths,
    existingObligations: application.declaredObligations,
  });

  // Route based on validation + risk
  if (validation.discrepancies.length === 0 && riskScore < 0.3) {
    await application.approve();
    await notify.sms(application.phone, "Your loan application has been approved.");
  } else if (riskScore > 0.7 || validation.criticalFlags.length > 0) {
    await application.reject({ reason: validation.summary });
  } else {
    await application.flagForReview({ validation, riskScore });
    await notify.email(reviewTeam, "Application requires manual review", { applicationId });
  }
}`,
    },
    {
      type: "heading",
      level: 3,
      text: "AI-Powered Data Analytics and Reporting",
    },
    {
      type: "paragraph",
      text: "Most African businesses are sitting on more data than they know what to do with — transaction records, customer interactions, operational logs, survey responses — stored in spreadsheets, databases, and disconnected systems that nobody has the time or technical skill to analyse properly. The monthly management report is compiled manually by someone senior, takes a full day, and is out of date by the time it is presented. The insight that could inform a critical business decision is buried in a CSV file that nobody has opened in six months.",
    },
    {
      type: "paragraph",
      text: "We build AI-powered analytics dashboards that surface the insights that matter automatically — revenue trends, customer behaviour patterns, operational bottlenecks, and anomalies that warrant attention — in real time, without a data analyst having to pull the report. For organisations without the volume to justify a full business intelligence stack, we also build natural language query interfaces: ask a question in plain English, get an answer drawn from your actual data.",
    },
    {
      type: "heading",
      level: 3,
      text: "Document Processing and OCR",
    },
    {
      type: "paragraph",
      text: "Document-heavy processes are one of the defining operational characteristics of African institutional and commercial life. ID verification, payslip processing, invoice matching, form digitisation, contract review — these workflows consume enormous amounts of skilled staff time in financial services, healthcare, government, and HR functions. AI-powered document processing combines optical character recognition (OCR) to extract text from scanned or photographed documents with language model intelligence to interpret, validate, and structure that text into usable data.",
    },
    {
      type: "paragraph",
      text: "The practical applications are wide: a bank that previously had two staff members manually keying data from physical application forms now processes the same volume in minutes with higher accuracy. A school that scans end-of-year mark sheets can have grades digitised and loaded into the student management system automatically. An NGO processing beneficiary registration forms in the field can have structured data in their central database within seconds of a field officer photographing the form on their phone.",
    },
    {
      type: "heading",
      level: 3,
      text: "Predictive Analytics and Forecasting",
    },
    {
      type: "paragraph",
      text: "Predictive analytics uses historical data patterns to forecast future outcomes — and it is one of the highest-ROI AI applications for businesses with sufficient data history. Inventory forecasting for retailers eliminates stockouts and overstock situations that directly impact revenue and cash flow. Churn prediction for subscription businesses identifies customers likely to cancel before they do, enabling retention interventions at the right moment. Demand forecasting for service businesses enables better staff scheduling, reducing both overtime costs and under-staffing incidents.",
    },
    {
      type: "callout",
      emoji: "📊",
      title: "How much data do you need?",
      text: "A common barrier to starting with predictive analytics is the belief that you need years of perfectly clean data. In practice, most useful forecasting models can be trained on 6–12 months of operational data, even with gaps and inconsistencies. We handle data cleaning and feature engineering as part of the build — you do not need a perfect dataset to get started.",
    },
    {
      type: "heading",
      level: 3,
      text: "Custom AI Model Integration",
    },
    {
      type: "paragraph",
      text: "The foundation models available today — OpenAI's GPT-4o, Anthropic's Claude, Google's Gemini, and Meta's Llama — are extraordinarily capable general-purpose AI systems. But general-purpose models produce general-purpose results. The highest-value AI applications are built by integrating these models with your specific business context: your data, your terminology, your processes, your constraints, and your quality standards.",
    },
    {
      type: "paragraph",
      text: "We select the right model for each application based on capability, cost, latency, and data privacy requirements. We design the prompt architecture, retrieval systems (RAG — retrieval augmented generation), and output validation logic that makes the model perform reliably on your specific use case. And we build the evaluation frameworks that let you measure whether the AI is actually doing its job well over time, rather than hoping it is.",
    },
    {
      type: "heading",
      level: 2,
      text: "Sector by Sector: Where AI Delivers the Fastest Return",
    },
    {
      type: "heading",
      level: 3,
      text: "Fintech and Banking",
    },
    {
      type: "paragraph",
      text: "Financial services is the sector where AI automation delivers the fastest and most measurable return in the African market. Credit scoring for thin-file borrowers using alternative data, automated KYC document verification, fraud detection on transaction streams, and AI-assisted loan underwriting are all live use cases with proven ROI. The combination of large transaction volumes, document-heavy compliance requirements, and high cost of manual processing makes fintech the natural starting point for AI investment.",
    },
    {
      type: "heading",
      level: 3,
      text: "Healthcare and Clinics",
    },
    {
      type: "paragraph",
      text: "Healthcare AI in the African context is less about diagnostic AI — which requires specialised medical validation and regulatory clearance — and more about operational AI that frees clinical staff to spend more time on patient care. Appointment scheduling assistants, patient intake automation, medical record digitisation, prescription processing, and clinical notes summarisation are all high-value applications that reduce administrative burden without making clinical decisions. In under-resourced health systems, giving a nurse back two hours a day is a genuinely significant intervention.",
    },
    {
      type: "heading",
      level: 3,
      text: "Schools and EdTech",
    },
    {
      type: "paragraph",
      text: "Education is one of the most data-rich and analytics-poor sectors in Zimbabwe. Schools collect attendance data, assessment results, behavioural records, and fee payment histories — and do almost nothing analytical with them. AI can identify at-risk students before they fail, surface patterns in assessment performance that inform teaching decisions, automate report card generation, and assist teachers with differentiated homework and assessment design. For EdTech platforms, AI-powered personalised learning paths that adapt to each student's pace and knowledge gaps are now buildable without a research team.",
    },
    {
      type: "heading",
      level: 3,
      text: "E-Commerce and Retail",
    },
    {
      type: "paragraph",
      text: "Zimbabwean e-commerce businesses compete in a market where customer expectations are shaped by global platforms but logistics, payment infrastructure, and supply chains are local. AI helps bridge that gap: personalised product recommendations that increase average order value, demand forecasting that reduces stockouts, automated customer service that handles order status queries at scale, and dynamic pricing models that respond to competitor pricing and inventory levels without manual intervention.",
    },
    {
      type: "heading",
      level: 3,
      text: "Government and NGOs",
    },
    {
      type: "paragraph",
      text: "Government and NGO operations are characterised by high volumes of structured data collection, complex reporting requirements, and significant manual processing burden. AI automation can digitise field data collection forms, validate submissions in real time, automate compliance reporting, and surface programme performance insights from data that currently sits in filing cabinets or disconnected spreadsheets. For donor-funded NGOs, automated impact reporting that draws from operational data rather than requiring dedicated M&E staff time represents a significant efficiency gain.",
    },
    {
      type: "heading",
      level: 3,
      text: "HR and Recruitment",
    },
    {
      type: "paragraph",
      text: "Recruitment is one of the highest-friction, most time-consuming processes in any growing organisation. AI-assisted CV screening, automated candidate communications, interview scheduling, and skills assessment summarisation can compress a two-week recruitment process into three days without reducing quality of hire. For HR operations more broadly, AI assistants that handle policy queries, onboarding guidance, and leave management reduce the administrative load on HR teams that are typically undersized relative to the organisations they support.",
    },
    {
      type: "heading",
      level: 2,
      text: "What We Have Learned Building AI Systems for African Businesses",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Start with the most painful manual process, not the most exciting AI application. The highest ROI almost always comes from automating something boring and repetitive — not from building a showcase AI feature. Ask what costs the most in staff hours and errors, then automate that first.",
        "Language and local context matter enormously. AI models trained primarily on English internet text have gaps in Zimbabwean slang, local proper nouns, financial terminology, and cultural context. Prompt engineering and fine-tuning with local data are not optional extras — they are the difference between a system that works and one that embarrasses you.",
        "Build human oversight into every AI workflow from the start. AI systems make mistakes — and in high-stakes domains like healthcare, finance, and legal, those mistakes need to be catchable before they cause harm. Every AI workflow we build has clear escalation paths, confidence thresholds, and human review checkpoints for edge cases.",
        "Data quality is the constraint, not model capability. The models available today are capable enough for almost any business application. The limit is almost always the quality, consistency, and accessibility of the client's own data. Data cleaning and pipeline work is typically 40–60% of the total engagement effort.",
        "Measure the right things. AI automation projects fail when success is defined as 'the AI is running' rather than 'the business outcome has improved.' We define measurable success metrics before building anything — processing time reduced by X%, error rate reduced by Y%, staff hours saved per week — and track them throughout.",
      ],
    },
    {
      type: "quote",
      text: "The African businesses winning with AI are not the ones with the most sophisticated models. They are the ones that identified one specific, high-cost manual process, automated it properly, measured the result, and then did it again.",
      author: "FlexiLogic AI Practice Lead",
    },
    {
      type: "heading",
      level: 2,
      text: "How a FlexiLogic AI Automation Engagement Works",
    },
    {
      type: "paragraph",
      text: "We run AI automation engagements in three phases. The first phase is a two-week discovery and scoping process where we map your current operational workflows, identify automation candidates, assess your data assets, and produce a prioritised opportunity register with estimated effort and ROI for each item. This phase produces a clear picture of where AI will have the highest impact in your specific organisation — not a generic AI strategy, but a specific, costed build plan.",
    },
    {
      type: "paragraph",
      text: "The second phase is the build. We work in two-week sprints, shipping working automation into your environment continuously rather than delivering a big-bang system after months of development. Each sprint ends with a demo and a feedback session — you see what has been built, you use it, and your feedback shapes the next sprint. This keeps the build aligned with how your business actually works rather than how we assumed it works at the start.",
    },
    {
      type: "paragraph",
      text: "The third phase is handover and optimisation. We document everything, train your team on how to manage and extend the systems we have built, and establish the monitoring and evaluation framework that tells you whether the AI is performing as expected over time. For clients who want ongoing AI engineering support, we offer retainer arrangements that cover model updates, new integrations, and continuous improvement as your data grows and your requirements evolve.",
    },
    {
      type: "callout",
      emoji: "🤖",
      title: "Start with a free AI opportunity assessment",
      text: "Not sure where AI automation would have the most impact in your organisation? Book a free 45-minute AI opportunity assessment with the FlexiLogic team. We will review your current operations, identify the highest-value automation candidates, and give you an honest picture of what is buildable, at what cost, and with what expected return.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "The window for first-mover advantage in AI automation across African sectors is open right now — and it will not stay open indefinitely. The organisations investing in AI-native operations today are building efficiency advantages, data assets, and institutional knowledge that will be extremely difficult for late movers to replicate. The technology is ready. The models are capable. The only question is whether your organisation will move in 2025 or spend 2026 catching up.",
    },
  ],

  related: [
    {
      slug: "why-african-startups-need-devops-cloud-infrastructure",
      category: "DevOps",
      categoryColor: "bg-[#7C9FFF]/15 text-[#7C9FFF]",
      title: "Why African Startups Can No Longer Afford to Ignore DevOps",
      date: "13 Mar 2025",
      readTime: "9 min read",
      cover: "☁️",
      coverBg: "linear-gradient(135deg,#0a1628 0%,#0d2137 100%)",
    },
    {
      slug: "cybersecurity-zimbabwe-why-businesses-are-vulnerable",
      category: "Cybersecurity",
      categoryColor: "bg-[#FF6B6B]/15 text-[#FF6B6B]",
      title: "Cybersecurity in Zimbabwe: Why Local Businesses Are More Exposed Than They Think",
      date: "13 Mar 2025",
      readTime: "11 min read",
      cover: "🔐",
      coverBg: "linear-gradient(135deg,#1a0a0a 0%,#2d1515 100%)",
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