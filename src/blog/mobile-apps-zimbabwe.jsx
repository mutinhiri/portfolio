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
  slug: "mobile-app-development-africa-2025",
  category: "Mobile",
  categoryColor: "bg-[#38BDF8]/15 text-[#38BDF8]",
  title: "Mobile App Development in Africa: Why Your Next Customer Will Find You on a Phone — or Not at All",
  subtitle: "Africa is the world's most mobile-first continent. Businesses that meet their customers on the device they actually use are winning. Those waiting to 'do the website first' are ceding ground they will not easily recover.",
  date: "13 March 2025",
  readTime: "11 min read",
  author: {
    name: "FlexiLogic Team",
    role: "Engineering & Product",
    avatar: "FL",
  },
  coverEmoji: "📱",
  coverBg: "linear-gradient(135deg,#0a1520 0%,#0d1f35 100%)",

  content: [
    {
      type: "paragraph",
      text: "In 2024, a Zimbabwean microfinance institution launched a mobile loan application feature. Within 90 days, 67% of all new loan applications were coming through the app — not the branch, not the website, not the USSD menu. A school network rolled out a parent-facing mobile app showing attendance, marks, and fee balances in real time. Parent engagement with fee payment reminders went from a 22% response rate on SMS to 71% on in-app push notifications. A courier company gave their drivers a delivery management app with offline support. On-time delivery rates improved by 28% in the first term simply because drivers stopped relying on WhatsApp voice notes to receive and confirm delivery instructions.",
    },
    {
      type: "paragraph",
      text: "These are not outliers. They are the predictable result of meeting African users where they already are — on their phones. This article makes the case for mobile-first product strategy in the African market, explains the technology choices that make the difference between a mobile app that gets used and one that gets uninstalled, and details what FlexiLogic builds for clients across every sector.",
    },
    { type: "divider" },
    {
      type: "heading",
      level: 2,
      text: "Africa Is Not Going Mobile-First — It Already Is",
    },
    {
      type: "paragraph",
      text: "Mobile internet penetration across sub-Saharan Africa has crossed 50% and is growing faster than any other region in the world. In Zimbabwe, smartphone ownership has expanded dramatically across income brackets over the past five years, driven by the availability of affordable Android handsets and competitive mobile data pricing. The overwhelming majority of internet activity — browsing, banking, shopping, communicating, consuming content — happens on a mobile device. Desktop and laptop computing remains a workplace tool for a minority of the population. For most Zimbabweans, the phone is not a secondary screen. It is the primary and often only screen.",
    },
    {
      type: "callout",
      emoji: "📱",
      title: "The mobile reality in Zimbabwe",
      text: "When you build a digital product for the Zimbabwean market, you are building for a user who is on a mid-range Android device, on a mobile data connection that varies between 3G and 4G depending on their location, with limited storage space on their device, and high sensitivity to data costs. Every product decision — from app size to image compression to offline capability — needs to be made with that user in mind, not a broadband-connected desktop user in a Sandton office.",
    },
    {
      type: "paragraph",
      text: "The business implication is straightforward but still underappreciated by many Zimbabwean organisations: a product that is not excellent on mobile is not excellent. A website that is technically mobile-responsive but was designed for desktop is not a mobile product. A process that requires a customer to visit a branch because the digital channel does not work well on a phone will increasingly lose customers to a competitor who solved that problem. Mobile is not a feature. It is the default.",
    },
    {
      type: "heading",
      level: 2,
      text: "Choosing the Right Technology: Flutter, React Native, and PWAs",
    },
    {
      type: "paragraph",
      text: "The most consequential early decision in a mobile app project is the technology choice — and it is one where bad advice is common and the consequences of getting it wrong are expensive. Building separate native apps for iOS and Android doubles your development cost and ongoing maintenance burden. Building a cross-platform app with the wrong framework produces an app that feels clunky on both platforms. Building a Progressive Web App when you actually need native device capabilities produces a product that cannot do what the business requires.",
    },
    {
      type: "heading",
      level: 3,
      text: "Flutter: Our Primary Recommendation for African Market Apps",
    },
    {
      type: "paragraph",
      text: "Flutter is Google's cross-platform UI framework that compiles to native ARM code for both Android and iOS from a single Dart codebase. It is our primary recommendation for African market mobile apps for three reasons specific to this context. First, Flutter produces a single codebase that runs on Android and iOS with near-identical performance and visual fidelity — critical when your user base is overwhelmingly Android but your client's leadership team uses iPhones. Second, Flutter apps compile to native code rather than running in a JavaScript bridge, which means they perform well on mid-range Android hardware where JavaScript-heavy apps struggle. Third, Flutter's widget system gives precise control over UI rendering, which matters when you need to optimise for small screens and variable display densities.",
    },
    {
      type: "code",
      lang: "dart",
      text: `// Example: Flutter widget for an offline-capable fee payment status screen
// Shows cached data immediately, syncs in background when connected

class FeeStatusScreen extends StatefulWidget {
  final String studentId;
  const FeeStatusScreen({required this.studentId});

  @override
  State<FeeStatusScreen> createState() => _FeeStatusScreenState();
}

class _FeeStatusScreenState extends State<FeeStatusScreen> {
  FeeData? _cachedData;
  bool _isSyncing = false;

  @override
  void initState() {
    super.initState();
    _loadCachedData();
    _syncIfConnected();
  }

  Future<void> _loadCachedData() async {
    // Load from local SQLite cache immediately — no waiting for network
    final cached = await LocalDb.getFeeData(widget.studentId);
    setState(() => _cachedData = cached);
  }

  Future<void> _syncIfConnected() async {
    final connected = await ConnectivityService.isOnline();
    if (!connected) return;

    setState(() => _isSyncing = true);
    try {
      final fresh = await ApiService.fetchFeeData(widget.studentId);
      await LocalDb.saveFeeData(fresh);          // Update cache
      setState(() { _cachedData = fresh; _isSyncing = false; });
    } catch (e) {
      setState(() => _isSyncing = false);        // Show cached data on error
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_cachedData == null) return const LoadingSpinner();

    return Column(
      children: [
        if (_isSyncing) const SyncingBanner(),   // Subtle "updating..." indicator
        FeeBalanceCard(data: _cachedData!),
        PaymentHistoryList(payments: _cachedData!.payments),
      ],
    );
  }
}`,
    },
    {
      type: "heading",
      level: 3,
      text: "React Native: When the Team Already Knows JavaScript",
    },
    {
      type: "paragraph",
      text: "React Native remains a strong choice for teams with existing JavaScript and React expertise, or for projects that need to share significant business logic with a React web application. The ecosystem is mature, the community is large, and the performance gap with Flutter has narrowed considerably since the New Architecture rollout. We use React Native when a client's existing engineering team is JavaScript-native and will own the app's ongoing development — the learning curve of introducing a new language (Dart) is not justified when the team already has the skills to move quickly in React Native.",
    },
    {
      type: "heading",
      level: 3,
      text: "Progressive Web Apps: The Right Tool for the Right Job",
    },
    {
      type: "paragraph",
      text: "A Progressive Web App (PWA) is a web application built with modern browser APIs that give it app-like capabilities: it can be installed to the home screen, work offline, send push notifications, and load instantly on repeat visits. PWAs are not a compromise between a website and a native app — they are the right choice for specific use cases. Internal tools and dashboards that staff access on known devices. Lightweight customer-facing applications where the friction of an app store download would reduce adoption. Applications where the content is primarily informational and the native device capabilities (camera, GPS, biometrics) are not required.",
    },
    {
      type: "paragraph",
      text: "The key limitation of PWAs in the African context is iOS support — Apple's Safari browser has historically lagged behind Chrome in implementing PWA capabilities, and iOS users cannot receive push notifications from PWAs with the same reliability as Android users. For applications where push notification delivery is critical — fee payment reminders, attendance alerts, delivery updates — a native or cross-platform app is the more reliable choice.",
    },
    {
      type: "heading",
      level: 2,
      text: "Offline Support: Non-Negotiable for the African Market",
    },
    {
      type: "paragraph",
      text: "Offline capability is the single most important technical consideration for mobile apps targeting African users — and the one most commonly omitted by development teams following tutorials written for broadband-connected markets. A mobile app that requires a live network connection to display any content is a mobile app that stops working in a taxi, in a suburb with poor coverage, in a building with thick walls, or anywhere outside a major urban centre. In Zimbabwe, that describes a significant proportion of a user's daily life.",
    },
    {
      type: "paragraph",
      text: "Every mobile app we build implements an offline-first architecture: data is fetched from the server and stored in a local database on the device. The app reads from the local database first and displays content immediately, then syncs with the server in the background when a connection is available. Write operations — submitting a form, recording a transaction, marking attendance — are queued locally and synced when connectivity is restored. The user experience is fast and functional regardless of network state, with clear indicators when data may be stale or when a sync is in progress.",
    },
    {
      type: "callout",
      emoji: "📶",
      title: "Offline-first is a feature, not an edge case",
      text: "In Western app development, offline support is often treated as an edge case for occasional underground commuters. In the African market, intermittent connectivity is a daily reality for a majority of users. Apps built offline-first are not just more robust — they feel fundamentally faster and more reliable than online-dependent apps, because they never make the user wait for a network round-trip to display content they have already loaded.",
    },
    {
      type: "heading",
      level: 2,
      text: "Push Notifications: The Highest-ROI Mobile Feature",
    },
    {
      type: "paragraph",
      text: "Push notifications are the most direct communication channel a business has with its mobile app users — more immediate than email, more reliable than SMS for smartphone users, and free to send at any volume. The organisations using push notifications well are seeing dramatic improvements in the metrics that matter: fee collection rates, appointment attendance, delivery confirmation rates, and re-engagement of users who have not opened the app recently.",
    },
    {
      type: "paragraph",
      text: "The difference between push notifications that drive action and push notifications that get disabled within a week comes down to relevance and timing. A notification that tells a parent their child was marked absent today at 10am is immediately actionable and highly valued. A notification that says 'Check out what's new in the app!' is noise that trains users to ignore everything that follows. We implement notification systems with full segmentation and personalisation — the right message to the right user at the right moment — and include analytics that track open rates and conversion by notification type so the strategy can be continuously improved.",
    },
    {
      type: "heading",
      level: 2,
      text: "App Store Deployment and Optimisation",
    },
    {
      type: "paragraph",
      text: "Getting an app built is only half the job. Getting it into users' hands requires navigating the Google Play Store and Apple App Store submission processes, passing review requirements that catch many first-time submitters by surprise, and then optimising the app's store listing to convert browsers into installers. App Store Optimisation (ASO) — the mobile equivalent of SEO — determines whether your app appears when users search for the problem it solves, and whether the listing converts those searches into downloads.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Google Play and Apple App Store submission — handling the full submission process including developer account setup, app signing, privacy policy requirements, content rating, and review response if issues arise",
        "Store listing optimisation — keyword research for app store search, compelling short and long descriptions, screenshot design that communicates the app's value in the first three seconds, and app icon design optimised for both stores",
        "Release management — staged rollouts that limit exposure of new versions to a percentage of users before full deployment, reducing the blast radius of any post-release issues",
        "Update strategy — planning and executing regular update cycles that keep the app performing well on new OS versions and take advantage of new platform capabilities as they become available",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Sector by Sector: What Mobile Unlocks",
    },
    {
      type: "heading",
      level: 3,
      text: "Fintech and Mobile Money",
    },
    {
      type: "paragraph",
      text: "Mobile is not just a channel for fintech in Africa — it is the primary product surface. Loan applications, account management, transaction history, payment initiation, and customer support all belong in a well-designed mobile app for a Zimbabwean fintech. The specific capabilities that differentiate winning fintech apps in this market are biometric authentication (fingerprint and face ID for fast, secure login), EcoCash and InnBucks integration for seamless payment initiation, and push notifications for transaction confirmations and payment reminders that drive repayment rates.",
    },
    {
      type: "heading",
      level: 3,
      text: "Healthcare and Clinics",
    },
    {
      type: "paragraph",
      text: "Healthcare mobile apps in the Zimbabwean context deliver the most value in three areas: patient-facing appointment and record access, field health worker support tools, and clinic operational management. A patient app that shows appointment history, medication reminders, and basic health records reduces no-shows and improves treatment adherence. A field worker app with offline capability for data collection in rural areas — community health surveys, vaccination records, referral documentation — eliminates the paper-based data pipeline that loses and delays critical health information.",
    },
    {
      type: "heading",
      level: 3,
      text: "Schools and EdTech",
    },
    {
      type: "paragraph",
      text: "The parent-facing school app is one of the highest-engagement mobile products in the education sector. Parents check their children's attendance, marks, homework deadlines, and fee balances daily when the information is available on their phone — engagement levels that no weekly newsletter or termly report can come close to matching. For EdTech platforms, mobile-first delivery of learning content with offline support enables genuine reach into areas where home internet connectivity is limited but smartphone ownership is growing.",
    },
    {
      type: "heading",
      level: 3,
      text: "E-Commerce and Retail",
    },
    {
      type: "paragraph",
      text: "Zimbabwean e-commerce is mobile commerce. Shopping apps optimised for mid-range Android hardware, with fast image loading, frictionless checkout, and mobile money payment integration, outperform desktop-first e-commerce experiences in this market by significant margins. The specific features that drive conversion on African e-commerce apps are lightweight product images that load quickly on mobile data, WhatsApp integration for customer service, EcoCash and card payment options at checkout, and order tracking push notifications that reduce customer anxiety and support queries.",
    },
    {
      type: "heading",
      level: 3,
      text: "Logistics and Delivery",
    },
    {
      type: "paragraph",
      text: "Logistics operations run on mobile. Driver apps with offline-capable route management, delivery confirmation with photo capture, digital proof of delivery, and real-time status updates to customers transform the operational efficiency of a courier or logistics business. Customer-facing tracking apps that provide live delivery status reduce inbound customer service queries dramatically — customers stop calling to ask where their delivery is when the app tells them proactively. We have built logistics apps for Zimbabwean courier operations that eliminated an estimated 60% of customer service call volume within the first two months of launch.",
    },
    {
      type: "heading",
      level: 3,
      text: "Government and NGOs",
    },
    {
      type: "paragraph",
      text: "Government citizen service apps and NGO field operations apps represent two distinct but equally high-value mobile use cases. Citizen service apps — for permit applications, service requests, payment of fees and levies, and access to public information — reduce queue lengths, improve service accessibility in rural areas, and generate the digital transaction records that enable better service planning. NGO field apps for beneficiary registration, programme monitoring, and data collection replace paper-based processes that are slow, error-prone, and expensive to aggregate into reports.",
    },
    {
      type: "heading",
      level: 3,
      text: "General SMEs",
    },
    {
      type: "paragraph",
      text: "For SMEs, the mobile opportunity often sits on the internal operations side as much as the customer-facing side. A field sales app that lets representatives capture orders, check stock levels, and issue quotes on a phone eliminates the order-taking lag that costs sales. A staff management app for clock-in, task assignment, and performance tracking brings operational visibility to a business owner who cannot be physically present at every location. A customer loyalty app that tracks purchases and issues rewards drives repeat business in markets where loyalty programmes have historically required expensive card infrastructure.",
    },
    {
      type: "heading",
      level: 2,
      text: "What Makes a Mobile App Succeed in the African Market",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Small app size. Every megabyte of app size costs your users real money in download data costs and real storage on devices that may have 16–32GB total. We optimise aggressively — code splitting, asset compression, lazy loading — to keep apps under 20MB where possible.",
        "Fast first load. Users in low-connectivity environments abandon apps that take more than three seconds to show useful content. Offline-first architecture with local caching is the solution, not faster servers.",
        "Localised payment integration. An app that does not support EcoCash, InnBucks, or the payment methods your users actually have is an app with a broken checkout. Payment integration is not an afterthought.",
        "Accessible design. Mid-range Android screens vary significantly in size, resolution, and colour accuracy. UI design that works at 720p on a 5.5-inch screen is not the same as a design built for a high-resolution flagship. We test on representative hardware, not just the latest iPhone.",
        "Respectful notification design. Push notification permission is a privilege users grant and revoke. Notification strategies that prioritise relevance over volume build long-term engagement. Notification strategies that optimise for frequency build uninstall rates.",
        "Graceful error handling. Network errors, payment failures, and server timeouts will happen. Apps that show a clear, friendly error message and offer a recovery path retain users. Apps that show a blank screen or a raw error code lose them.",
      ],
    },
    {
      type: "quote",
      text: "The apps that win in the African market are not the most feature-rich — they are the fastest, the most reliable in poor connectivity, and the most respectful of the data and storage constraints of the devices their users actually own.",
      author: "FlexiLogic Mobile Engineering Team",
    },
    {
      type: "heading",
      level: 2,
      text: "How a FlexiLogic Mobile Engagement Works",
    },
    {
      type: "paragraph",
      text: "We run mobile app engagements in three stages. The first is a one-week discovery and scoping session where we define the app's core user journeys, agree on the technology choice (Flutter, React Native, or PWA), map the backend integrations required, and produce a detailed specification and timeline. This stage eliminates the scope creep and requirement misunderstandings that derail most app projects before a line of code is written.",
    },
    {
      type: "paragraph",
      text: "The build stage proceeds in two-week sprints with a working, testable build delivered at the end of every sprint. We use TestFlight for iOS beta distribution and Google Play Internal Testing for Android, so clients are testing on real devices throughout the build — not seeing the app for the first time at launch. UI/UX design, development, and QA run in parallel rather than sequentially, which compresses the timeline without compressing quality.",
    },
    {
      type: "paragraph",
      text: "The launch stage covers app store submission, release management, and a 30-day post-launch support period during which we monitor crash rates, performance metrics, and user feedback and address any issues that emerge in the wild. After the support period, clients can transition to a maintenance retainer for ongoing updates, feature additions, and OS compatibility work as Android and iOS release new versions.",
    },
    {
      type: "callout",
      emoji: "🚀",
      title: "Ready to build your mobile app?",
      text: "Whether you are starting from scratch or rebuilding a mobile experience that is not performing, FlexiLogic delivers mobile apps built specifically for the African market — fast, offline-capable, and designed for the devices your users actually own. Get in touch to book a free scoping call.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "The window for mobile-first competitive advantage in Zimbabwe and across Africa is not closing — but it is narrowing. The organisations that have already built excellent mobile experiences are compounding their user base, their data, and their brand equity with every passing month. The cost of building a great mobile app has never been lower. The cost of not having one has never been higher.",
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
      slug: "data-analytics-africa-turning-data-into-decisions",
      category: "Data & Analytics",
      categoryColor: "bg-[#34D399]/15 text-[#34D399]",
      title: "Data Analytics in Africa: Why Most Businesses Are Sitting on a Gold Mine They Cannot Read",
      date: "13 Mar 2025",
      readTime: "12 min read",
      cover: "📊",
      coverBg: "linear-gradient(135deg,#0a1a12 0%,#0d2b1a 100%)",
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