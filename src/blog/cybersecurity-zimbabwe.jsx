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
  slug: "cybersecurity-zimbabwe-why-businesses-are-vulnerable",
  category: "Cybersecurity",
  categoryColor: "bg-[#FF6B6B]/15 text-[#FF6B6B]",
  title: "Cybersecurity in Zimbabwe: Why Local Businesses Are More Exposed Than They Think",
  subtitle: "Ransomware, phishing, data breaches, and insecure code — the cyber threat landscape in Zimbabwe is maturing fast. The businesses that recognise this early will be the ones still standing when the wave hits.",
  date: "13 March 2025",
  readTime: "11 min read",
  author: {
    name: "FlexiLogic Team",
    role: "Engineering & Product",
    avatar: "FL",
  },
  coverEmoji: "🔐",
  coverBg: "linear-gradient(135deg,#1a0a0a 0%,#2d1515 100%)",

  content: [
    {
      type: "paragraph",
      text: "In 2024, a Harare-based microfinance institution discovered that a former employee had been exfiltrating customer financial records for six months before anyone noticed. The breach was not sophisticated. No zero-day exploits. No nation-state actors. Just a shared admin password that had never been changed after the employee left, and no access logging to flag the unusual activity. The institution lost customer data, regulatory goodwill, and a significant portion of its client base — all from a problem that a basic security audit would have caught in under an hour.",
    },
    {
      type: "paragraph",
      text: "This story is not unusual. It is, in our experience, representative. Zimbabwean businesses are digitising rapidly — processing payments online, storing student and patient records in the cloud, running government services through web portals — while the security practices underpinning those systems have not kept pace. This article explains why, what the real threat landscape looks like in 2025, and what organisations across every sector need to do about it.",
    },
    { type: "divider" },
    {
      type: "heading",
      level: 2,
      text: "The Threat Landscape Has Changed — Zimbabwean Security Postures Have Not",
    },
    {
      type: "paragraph",
      text: "A common assumption among Zimbabwean business leaders is that cyber attackers target large Western corporations — banks in London, healthcare systems in the United States, tech companies in Silicon Valley. This assumption was broadly true a decade ago. It is dangerously false today. Modern cybercrime is automated and geographically indiscriminate. Ransomware groups use automated scanners that probe millions of IP addresses daily looking for unpatched systems, exposed databases, and weak credentials. They do not care where the server is. They care whether the door is unlocked.",
    },
    {
      type: "callout",
      emoji: "⚠️",
      title: "The 'we're too small to be a target' myth",
      text: "Most cyberattacks targeting African businesses are not targeted at all — they are opportunistic. Automated bots scan the entire internet continuously for known vulnerabilities. If your system has an exposed port, an outdated library, or a default admin password, it will be found. Being a small business in Harare provides no protection whatsoever.",
    },
    {
      type: "paragraph",
      text: "The threat actors relevant to Zimbabwean organisations in 2025 fall into three broad categories: opportunistic automated attacks targeting known vulnerabilities in common software; financially motivated criminal groups running phishing campaigns and ransomware operations across African markets; and, for government and NGO targets specifically, state-adjacent actors with an interest in data collection and disruption. The first category affects virtually every organisation with an internet-connected system. The second is growing rapidly as African digital financial flows increase. The third is a specialised but real risk for institutions handling sensitive citizen or donor data.",
    },
    {
      type: "heading",
      level: 2,
      text: "Sector by Sector: Where the Vulnerabilities Are",
    },
    {
      type: "heading",
      level: 3,
      text: "Fintech and Mobile Money",
    },
    {
      type: "paragraph",
      text: "Zimbabwe's fintech sector processes billions of dollars in mobile money transactions annually. It is also one of the most actively targeted sectors by cybercriminals, for the obvious reason that money moves through it. The attack vectors we see most frequently are API authentication weaknesses in mobile money integrations — where third-party applications connect to payment rails with insufficient credential protection — and social engineering attacks targeting customer service staff to authorise fraudulent reversals. SIM-swap fraud, where an attacker convinces a mobile operator to transfer a victim's number to an attacker-controlled SIM, is also accelerating as a vector for bypassing SMS-based two-factor authentication.",
    },
    {
      type: "heading",
      level: 3,
      text: "Schools and EdTech",
    },
    {
      type: "paragraph",
      text: "School management systems, online learning platforms, and student information systems store significant volumes of sensitive personal data — student records, parental contact details, financial information, and in some cases medical records for boarding students. The cybersecurity posture of most Zimbabwean schools is extremely weak: shared admin passwords, no encryption at rest, no audit logging, and student portals running on unpatched content management systems. The regulatory risk here is growing as Zimbabwe's Data Protection Act matures and enforcement capacity develops.",
    },
    {
      type: "heading",
      level: 3,
      text: "Healthcare",
    },
    {
      type: "paragraph",
      text: "Patient health records are among the most valuable data types on criminal markets — worth significantly more per record than financial data, because they combine personal identifiers with sensitive information that can be used for insurance fraud, identity theft, and targeted extortion. Zimbabwean hospitals and clinics are increasingly digitising patient records, often using off-the-shelf software with default configurations and no security hardening. A ransomware attack on a hospital system is not just a data problem — it is a patient safety emergency.",
    },
    {
      type: "heading",
      level: 3,
      text: "Government and NGOs",
    },
    {
      type: "paragraph",
      text: "Government digital services and NGO data management systems present a different threat profile. The data held — citizen records, beneficiary information, donor financial flows, programme monitoring data — is of high value to state-level actors and organised criminal groups. Many NGO systems in particular were built quickly for operational purposes with minimal security consideration, and are accessed by staff across multiple countries and network environments, dramatically expanding the attack surface.",
    },
    {
      type: "heading",
      level: 3,
      text: "E-Commerce and Retail",
    },
    {
      type: "paragraph",
      text: "Zimbabwean e-commerce platforms handling card payments or mobile money integrations are subject to payment card industry standards whether or not their operators are aware of them. Customer payment data intercepted in transit due to missing or misconfigured HTTPS, stored insecurely, or exposed through a vulnerable shopping cart plugin represents both a direct financial risk and a reputational one. A single publicised breach of customer payment data can permanently damage consumer trust in a platform that took years to build.",
    },
    {
      type: "heading",
      level: 3,
      text: "General SMEs",
    },
    {
      type: "paragraph",
      text: "Small and medium enterprises are frequently the entry point for attacks targeting larger organisations in their supply chain. An accounting firm with weak email security becomes the vector for a business email compromise attack on their corporate clients. A logistics company with an insecure customer portal exposes the data of every retailer they serve. SME cybersecurity is not just a matter of protecting the SME itself — it is a matter of not becoming a liability for every organisation that trusts you with their data or system access.",
    },
    {
      type: "heading",
      level: 2,
      text: "The Six Most Common Attack Vectors We See in Zimbabwe",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Phishing emails — convincing staff to click malicious links or enter credentials on fake login pages. Remains the single most common initial access vector in every sector. Staff training is the primary mitigation.",
        "Unpatched software — running outdated versions of WordPress, server operating systems, database software, or application dependencies with known, publicly documented vulnerabilities. Automated scanners find these within hours of a server going online.",
        "Weak or shared credentials — admin passwords shared across staff, never rotated after employee departures, or set to obvious values. Combined with no multi-factor authentication, this is the easiest possible attack path.",
        "Exposed databases — MongoDB, PostgreSQL, and Redis instances left accessible on public IP addresses without authentication, often because a developer opened a port for testing and never closed it. These are found and compromised within minutes of exposure.",
        "Insecure API endpoints — mobile and web applications with API endpoints that do not properly validate authentication tokens, allowing attackers to access or modify other users' data by manipulating request parameters.",
        "Ransomware via remote desktop — attackers brute-forcing RDP (Windows Remote Desktop) credentials on internet-facing servers, then deploying ransomware that encrypts all data and demands payment for decryption keys.",
      ],
    },
    {
      type: "quote",
      text: "Every penetration test we have conducted on a Zimbabwean business system in the past 12 months has identified at least one critical vulnerability that would have allowed an external attacker to access sensitive data without any prior knowledge of the organisation.",
      author: "FlexiLogic Security Team",
    },
    {
      type: "heading",
      level: 2,
      text: "What Good Cybersecurity Actually Looks Like",
    },
    {
      type: "paragraph",
      text: "Cybersecurity is not a product you buy once and install. It is a practice — a set of ongoing disciplines that reduce the probability and impact of a breach. The goal is not to make your systems impenetrable, which is impossible, but to make them sufficiently difficult to breach that opportunistic attackers move on, and to ensure that when a breach does occur, the damage is contained and recoverable.",
    },
    {
      type: "heading",
      level: 3,
      text: "Security Audits and Penetration Testing",
    },
    {
      type: "paragraph",
      text: "A security audit systematically reviews your systems, configurations, and processes against established security standards. Penetration testing goes further — our engineers attempt to breach your systems using the same techniques and tools an attacker would use, and document every vulnerability discovered with a severity rating and a remediation recommendation. The output is a prioritised remediation roadmap that tells you exactly what to fix first, and why.",
    },
    {
      type: "callout",
      emoji: "🔍",
      title: "What a penetration test covers",
      text: "External network penetration (what can an attacker do from the internet), web application testing (authentication bypass, SQL injection, cross-site scripting, insecure direct object references), API security testing, social engineering simulation (phishing your own staff with their knowledge), and internal network testing where relevant. Every finding is documented with proof-of-concept evidence and a clear remediation path.",
    },
    {
      type: "heading",
      level: 3,
      text: "Secure Code Review",
    },
    {
      type: "paragraph",
      text: "Most security vulnerabilities are introduced at the code level — SQL injection, authentication bypass, insecure data storage, and broken access control are all coding errors before they are security incidents. A secure code review examines your application's source code for these classes of vulnerability before they reach production. For new software projects we offer security review as part of the development process. For existing applications we conduct a targeted review of the highest-risk components — authentication systems, payment processing logic, and data access layers.",
    },
    {
      type: "code",
      lang: "javascript",
      text: `// ❌ Vulnerable: SQL injection via string concatenation
const query = "SELECT * FROM users WHERE email = '" + userInput + "'";
db.query(query);

// ✅ Secure: Parameterised query — user input never touches SQL syntax
const query = "SELECT * FROM users WHERE email = $1";
db.query(query, [userInput]);

// ❌ Vulnerable: Password stored as plain text
user.password = req.body.password;

// ✅ Secure: Password hashed with bcrypt before storage
const saltRounds = 12;
user.password = await bcrypt.hash(req.body.password, saltRounds);

// ❌ Vulnerable: Sensitive data in JWT payload (readable by anyone)
jwt.sign({ userId, creditCardNumber, nationalId }, secret);

// ✅ Secure: Only non-sensitive identifiers in token payload
jwt.sign({ userId, role }, secret, { expiresIn: '24h' });`,
    },
    {
      type: "heading",
      level: 3,
      text: "SSL / HTTPS Setup and Management",
    },
    {
      type: "paragraph",
      text: "HTTPS encrypts all data in transit between a user's browser and your server, preventing interception by anyone monitoring the network — a genuine threat in environments where public Wi-Fi and shared office networks are common. Despite being a baseline security requirement, a significant proportion of Zimbabwean business websites and web applications still serve some or all content over unencrypted HTTP. We provision and manage SSL certificates, enforce HTTPS redirects, configure HTTP security headers (HSTS, CSP, X-Frame-Options), and ensure certificates are renewed automatically before expiry.",
    },
    {
      type: "heading",
      level: 3,
      text: "Firewall and Network Security",
    },
    {
      type: "paragraph",
      text: "A firewall is the first line of defence between your systems and the internet. A properly configured firewall allows only the specific types of traffic your application requires and blocks everything else. In practice, many cloud-hosted systems in Zimbabwe are running with permissive security group rules left open from development — SSH accessible from any IP address, database ports exposed to the public internet, admin panels reachable without VPN. We audit and harden network configurations across AWS, Google Cloud, Azure, and DigitalOcean environments, implementing the principle of least privilege at the network layer.",
    },
    {
      type: "heading",
      level: 3,
      text: "Data Encryption and Backup",
    },
    {
      type: "paragraph",
      text: "Encryption protects data in two states: in transit (covered by HTTPS and TLS) and at rest (data stored on disk or in a database). Sensitive data — personal identifiers, financial records, health information, authentication credentials — should be encrypted at rest such that even physical access to the storage medium yields nothing readable. We implement database-level encryption, application-level field encryption for the most sensitive data categories, and encrypted automated backup systems with tested restore procedures. An untested backup is not a backup — it is a hope.",
    },
    {
      type: "heading",
      level: 3,
      text: "Security Training for Staff",
    },
    {
      type: "paragraph",
      text: "Technology controls alone cannot defend against an employee who clicks a phishing link, shares their password with a colleague, or connects to the corporate VPN from a compromised personal device. The human layer is consistently the most exploited attack surface in every sector. Our staff security training programme covers phishing recognition and response, password management and multi-factor authentication, safe data handling procedures, incident reporting, and social engineering awareness. Training is delivered as interactive workshops rather than compliance tick-boxes, because people retain what they engage with.",
    },
    {
      type: "heading",
      level: 2,
      text: "The Regulatory Dimension: Zimbabwe's Data Protection Act",
    },
    {
      type: "paragraph",
      text: "Zimbabwe's Cyber and Data Protection Act (Chapter 12:07), gazetted in 2021, establishes legal obligations for organisations collecting, storing, and processing personal data of Zimbabwean citizens. As enforcement capacity develops and awareness of the legislation grows, organisations without documented data protection practices and security controls face increasing regulatory and legal exposure. Sectors handling sensitive personal data — healthcare, fintech, education, and government services — face the highest obligation and the highest risk.",
    },
    {
      type: "callout",
      emoji: "⚖️",
      title: "Regulatory compliance is a floor, not a ceiling",
      text: "Compliance with Zimbabwe's Data Protection Act is the minimum legal requirement, not an indicator of good security. Organisations that treat compliance as their security target are setting a low bar that attackers are well aware of. The organisations that protect their customers and their reputations are the ones treating compliance as the starting point for a genuine security programme.",
    },
    {
      type: "heading",
      level: 2,
      text: "Where to Start: A Practical Security Roadmap",
    },
    {
      type: "paragraph",
      text: "For most Zimbabwean organisations, the most valuable first investment in cybersecurity is not expensive tooling — it is understanding what you actually have and where the real risks are. A security audit scoped to your specific systems, data assets, and threat profile gives you that understanding and a prioritised list of actions. From there, the remediation roadmap is typically structured in three phases.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Immediate remediation (Week 1–2) — close the critical vulnerabilities that represent the highest probability of breach: exposed databases, default credentials, missing HTTPS, and unpatched systems with known critical CVEs.",
        "Structural hardening (Month 1–3) — implement network security controls, establish backup and encryption practices, deploy monitoring and alerting, and conduct the first round of staff phishing simulation and training.",
        "Ongoing programme (Month 3+) — quarterly vulnerability scanning, annual penetration testing, continuous monitoring, security review integrated into the software development lifecycle, and regular staff training refreshers.",
      ],
    },
    {
      type: "callout",
      emoji: "🛡️",
      title: "Start with a security audit",
      text: "If you are not sure where your organisation stands, a FlexiLogic security audit is the right first step. We assess your external attack surface, review your cloud and network configuration, test your web applications, and deliver a clear prioritised report within two weeks. Get in touch to book yours.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "The question for Zimbabwean businesses in 2025 is no longer whether a cyberattack will be attempted against your systems. Automated attacks are constant and indiscriminate. The question is whether your systems are hardened enough that those attempts fail — and whether you have the visibility to know when they are happening and the controls to limit the damage if one succeeds. That is what a serious cybersecurity programme delivers, and it is well within reach for organisations of every size.",
    },
  ],

  related: [
    {
      slug: "cloud-devops-africa",
      category: "DevOps",
      categoryColor: "bg-[#7C9FFF]/15 text-[#7C9FFF]",
      title: "Why African Startups Can No Longer Afford to Ignore DevOps",
      date: "13 Mar 2025",
      readTime: "9 min read",
      cover: "☁️",
      coverBg: "linear-gradient(135deg,#0a1628 0%,#0d2137 100%)",
    },
    {
      slug: "building-school-management-system-zimbabwe",
      category: "Product",
      categoryColor: "bg-[#00C896]/15 text-[#00C896]",
      title: "Eduverse: How We Built a Full-Stack School Management System for African Schools",
      date: "13 Mar 2025",
      readTime: "10 min read",
      cover: "🏫",
      coverBg: "linear-gradient(135deg,#0B1221 0%,#1B2847 100%)",
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