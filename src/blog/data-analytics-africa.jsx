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
  slug: "data-analytics-africa-turning-data-into-decisions",
  category: "Data & Analytics",
  categoryColor: "bg-[#34D399]/15 text-[#34D399]",
  title: "Data Analytics in Africa: Why Most Businesses Are Sitting on a Gold Mine They Cannot Read",
  subtitle: "Every transaction, every customer interaction, every operational event your business generates is a data point. African organisations are collecting more data than ever before — and making fewer decisions from it than they should. That gap is the opportunity.",
  date: "13 March 2025",
  readTime: "12 min read",
  author: {
    name: "FlexiLogic Team",
    role: "Engineering & Product",
    avatar: "FL",
  },
  coverEmoji: "📊",
  coverBg: "linear-gradient(135deg,#0a1a12 0%,#0d2b1a 100%)",

  content: [
    {
      type: "paragraph",
      text: "A logistics company in Harare was losing money on a specific delivery route for eight months before anyone noticed. The data that would have revealed the problem — fuel costs, delivery times, vehicle maintenance records, customer payment delays — existed in three separate spreadsheets maintained by three different people. Nobody had the time to join them together. A retailer with four branches was consistently over-ordering stock for two locations and under-ordering for the other two, leaving money tied up in slow-moving inventory while losing sales on fast-moving lines. The pattern was obvious in hindsight. It was invisible in the moment because the sales data lived in a point-of-sale system that nobody had ever connected to anything else.",
    },
    {
      type: "paragraph",
      text: "These are not unusual stories. They are the default state of data management across the majority of Zimbabwean and African businesses — not because the data does not exist, but because the infrastructure to connect it, the tools to analyse it, and the discipline to act on it have not been built. This article makes the case for why that needs to change, what modern data analytics infrastructure actually looks like for a business of any size, and what FlexiLogic builds to close the gap.",
    },
    { type: "divider" },
    {
      type: "heading",
      level: 2,
      text: "The Data Problem African Businesses Actually Have",
    },
    {
      type: "paragraph",
      text: "The conversation about data in Africa is often framed around data scarcity — not enough data, not enough connectivity, not enough digital infrastructure to generate meaningful datasets. That framing was accurate a decade ago. It is increasingly inaccurate today. Mobile money platforms process millions of transactions daily. School management systems record attendance and marks for hundreds of thousands of students. Hospital systems log patient visits, prescriptions, and outcomes. E-commerce platforms capture every browse, click, add-to-cart, and abandoned checkout. The data is there. The problem is not collection — it is connectivity, accessibility, and analysis.",
    },
    {
      type: "callout",
      emoji: "💡",
      title: "The real data problem in 2025",
      text: "Most African businesses do not have a data shortage. They have a data fragmentation problem. Operational data lives in disconnected systems — accounting software, point-of-sale terminals, spreadsheets, CRM tools, mobile money dashboards — that have never been connected to each other. The insight that would change a business decision exists somewhere in that fragmented landscape. It just cannot be seen.",
    },
    {
      type: "paragraph",
      text: "The second layer of the problem is the reporting bottleneck. In most organisations, producing a management report requires a senior person to manually extract data from multiple systems, clean it, reconcile discrepancies, build a spreadsheet, format charts, and write a narrative. This process takes anywhere from half a day to two full days, depending on the organisation. The report is out of date by the time it is presented. The person who produced it could have been doing something more valuable. And because the process is so painful, it happens monthly or quarterly rather than continuously — meaning decisions are made on stale data for weeks at a time.",
    },
    {
      type: "heading",
      level: 2,
      text: "What Modern Data Analytics Infrastructure Looks Like",
    },
    {
      type: "paragraph",
      text: "A modern data analytics stack for an African business does not require a team of data scientists, a million-dollar enterprise software licence, or years of implementation. It requires four components working together: a data warehouse that centralises data from all your operational systems, a pipeline that keeps that warehouse current, a business intelligence layer that lets people explore and visualise the data without writing code, and a reporting layer that delivers the right insights to the right people automatically.",
    },
    {
      type: "heading",
      level: 3,
      text: "Data Warehouse and Pipeline Engineering",
    },
    {
      type: "paragraph",
      text: "A data warehouse is a centralised repository where data from all your operational systems — your accounting software, your CRM, your point-of-sale system, your mobile money integration, your custom applications — is collected, cleaned, and stored in a unified structure optimised for analysis. Unlike an operational database that is optimised for fast writes and individual record lookups, a data warehouse is built for fast reads across large datasets — the kind of queries that answer questions like 'what was our revenue by product category across all branches last quarter, compared to the same quarter last year'.",
    },
    {
      type: "paragraph",
      text: "The pipeline is the engineering that keeps the warehouse current. Data pipelines extract data from source systems on a defined schedule or in real time, transform it into the consistent structure the warehouse expects, and load it into the warehouse — a process known as ETL (Extract, Transform, Load). A well-built pipeline is invisible: it runs reliably in the background, handles errors gracefully, and alerts your team when something unexpected happens rather than silently producing wrong numbers.",
    },
    {
      type: "code",
      lang: "python",
      text: `# Example: Simplified ETL pipeline for a multi-branch retailer
# Extracts daily sales from each branch POS system,
# transforms to a unified schema, loads to data warehouse

import pandas as pd
from datetime import date, timedelta
from warehouse import db
from sources import pos_system, accounting_api

def run_daily_sales_pipeline(target_date=None):
    target_date = target_date or date.today() - timedelta(days=1)

    branch_records = []

    # Extract — pull from each branch POS system
    for branch in pos_system.get_branches():
        raw = pos_system.get_sales(
            branch_id=branch.id,
            date=target_date
        )

        # Transform — normalise to unified schema
        for sale in raw:
            branch_records.append({
                "date":           target_date,
                "branch_id":      branch.id,
                "branch_name":    branch.name,
                "product_sku":    sale.sku,
                "product_name":   sale.name,
                "category":       sale.category,
                "quantity_sold":  sale.qty,
                "unit_price_usd": sale.price,
                "revenue_usd":    sale.qty * sale.price,
                "payment_method": sale.payment_method,  # cash | ecocash | card
            })

    df = pd.DataFrame(branch_records)

    # Load — upsert into warehouse fact table
    db.upsert(
        table="fact_daily_sales",
        data=df,
        conflict_keys=["date", "branch_id", "product_sku"]
    )

    print(f"Loaded {len(df)} records for {target_date}")

# Scheduled daily at 02:00 via cron / Airflow / AWS EventBridge`,
    },
    {
      type: "heading",
      level: 3,
      text: "Business Intelligence Setup",
    },
    {
      type: "paragraph",
      text: "Business intelligence (BI) tools sit on top of the data warehouse and give non-technical users the ability to explore data, build visualisations, and answer their own questions without writing SQL or waiting for a developer. We implement and configure BI platforms — including Metabase, Apache Superset, and Looker Studio — tailored to each client's data model and user base. The goal is a system where a branch manager, a finance director, or a school principal can log in, navigate to their area of interest, and get answers to the questions they actually have — without opening a spreadsheet.",
    },
    {
      type: "heading",
      level: 3,
      text: "Custom Dashboards and Reporting",
    },
    {
      type: "paragraph",
      text: "Off-the-shelf BI tools cover the majority of analytical needs, but there are always dashboards that require custom development — either because the visualisation is highly specific to a business process, because it needs to be embedded in an existing application, or because it needs to serve a non-technical audience who should not need to learn a BI tool at all. We build custom dashboards using React with charting libraries including Recharts, Chart.js, and D3 — embedded directly in client applications or served as standalone reporting portals.",
    },
    {
      type: "paragraph",
      text: "Automated reporting is a separate but related capability. Rather than a dashboard that someone has to remember to check, automated reports push the right numbers to the right people on a defined schedule — a Monday morning revenue summary to the CEO via email, a daily cash position report to the finance team via WhatsApp, a weekly attendance and fee collection summary to each school's headmaster. The information arrives in the workflow rather than requiring a deliberate visit to a separate tool.",
    },
    {
      type: "heading",
      level: 3,
      text: "Real-Time Analytics",
    },
    {
      type: "paragraph",
      text: "For businesses where conditions change fast — a fintech platform processing live transactions, an e-commerce site running a promotional campaign, a logistics operation managing active deliveries — batch-processed daily reports are not enough. Real-time analytics pipelines process event streams as they are generated, updating dashboards and triggering alerts within seconds of meaningful events occurring. A fraud detection rule that fires when a transaction pattern deviates from a customer's baseline. An alert that fires when a delivery is running more than 30 minutes behind schedule. A dashboard that shows live conversion rates during a flash sale so the marketing team can respond in the moment.",
    },
    {
      type: "heading",
      level: 3,
      text: "Customer and Sales Analytics",
    },
    {
      type: "paragraph",
      text: "Understanding customer behaviour is the foundation of every growth strategy, yet most African businesses have only the most rudimentary picture of who their customers are, how they behave, and what drives their purchasing decisions. Customer analytics brings together transaction history, engagement data, demographic information, and behavioural signals to answer the questions that actually drive revenue: Which customers are most valuable? Which are at risk of churning? Which product combinations are most commonly purchased together? Which acquisition channels produce the customers with the highest lifetime value? Which customer segments are underserved by the current product offering?",
    },
    {
      type: "heading",
      level: 3,
      text: "Operational and Financial Reporting",
    },
    {
      type: "paragraph",
      text: "Operational reporting connects business process data — delivery times, staff productivity, inventory turnover, service quality metrics — to financial outcomes, giving leadership teams a complete picture of where value is being created and destroyed across the organisation. Financial reporting automation eliminates the manual compilation process that consumes senior finance staff time every month-end, replacing it with automated reconciliation, variance analysis, and board-ready report generation that takes minutes rather than days.",
    },
    {
      type: "heading",
      level: 2,
      text: "Sector by Sector: What Data Analytics Changes",
    },
    {
      type: "heading",
      level: 3,
      text: "Fintech and Banking",
    },
    {
      type: "paragraph",
      text: "Financial services generates more data per customer interaction than almost any other sector — and has the most direct line between analytical insight and revenue impact. Transaction analytics surfaces fraud patterns before they scale. Portfolio analytics identifies the customer segments and loan products with the best risk-adjusted returns. Operational analytics reveals the processing bottlenecks that are slowing application approval times and driving applicant drop-off. For fintech businesses, a mature analytics practice is not a nice-to-have — it is a competitive requirement.",
    },
    {
      type: "heading",
      level: 3,
      text: "Healthcare and Clinics",
    },
    {
      type: "paragraph",
      text: "Healthcare analytics in the Zimbabwean context divides into two high-value categories: operational analytics that improves clinic efficiency, and population health analytics that informs resource allocation and intervention prioritisation. On the operational side, appointment scheduling analytics reduces no-show rates and optimises clinician utilisation. Inventory analytics ensures essential medicines and consumables are stocked appropriately without tying up excessive working capital. On the population health side, patient outcome tracking across conditions, demographics, and treatment protocols surfaces the patterns that inform better clinical and administrative decision-making.",
    },
    {
      type: "heading",
      level: 3,
      text: "Schools and EdTech",
    },
    {
      type: "paragraph",
      text: "Schools are among the most data-rich and analytically underserved institutions in Zimbabwe. Attendance records, assessment results, teacher performance data, fee collection rates, and behavioural records accumulate term after term — and are almost never analysed in a way that produces actionable insight. Student performance analytics identifies at-risk learners weeks before they fail, enabling early intervention. Teacher effectiveness analytics supports professional development and curriculum planning decisions. Fee collection analytics gives school finance teams a real-time picture of collection rates by form, class, and payment method — eliminating the end-of-term surprise that cash flow is lower than expected.",
    },
    {
      type: "heading",
      level: 3,
      text: "E-Commerce and Retail",
    },
    {
      type: "paragraph",
      text: "Retail analytics is one of the most mature and proven applications of data science globally, and the tools and techniques that transformed retail operations in developed markets are now accessible to Zimbabwean retailers at a fraction of the historical cost. Basket analysis reveals which products are bought together most frequently — informing placement, bundling, and promotional strategy. Price elasticity modelling informs promotional discount decisions. Inventory analytics by branch, category, and season eliminates the over-stock and under-stock cycles that erode both margin and customer satisfaction. Customer lifetime value modelling identifies the acquisition channels and customer profiles worth investing in.",
    },
    {
      type: "heading",
      level: 3,
      text: "Government and NGOs",
    },
    {
      type: "paragraph",
      text: "Government agencies and NGOs face a specific analytics challenge: demonstrating programme impact to funders and oversight bodies using data that is often collected in fragmented, inconsistent formats across distributed field operations. We build data collection standardisation frameworks, aggregation pipelines, and impact reporting dashboards that give programme managers real-time visibility into operations and give donors the evidence-based reporting they require. For government agencies digitising service delivery, analytics infrastructure enables the performance management and accountability reporting that citizens and oversight bodies increasingly expect.",
    },
    {
      type: "heading",
      level: 3,
      text: "Logistics and Supply Chain",
    },
    {
      type: "paragraph",
      text: "Logistics operations generate dense, time-sensitive data — vehicle locations, delivery times, route costs, fuel consumption, driver performance, customer satisfaction scores — that is almost always under-analysed. Route optimisation analytics reduces fuel costs and delivery times simultaneously. Driver performance analytics identifies training needs and safety risks before they become incidents. Customer delivery analytics reveals the patterns behind late deliveries and returns, informing operational changes that improve service quality. For logistics companies operating in Zimbabwe's challenging road infrastructure environment, data-driven route and fleet management is a direct path to margin improvement.",
    },
    {
      type: "heading",
      level: 3,
      text: "General SMEs",
    },
    {
      type: "paragraph",
      text: "Small and medium enterprises often believe sophisticated data analytics is out of their reach — too expensive, too complex, too dependent on data volumes they do not yet have. The reality in 2025 is that a well-designed analytics setup for an SME is neither expensive nor complex, and the minimum viable dataset for meaningful insight is smaller than most business owners assume. A single connected view of revenue, costs, customer behaviour, and operational performance — updated automatically and accessible on a phone — is transformative for a business that has been running on gut feel and end-of-month spreadsheets.",
    },
    {
      type: "heading",
      level: 2,
      text: "Common Mistakes We See in African Data Projects",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Building dashboards before cleaning data. A beautiful dashboard fed by dirty, inconsistent data is worse than no dashboard — it produces confident wrong answers. Data quality assessment and remediation must come before visualisation, not after.",
        "Measuring everything instead of the right things. The first question in any analytics engagement should be 'what decisions do you need to make better?' — not 'what data do we have?' Starting from decisions works backwards to the metrics that matter. Starting from data produces dashboards full of numbers that nobody acts on.",
        "Ignoring the last mile. A dashboard that requires a user to log into a separate tool, remember a URL, and navigate a BI interface will be checked occasionally at best. Analytics that arrives in the workflow — a WhatsApp message, an email summary, an alert on a phone — gets acted on. Distribution is as important as quality.",
        "Treating analytics as a project rather than a capability. Analytics infrastructure built once and never maintained degrades rapidly as source systems change, data volumes grow, and business questions evolve. Every analytics engagement we deliver includes a maintenance and evolution plan — because the most valuable insights from a data system often emerge six months after it is first built, not on launch day.",
        "Underestimating data governance. Who is allowed to see which data? Who is responsible for data quality? What happens when two reports show different numbers for the same metric? These governance questions seem administrative but are fundamental to whether analytics actually gets used and trusted in an organisation.",
      ],
    },
    {
      type: "quote",
      text: "The most common failure mode we see is not a technical one. It is an organisation that built a data system nobody trusts because the numbers do not match what people already know. Trust in data is earned through rigorous quality control, transparent methodology, and consistent delivery — not through impressive visualisations.",
      author: "FlexiLogic Data Engineering Team",
    },
    {
      type: "heading",
      level: 2,
      text: "How a FlexiLogic Data Analytics Engagement Works",
    },
    {
      type: "paragraph",
      text: "We begin every data engagement with a two-week discovery phase. We audit your existing data sources — what systems you run, what data they generate, how it is currently stored, and what quality issues exist. We interview the decision-makers who will be the primary consumers of analytics output, mapping the specific decisions they make regularly and the information gaps that currently limit the quality of those decisions. The output is a data architecture proposal and a prioritised analytics roadmap — a clear picture of what to build first and why.",
    },
    {
      type: "paragraph",
      text: "The build phase proceeds in two-week sprints, starting with the data pipeline and warehouse foundation before layering in dashboards and reporting. We ship usable output continuously — by the end of the second sprint, you typically have a working data pipeline and your first dashboard in production, even if it covers only one data source and three metrics. This early delivery builds organisational confidence in the project and surfaces the requirement changes that always emerge when people see real data for the first time.",
    },
    {
      type: "callout",
      emoji: "📈",
      title: "Start with a data audit",
      text: "Not sure what your data infrastructure is worth building on? A FlexiLogic data audit gives you a clear picture of what you have, what it is worth, and what it would take to turn it into a working analytics capability. Two weeks, fixed price, actionable output. Get in touch to book yours.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "Data is not a technology problem. It is a decision quality problem. Every business decision made without data — about pricing, about staffing, about inventory, about customers, about strategy — is a decision made with less information than was available. The organisations building data infrastructure now are not just becoming more efficient. They are building a compounding advantage: better decisions today produce better outcomes, which generate better data, which enable better decisions tomorrow. In competitive markets, that compounding effect becomes decisive.",
    },
  ],

  related: [
    {
      slug: "ai-automation-africa-opportunity-2025",
      category: "AI & Automation",
      categoryColor: "bg-[#A78BFA]/15 text-[#A78BFA]",
      title: "AI Automation in Africa: The Opportunity, The Reality, and What to Build First",
      date: "13 Mar 2025",
      readTime: "12 min read",
      cover: "🤖",
      coverBg: "linear-gradient(135deg,#0d0a1a 0%,#1a1035 100%)",
    },
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