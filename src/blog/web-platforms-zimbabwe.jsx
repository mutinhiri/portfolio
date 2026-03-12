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
   ───────────────────────────────────────────────────────────── */
const ARTICLE = {
  slug: "web-development-zimbabwe-why-your-business-needs-a-professional-website",
  category: "Web Development",
  categoryColor: "bg-[#F59E0B]/15 text-[#F59E0B]",
  title: "Your Website Is Your Hardest Working Employee — Most Zimbabwean Businesses Have Not Hired It Yet",
  subtitle: "A professional website works 24 hours a day, 7 days a week, reaches customers you will never meet in person, and builds credibility before a single conversation takes place. Yet the majority of Zimbabwean businesses either have no website, or one that is actively costing them trust and revenue.",
  date: "13 March 2025",
  readTime: "11 min read",
  author: {
    name: "FlexiLogic Team",
    role: "Engineering & Product",
    avatar: "FL",
  },
  coverEmoji: "🌐",
  coverBg: "linear-gradient(135deg,#1a1200 0%,#2d1f00 100%)",

  content: [
    {
      type: "paragraph",
      text: "A boutique law firm in Harare was losing prospective clients to a competitor with an inferior track record but a significantly better website. The partner who eventually called us had spent years building a reputation through referrals — and had never considered that a potential client who received that referral would immediately search for the firm online, land on a broken, outdated page that had not been updated since 2019, and quietly choose someone else. The referral was happening. The conversion was not.",
    },
    {
      type: "paragraph",
      text: "This pattern repeats across sectors and business sizes in Zimbabwe. A guest house in Victoria Falls losing bookings to a property with identical facilities but a professional booking website. A clinic that has served its community for fifteen years being passed over by new residents who found a competitor with better online information. An SME that cannot pitch for corporate contracts because procurement teams require a credible web presence as a baseline due diligence check. In every case, the business's actual quality was not the problem. Its digital representation was.",
    },
    { type: "divider" },
    {
      type: "heading",
      level: 2,
      text: "The Web Presence Gap in Zimbabwe",
    },
    {
      type: "paragraph",
      text: "Internet penetration in Zimbabwe is growing rapidly, and with it the proportion of purchasing decisions — B2C and B2B — that involve an online search before any human contact takes place. A customer considering a new clinic searches for it before booking. A corporate procurement manager considering a vendor searches for them before scheduling a meeting. A traveller considering accommodation searches before making a reservation. A parent considering a school searches before arranging a visit. The search happens regardless of whether the business has prepared for it.",
    },
    {
      type: "callout",
      emoji: "🔍",
      title: "The silent first impression",
      text: "Most businesses obsess over the impression they make in meetings, pitches, and calls. Almost none invest equivalent energy in the impression they make on the 80% of potential customers who search for them online, form a judgment within seconds, and either proceed or move on — without the business ever knowing the evaluation happened.",
    },
    {
      type: "paragraph",
      text: "The web presence gap in Zimbabwe takes three forms. The first is absence — businesses with no website at all, relying entirely on social media profiles and word of mouth. The second is neglect — businesses with websites that were built years ago, are no longer maintained, and present outdated information, broken links, and a visual language that communicates stagnation rather than credibility. The third is inadequacy — businesses with technically functional websites that were built cheaply, load slowly, look unprofessional on mobile, and fail to communicate the business's actual value proposition clearly enough to convert a visitor into an enquiry.",
    },
    {
      type: "heading",
      level: 2,
      text: "What a Professional Website Actually Does for Your Business",
    },
    {
      type: "paragraph",
      text: "The case for a professional website is sometimes framed as a branding argument — it makes you look more credible. That is true but incomplete. A well-built website is not just a credibility signal. It is an active business development tool that works continuously without staff time, salary costs, or office hours constraints.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Generates inbound enquiries from people who found you through search — customers who were already looking for what you offer and came to you, rather than requiring you to find them",
        "Qualifies prospects before they make contact — a well-designed website communicates who you serve, what you do, what it costs, and why you are the right choice, so the conversations you do have are with people who are already largely convinced",
        "Operates outside business hours — enquiry forms, booking systems, and e-commerce checkouts capture revenue opportunities at 11pm on a Sunday that a branch or phone line cannot",
        "Builds trust with audiences you will never reach through referrals — corporate clients, international partners, grant-making bodies, and customers outside your immediate network all evaluate credibility online before making contact",
        "Provides a measurable, improvable sales channel — unlike word of mouth or print advertising, website performance is trackable and optimisable, allowing continuous improvement of conversion rates over time",
        "Supports every other marketing activity — a social media post, a business card, a radio advertisement, or a referral all drive people to search for you online. Without a strong web presence, those investments are partially wasted",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "The Services We Deliver",
    },
    {
      type: "heading",
      level: 3,
      text: "Business Websites and Landing Pages",
    },
    {
      type: "paragraph",
      text: "A business website is the digital headquarters of your organisation — the definitive source of truth about who you are, what you do, who you serve, and how to engage with you. We design and build business websites that do three things well: communicate your value proposition clearly within the first five seconds of a visit, build trust through professional design and substantive content, and drive visitors toward a specific action — an enquiry, a booking, a download, or a call.",
    },
    {
      type: "paragraph",
      text: "Landing pages are purpose-built single pages designed to convert traffic from a specific source — a Google ad, a social media campaign, an email newsletter — into a specific action. Where a business website serves multiple audiences and purposes, a landing page serves one audience and one purpose, with every element of the design oriented toward that single conversion goal. For businesses running paid digital marketing campaigns, a well-designed landing page can double or triple the return on the advertising spend compared to sending traffic to a general website homepage.",
    },
    {
      type: "heading",
      level: 3,
      text: "E-Commerce Stores",
    },
    {
      type: "paragraph",
      text: "Zimbabwean e-commerce is in an accelerated growth phase, driven by increasing smartphone ownership, improving mobile payment infrastructure, and a consumer base that has experienced the convenience of online shopping and will not revert. An e-commerce store built for this market needs to handle the specific payment methods Zimbabwean consumers use — EcoCash, InnBucks, Visa and Mastercard — load quickly on mobile data connections, and present products in a way that builds purchase confidence for customers who cannot physically inspect what they are buying.",
    },
    {
      type: "paragraph",
      text: "We build e-commerce solutions ranging from WooCommerce implementations for businesses that need a managed, content-editable product catalogue, to fully custom-built storefronts for businesses with complex product logic, subscription models, or integration requirements that off-the-shelf platforms cannot accommodate. Every e-commerce build we deliver includes mobile optimisation, payment gateway integration, order management, and basic inventory tracking as standard.",
    },
    {
      type: "heading",
      level: 3,
      text: "Web Application Development",
    },
    {
      type: "paragraph",
      text: "Beyond websites and e-commerce, the web is a platform for building sophisticated applications that run in a browser — customer portals, booking systems, management dashboards, internal tools, and SaaS products. Web applications built with modern frameworks like React deliver user experiences that rival native desktop software, accessible from any device without installation. We build web applications for clients whose business processes require more than a website can provide — interactive workflows, real-time data, user authentication, and integration with external systems.",
    },
    {
      type: "code",
      lang: "jsx",
      text: `// Example: React component for a professional services enquiry form
// Clean, validated, with optimistic UI and error handling

import { useState } from "react";

export default function EnquiryForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", message: ""
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const services = [
    "Web Development", "Mobile App", "Cloud DevOps",
    "Data Analytics", "AI Automation", "Cybersecurity"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">✅</div>
      <h3>We have received your enquiry</h3>
      <p>A member of the FlexiLogic team will be in touch within one business day.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Full name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email" placeholder="Email address"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        placeholder="Phone number (optional)"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />
      <select
        value={form.service}
        onChange={e => setForm({ ...form, service: e.target.value })}
        required
      >
        <option value="">Select a service</option>
        {services.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <textarea
        placeholder="Tell us about your project"
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
        rows={4} required
      />
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Enquiry"}
      </button>
      {status === "error" && (
        <p className="text-red-500">Something went wrong. Please try again or email us directly.</p>
      )}
    </form>
  );
}`,
    },
    {
      type: "heading",
      level: 3,
      text: "UI/UX Design",
    },
    {
      type: "paragraph",
      text: "Design is not decoration. It is the discipline of making a digital product easy to understand, easy to use, and emotionally compelling for the specific people who will use it. A website with strong UI/UX design communicates professionalism and trustworthiness at a glance, guides visitors toward the actions that matter, and reduces the friction between interest and conversion. A website with weak design — regardless of how well-written the content is — communicates carelessness and creates doubt.",
    },
    {
      type: "paragraph",
      text: "Our design process starts with understanding the target audience — who they are, what they are trying to accomplish, what they need to believe to take action, and what visual language will build rather than erode trust with them. We produce wireframes and high-fidelity mockups before writing any code, and we validate designs against real user feedback before committing to the build. This front-loaded investment in design typically reduces development time and revision cycles significantly compared to building first and designing as you go.",
    },
    {
      type: "heading",
      level: 3,
      text: "Website Redesigns and Migrations",
    },
    {
      type: "paragraph",
      text: "An existing website that is underperforming is not always a reason to build from scratch. Sometimes a strategic redesign — updated visual language, restructured information architecture, improved mobile experience, and refreshed content — is the right intervention. We audit existing websites against conversion, performance, and SEO benchmarks before recommending whether a redesign or a rebuild is the more effective investment. When migration is required — moving from an old CMS to a modern stack, from shared hosting to a cloud environment, or from HTTP to HTTPS — we handle the technical migration with zero downtime and no loss of existing search engine ranking.",
    },
    {
      type: "heading",
      level: 3,
      text: "CMS Integration",
    },
    {
      type: "paragraph",
      text: "A website whose content can only be updated by a developer is a website that will become outdated. Content Management System integration gives non-technical staff the ability to update text, images, news posts, product listings, and other content without touching code. We implement WordPress for clients who need a widely supported, plugin-rich CMS with a large pool of local administrators. For clients building on custom React frontends, we integrate headless CMS platforms — Sanity, Contentful, or Strapi — that give the same editorial flexibility while keeping the performance and design advantages of a modern frontend stack.",
    },
    {
      type: "heading",
      level: 3,
      text: "SEO and Performance Optimisation",
    },
    {
      type: "paragraph",
      text: "A website that cannot be found on Google and loads slowly on a mobile data connection is not a functional business asset — it is an expensive digital brochure that nobody reads. Search Engine Optimisation (SEO) and performance engineering are the disciplines that determine whether your website actually drives business outcomes. SEO ensures your website appears when potential customers search for the services or products you offer. Performance optimisation ensures that when they arrive, the page loads fast enough that they stay.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Technical SEO — site structure, URL architecture, structured data markup, XML sitemaps, robots.txt configuration, and Core Web Vitals optimisation that meet Google's ranking requirements",
        "On-page SEO — keyword research, page title and meta description optimisation, heading structure, internal linking, and content optimisation for the specific search terms your target customers use",
        "Performance optimisation — image compression and next-gen formats (WebP, AVIF), JavaScript and CSS minification and bundling, server-side rendering for critical pages, CDN configuration for fast delivery across African regions, and lazy loading for below-the-fold content",
        "Local SEO — Google Business Profile optimisation, local keyword targeting, and structured data for businesses that serve a specific geographic area",
        "Ongoing SEO monitoring — monthly ranking reports, Core Web Vitals monitoring, backlink analysis, and content recommendations based on search trend data",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Sector by Sector: What a Professional Website Changes",
    },
    {
      type: "heading",
      level: 3,
      text: "Fintech and Banking",
    },
    {
      type: "paragraph",
      text: "Trust is the primary currency of financial services — and a professional website is one of the most powerful trust signals available to a Zimbabwean fintech or financial institution. A fintech website needs to communicate regulatory standing, explain products clearly in plain language, provide transparent fee and rate information, and make the application or onboarding process as simple as possible. For digital lenders and mobile money operators, the website is often the first point of contact for potential customers evaluating whether to trust a financial product with their money. The quality of that first contact is disproportionately consequential.",
    },
    {
      type: "heading",
      level: 3,
      text: "Healthcare and Clinics",
    },
    {
      type: "paragraph",
      text: "Patients choosing a clinic or specialist in Zimbabwe increasingly search online before making a booking decision. A healthcare website that provides clear information about services, qualifications, facilities, and location — with an online booking capability — captures patients who would otherwise choose a competitor with better digital presence. For specialists and private clinics competing for a discerning patient base, the website communicates quality of care before a patient has ever interacted with a member of staff.",
    },
    {
      type: "heading",
      level: 3,
      text: "Schools and EdTech",
    },
    {
      type: "paragraph",
      text: "A school's website is evaluated by prospective parents making one of the most significant decisions of their children's lives. It needs to communicate academic culture, values, facilities, extracurricular offering, and outcomes with clarity and warmth. Admissions information, fee structures, and application processes should be easy to find and understand. Testimonials, results, and community stories build the emotional case alongside the rational one. For EdTech companies, the website is the primary sales channel — every element of the design should be oriented toward trial sign-ups, demo bookings, or direct purchases.",
    },
    {
      type: "heading",
      level: 3,
      text: "E-Commerce and Retail",
    },
    {
      type: "paragraph",
      text: "For retail businesses, an e-commerce website is not a supplement to the physical store — it is an additional store that is open around the clock, serves customers who live too far from a physical location to visit regularly, and captures impulse purchases that a browsing customer would make at midnight if the checkout were available. Zimbabwean retailers with strong e-commerce presences are growing their addressable market and their revenue per customer simultaneously. Those without one are leaving a growing proportion of purchasing intent unaddressed.",
    },
    {
      type: "heading",
      level: 3,
      text: "Hospitality and Tourism",
    },
    {
      type: "paragraph",
      text: "Tourism is one of the most website-dependent industries in Zimbabwe's economy. Travellers researching accommodation, safari operations, and hospitality experiences make their decisions almost entirely online — and the quality of a website's photography, copy, and booking experience is directly correlated with booking conversion rates. A Victoria Falls lodge or a Nyanga retreat with a slow, poorly photographed, hard-to-book website is systematically losing reservations to competitors with better digital presence, regardless of the actual quality of the physical experience they offer.",
    },
    {
      type: "heading",
      level: 3,
      text: "Government and NGOs",
    },
    {
      type: "paragraph",
      text: "Government agencies and NGOs have a specific web presence imperative: accountability and accessibility. Citizens need to be able to find information about services, eligibility, processes, and contact details without barriers. Donors and grant-making bodies evaluate organisational credibility through digital presence before engaging. A well-structured, clearly written, regularly updated website is not a communication nice-to-have for a public institution or civil society organisation — it is a transparency obligation and a fundraising asset.",
    },
    {
      type: "heading",
      level: 3,
      text: "Professional Services and SMEs",
    },
    {
      type: "paragraph",
      text: "Law firms, accounting practices, engineering consultancies, architecture studios, and management consulting firms compete in markets where reputation and credibility are everything — and where a professional website is one of the primary signals of both. Corporate clients conducting supplier due diligence, referral recipients validating a recommendation, and prospective hires evaluating a potential employer all form their first impression online. For professional services firms, the investment in a well-designed website is among the highest-return marketing expenditures available.",
    },
    {
      type: "heading",
      level: 2,
      text: "What Separates a Website That Works from One That Does Not",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Speed on mobile data. Google's research consistently shows that more than half of mobile users abandon a page that takes longer than three seconds to load. In Zimbabwe's mobile data environment, this threshold is even less forgiving. Performance is not an aesthetic consideration — it is a conversion requirement.",
        "A clear single action on every page. Every page of a website should have one primary action it wants visitors to take — book a call, submit an enquiry, make a purchase, download a resource. Pages that try to accomplish everything accomplish nothing. The best-performing websites guide visitors through a deliberate journey toward a specific outcome.",
        "Content written for the visitor, not the business. Most website copy is written from the business's perspective — what we do, our mission, our values. Visitors arrive with a different question: can you solve my problem? Website content that leads with the visitor's problem and explains how you solve it converts significantly better than content that leads with a company biography.",
        "Trust signals placed where they are needed most. Testimonials, credentials, client logos, case studies, and certifications should appear at the specific moments in a visitor's journey when doubt is highest — next to a pricing section, near an enquiry form, on a services page. Trust signals buried in an 'About' page that most visitors never reach are wasted.",
        "Genuine mobile optimisation. A website that is technically responsive but was designed for desktop is not mobile-optimised. True mobile optimisation means designing for a touchscreen first — tap targets that are large enough to use with a thumb, navigation that works without hover states, forms that do not require a keyboard to use comfortably, and content that is readable without pinching to zoom.",
        "Maintained and current. A website whose latest news post is from 2022, whose team page shows people who no longer work there, and whose services section describes offerings that have since changed communicates neglect. Regular content updates are not just good for SEO — they signal to every visitor that the business is active, engaged, and worth trusting.",
      ],
    },
    {
      type: "quote",
      text: "The question we ask at the start of every web project is not 'what does the client want to say?' It is 'what does the visitor need to believe in order to take action — and what is the most credible, compelling way to help them believe it?' That shift in perspective is the difference between a website that looks good and one that actually works.",
      author: "FlexiLogic Design Team",
    },
    {
      type: "heading",
      level: 2,
      text: "How a FlexiLogic Web Engagement Works",
    },
    {
      type: "paragraph",
      text: "Every web engagement begins with a discovery session where we understand your business, your target audience, your competitive landscape, and the specific outcomes you need the website to drive. We audit any existing web presence for performance, SEO, and conversion issues. We agree on a sitemap, a content strategy, and a visual direction before any design work begins — preventing the expensive rework that happens when direction changes after designs are already built.",
    },
    {
      type: "paragraph",
      text: "Design comes next — wireframes that establish information architecture and user journey, followed by high-fidelity mockups in your brand language that give you a precise preview of the finished product before a line of code is written. Once designs are approved, development proceeds on a defined timeline with a staging environment where you can review and provide feedback on the live build before it goes to production.",
    },
    {
      type: "paragraph",
      text: "Launch is followed by a 30-day support period covering any post-launch fixes, Google Search Console setup, analytics configuration, and initial SEO indexing verification. After the support period, clients can move to a maintenance retainer covering content updates, security patches, performance monitoring, and ongoing SEO work — or manage the site independently using the CMS training we provide at handover.",
    },
    {
      type: "callout",
      emoji: "🌐",
      title: "Ready to build a website that actually works?",
      text: "Whether you need a brand new professional website, an e-commerce store, a web application, or a complete rebuild of an underperforming existing site — FlexiLogic delivers web products built for the Zimbabwean market, designed to convert visitors into customers, and engineered to perform on the devices and connections your audience actually uses. Get in touch to start the conversation.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "Your website is the only member of your team that works every hour of every day, never calls in sick, reaches customers you will never meet through any other channel, and makes a judgment call about your business on your behalf before you know the evaluation is happening. The question is not whether that team member is worth investing in. The question is whether yours is doing the job well enough to win.",
    },
  ],

  related: [
    {
      slug: "mobile-app-development-africa-2025",
      category: "Mobile",
      categoryColor: "bg-[#38BDF8]/15 text-[#38BDF8]",
      title: "Mobile App Development in Africa: Why Your Next Customer Will Find You on a Phone — or Not at All",
      date: "13 Mar 2025",
      readTime: "11 min read",
      cover: "📱",
      coverBg: "linear-gradient(135deg,#0a1520 0%,#0d1f35 100%)",
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

/* ─── Styles ─── */
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