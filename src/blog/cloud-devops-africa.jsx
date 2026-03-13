
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
  slug: "why-african-startups-need-devops-cloud-infrastructure",
  category: "DevOps",
  categoryColor: "bg-[#7C9FFF]/15 text-[#7C9FFF]",
  title: "Why African Startups Can No Longer Afford to Ignore DevOps",
  subtitle: "Shipping fast is not enough. The startups winning in Africa's competitive tech market are the ones who've invested in cloud infrastructure, automated deployments, and operational discipline — before they needed to.",
  date: "13 March 2025",
  readTime: "9 min read",
  author: {
    name: "FlexiLogic Team",
    role: "Engineering & Product",
    avatar: "FL",
  },
  coverEmoji: "☁️",
  coverBg: "linear-gradient(135deg,#0a1628 0%,#0d2137 100%)",

  content: [
    {
      type: "paragraph",
      text: "There is a pattern we see repeatedly with African tech startups. A founding team builds something impressive — fast, scrappy, and functional. They get their first customers. They raise a seed round or hit early revenue. And then they hit a wall. Not a product wall. Not a market wall. An infrastructure wall. The deployment process that worked for five users falls apart at five thousand. A single bad release takes the whole product offline for hours. Nobody on the team knows why the server is slow at 6pm every day. The cloud bill doubles month-on-month with no clear explanation.",
    },
    {
      type: "paragraph",
      text: "This is not a story about technical failure. It is a story about DevOps — or rather, the absence of it. And it is one of the most consistently underinvested areas in African startup engineering. This article makes the case for why that needs to change, and what a modern cloud DevOps practice actually looks like for a scaling African tech business.",
    },
    { type: "divider" },
    {
      type: "heading",
      level: 2,
      text: "What DevOps Actually Means (Beyond the Buzzword)",
    },
    {
      type: "paragraph",
      text: "DevOps is an overloaded term. In some organisations it means a job title. In others it refers to a set of tools. The definition we work from is simpler and more useful: DevOps is the practice of removing friction between writing code and running it reliably in production. It encompasses how software is built, tested, deployed, monitored, and recovered from failure. Done well, it is largely invisible — things just work, releases go out without drama, and engineers spend their time building features rather than firefighting infrastructure.",
    },
    {
      type: "callout",
      emoji: "💡",
      title: "A useful frame",
      text: "If your team is afraid to deploy on a Friday, you have a DevOps problem. If a single engineer leaving the company would make deployments impossible, you have a DevOps problem. If you don't know your application is down until a customer tells you, you have a DevOps problem.",
    },
    {
      type: "heading",
      level: 2,
      text: "The African Context: Why DevOps Matters More Here, Not Less",
    },
    {
      type: "paragraph",
      text: "A common objection we hear from early-stage founders is that DevOps is a concern for later — something to invest in once you've found product-market fit and have the engineering headcount to support it. We understand the logic, but we think it gets the sequencing wrong, especially in the African market context.",
    },
    {
      type: "paragraph",
      text: "African tech products operate in an environment with specific infrastructure pressures that make operational reliability more important, not less. Variable internet connectivity means users have low tolerance for slow or unavailable services — they will not wait and retry the way a broadband user might. Mobile-first usage patterns mean traffic spikes are sharp and unpredictable, driven by social sharing, mobile money promotions, or news cycles. And the cost of downtime in fintech, healthtech, or edtech is not just lost revenue — it erodes the institutional trust that African tech products have spent years building in markets where digital scepticism remains high.",
    },
    {
      type: "quote",
      text: "In markets where trust is still being built, a 2am outage is not an inconvenience. It is a reason for a customer to go back to doing things the old way — and to tell everyone they know.",
      author: "FlexiLogic Engineering Team",
    },
    {
      type: "heading",
      level: 2,
      text: "CI/CD Pipelines: Shipping Without the Fear",
    },
    {
      type: "paragraph",
      text: "Continuous Integration and Continuous Deployment (CI/CD) is the foundation of a modern DevOps practice. A CI/CD pipeline is an automated sequence that runs every time a developer pushes code — it builds the application, runs the test suite, checks code quality, and if everything passes, deploys the new version to the appropriate environment automatically.",
    },
    {
      type: "paragraph",
      text: "The business impact of this is significant. Teams with mature CI/CD pipelines deploy multiple times per day with confidence. Teams without them often deploy once a week, or less frequently, because each deployment is a manual, anxiety-inducing process that requires senior engineering time and carries real risk. The compounding effect over months is enormous — the first team ships twelve times more features, fixes bugs faster, and responds to market feedback in days rather than weeks.",
    },
    {
      type: "code",
      lang: "yaml",
      text: `# Example: GitHub Actions CI/CD pipeline for a Node.js API
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build Docker image
        run: docker build -t myapp: .

      - name: Push to container registry
        run: |
          echo | docker login -u  --password-stdin
          docker push myapp:{{ github.sha }}

      - name: Deploy to production
        run: |
          ssh deploy@{{ secrets.PROD_HOST }} \
            "docker pull myapp:{{ github.sha }} && \
             docker-compose up -d --no-deps app"`,
    },
    {
      type: "paragraph",
      text: "We build CI/CD pipelines using GitHub Actions, GitLab CI, or AWS CodePipeline depending on a client's existing tooling. Every pipeline we deliver includes automated testing gates — a deployment cannot reach production if tests are failing. This single constraint prevents the majority of production incidents we see in teams that deploy manually.",
    },
    {
      type: "heading",
      level: 2,
      text: "Containerisation: The Same Code, Everywhere",
    },
    {
      type: "paragraph",
      text: "Docker containers solve one of the oldest problems in software deployment: the application that works on a developer's laptop but breaks on the production server. A container packages the application and all its dependencies — the exact version of Node.js, the exact system libraries, the exact configuration — into a single portable unit that runs identically on a developer's MacBook, a test server, and an AWS EC2 instance in the af-south-1 region.",
    },
    {
      type: "paragraph",
      text: "For teams scaling beyond a single server, Kubernetes orchestrates containers across a cluster — automatically restarting failed containers, distributing traffic across healthy instances, and scaling the number of running containers up or down based on load. We typically recommend Kubernetes for products that have outgrown a single server but are not yet at the scale where a fully managed service like AWS ECS or Google Cloud Run becomes the more pragmatic choice.",
    },
    {
      type: "callout",
      emoji: "🐳",
      title: "Our containerisation approach",
      text: "For most African startups at seed to Series A stage, Docker Compose on a well-provisioned DigitalOcean or AWS instance is the right starting point — not a full Kubernetes cluster. We right-size the infrastructure to the actual load and growth trajectory, not to what looks impressive in a pitch deck.",
    },
    {
      type: "heading",
      level: 2,
      text: "Infrastructure as Code: Your Server Config in Git",
    },
    {
      type: "paragraph",
      text: "Infrastructure as Code (IaC) means defining your cloud infrastructure — servers, databases, networking rules, load balancers, DNS records — in version-controlled configuration files rather than clicking through a cloud console. We use Terraform for cloud-agnostic infrastructure provisioning across AWS, Google Cloud, Azure, and DigitalOcean, and Ansible for server configuration management.",
    },
    {
      type: "paragraph",
      text: "The practical benefits are significant. When a server needs to be replaced — due to a hardware failure, a region migration, or a scaling event — IaC means the replacement is provisioned in minutes from the configuration file, not hours of manual recreation from memory. When a junior engineer accidentally deletes a security group rule, the correct configuration is in Git and can be re-applied in one command. And when a new environment needs to be created for staging or load testing, it is an exact clone of production, not a best-guess approximation.",
    },
    {
      type: "code",
      lang: "hcl",
      text: `# Example: Terraform config for an AWS EC2 instance + RDS database
resource "aws_instance" "app_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.medium"
  key_name      = var.key_pair_name

  vpc_security_group_ids = [aws_security_group.app_sg.id]
  subnet_id              = aws_subnet.public.id

  tags = {
    Name        = "flexilogic-app-server"
    Environment = var.environment
  }
}

resource "aws_db_instance" "postgres" {
  identifier        = "flexilogic-db"
  engine            = "postgres"
  engine_version    = "15.4"
  instance_class    = "db.t3.medium"
  allocated_storage = 20
  storage_encrypted = true

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  backup_retention_period = 7
  skip_final_snapshot     = false
}`,
    },
    {
      type: "heading",
      level: 2,
      text: "Monitoring and Alerting: Knowing Before Your Users Do",
    },
    {
      type: "paragraph",
      text: "A production system without monitoring is a system you are flying blind. You do not know if your API response times have doubled in the last hour. You do not know if your database is running out of disk space. You do not know if one of your background jobs silently stopped processing three days ago. You find out when a customer complains — which in B2B software often means you find out in a meeting with their senior leadership.",
    },
    {
      type: "paragraph",
      text: "We implement monitoring stacks using a combination of tools selected for the client's scale and budget. For application performance monitoring we use Datadog or open-source alternatives like Grafana with Prometheus. For error tracking we use Sentry, which captures every unhandled exception in production with a full stack trace and the user context that triggered it. For uptime monitoring we configure synthetic checks that hit critical API endpoints every minute from multiple regions.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Uptime monitoring — alerting within 60 seconds of any endpoint going down, from multiple geographic regions",
        "Application performance monitoring — p95 and p99 response time tracking, slow query identification, and memory leak detection",
        "Error tracking — every production exception captured with stack trace, user context, and deployment version",
        "Infrastructure metrics — CPU, memory, disk, and network utilisation with threshold-based alerts before resources are exhausted",
        "Business metrics — custom dashboards tracking the KPIs that matter for each client (active users, transaction volume, job queue depth)",
        "On-call alerting — PagerDuty or Slack integration so the right engineer is notified immediately when something critical breaks",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Zero-Downtime Deployments: Releasing Without the Maintenance Window",
    },
    {
      type: "paragraph",
      text: "The traditional approach to deploying new software is to take the application offline, swap in the new version, and bring it back up. This made sense when deployments happened once a quarter. It is completely unacceptable when you are deploying multiple times per week and your users are distributed across time zones with no convenient 'off-peak' window.",
    },
    {
      type: "paragraph",
      text: "Zero-downtime deployment strategies — blue-green deployments, rolling updates, and canary releases — allow new versions of an application to be deployed while the current version continues serving traffic. Users experience no interruption. If the new version has a critical bug, it can be rolled back in seconds rather than requiring a full redeployment. We implement these patterns as standard on every client engagement where uptime is a product requirement — which is effectively every client.",
    },
    {
      type: "callout",
      emoji: "🔄",
      title: "Blue-green deployments explained simply",
      text: "You run two identical production environments — Blue (current live) and Green (new version). When a deployment is ready, traffic is switched from Blue to Green at the load balancer level. Zero users experience downtime. If Green has a problem, one config change switches traffic back to Blue. Blue then becomes the staging ground for the next release.",
    },
    {
      type: "heading",
      level: 2,
      text: "Cloud Cost Optimisation: Paying for What You Actually Use",
    },
    {
      type: "paragraph",
      text: "Cloud infrastructure can be extraordinarily cost-efficient or extraordinarily wasteful — often simultaneously, in different parts of the same system. We have audited cloud bills for African startups spending $4,000 per month on AWS and found $1,500 of immediate savings without touching application performance. The patterns are remarkably consistent: oversized instances provisioned for peak load that never comes, unattached EBS volumes accumulating charges after instances are terminated, data transfer costs from inefficient cross-region architectures, and development environments left running around the clock.",
    },
    {
      type: "paragraph",
      text: "Cloud cost optimisation is not about cutting corners. It is about matching resource consumption to actual workload. We use AWS Cost Explorer, Google Cloud's cost management tools, and DigitalOcean's usage reports to establish a baseline, identify waste, and implement a rightsizing strategy. For most clients this involves a combination of instance rightsizing, Reserved Instance or Savings Plan commitments for predictable workloads, auto-scaling groups that scale in during low-traffic periods, and a tagging strategy that makes it clear which team and product is responsible for each dollar of cloud spend.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Cloud cost audit — full analysis of current spend by service, region, and resource type",
        "Rightsizing — matching instance sizes to actual CPU and memory utilisation, not worst-case estimates",
        "Auto-scaling — automatically scaling capacity up during peak traffic and down during quiet periods",
        "Reserved capacity commitments — trading flexibility for significant discounts on predictable baseline workloads",
        "Storage tiering — moving infrequently accessed data to cheaper storage classes (S3 Infrequent Access, Glacier)",
        "Cost allocation tagging — making every dollar of cloud spend attributable to a team, product, or environment",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Which Cloud Platform Is Right for Your Business?",
    },
    {
      type: "paragraph",
      text: "We are platform-agnostic, which means we can give honest advice rather than steering clients toward a vendor we have a commercial relationship with. Here is how we think about the four platforms we work with most frequently in the African market.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "AWS — the most mature ecosystem with the broadest service catalogue. The af-south-1 (Cape Town) region gives southern African products genuinely low latency. Best for teams that need managed services (RDS, Lambda, SQS, CloudFront) and are willing to invest in learning the platform.",
        "Google Cloud — strong choice for teams building on BigQuery for analytics, or using Firebase for mobile backends. The GCP managed Kubernetes offering (GKE) is the most polished in the market. Growing African infrastructure footprint.",
        "Azure — the natural choice for organisations with existing Microsoft licensing, Active Directory integration requirements, or enterprise sales motion to corporates and government.",
        "DigitalOcean / VPS — significantly lower cost and complexity than hyperscalers. The right choice for early-stage products, internal tools, and applications where the managed service ecosystem of AWS or GCP is not required. We run several production workloads on DigitalOcean that would cost three times more on AWS for equivalent performance.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "What a FlexiLogic Cloud DevOps Engagement Looks Like",
    },
    {
      type: "paragraph",
      text: "We work with clients in two modes. For greenfield projects, we design and implement the infrastructure and deployment pipeline from the start — so the first line of production code ships into a properly instrumented, automated, monitored environment. For existing products, we run a two-week infrastructure audit that produces a prioritised remediation roadmap, then work through it in a structured engagement.",
    },
    {
      type: "paragraph",
      text: "Every DevOps engagement we deliver includes full documentation and knowledge transfer. The goal is not to make clients dependent on us for infrastructure operations — it is to leave their team with the understanding and tooling to own their infrastructure confidently. We are available for ongoing support and retainer arrangements for teams that want a dedicated DevOps partner, but we never engineer that dependency intentionally.",
    },
    {
      type: "callout",
      emoji: "🚀",
      title: "Ready to fix your infrastructure?",
      text: "Whether you're starting from scratch or untangling a system that has grown faster than its foundations, the FlexiLogic cloud DevOps team can help. Get in touch to book a free 30-minute infrastructure review.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "The African tech ecosystem is producing world-class products. The infrastructure and operational discipline to match that product ambition is the next frontier. DevOps is not a luxury for well-funded teams in San Francisco — it is a competitive necessity for any startup that wants to scale reliably in one of the world's most dynamic and demanding markets.",
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
      slug: "eduverse-school-management-system-zimbabwe",
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