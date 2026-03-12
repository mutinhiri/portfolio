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
  slug: "why-african-startups-choose-flutter",
  category: "Engineering",
  categoryColor: "bg-[#7C9FFF]/15 text-[#7C9FFF]",
  title: "Why African Startups Are Choosing Flutter Over React Native in 2025",
  subtitle: "Performance on affordable Android hardware, a single codebase for two platforms, and offline-first capability built into the framework — Flutter solves the specific problems African mobile development faces better than any alternative available today.",
  date: "28 January 2025",
  readTime: "6 min read",
  author: {
    name: "FlexiLogic Team",
    role: "Engineering & Product",
    avatar: "FL",
  },
  coverEmoji: "📱",
  coverBg: "linear-gradient(135deg,#0d1b2a 0%,#1a2f4a 100%)",

  content: [
    {
      type: "paragraph",
      text: "When a Lagos-based healthtech startup approached us in mid-2024 to rebuild their patient-facing mobile app, they had an existing React Native codebase, a user base split 84% Android and 16% iOS, and a consistent complaint from their Android users: the app was slow. Not catastrophically slow — just the kind of sluggish that makes people sigh before opening it. On a Samsung Galaxy A-series device running Android 12, navigating between screens had a noticeable lag. Animations stuttered. The keyboard sometimes took two full seconds to appear after tapping a text field. None of these problems appeared on the iPhones the development team used for testing.",
    },
    {
      type: "paragraph",
      text: "We rebuilt the app in Flutter. The performance complaints stopped within the first week of the new version's release. The app felt native on the same mid-range Android hardware that had made the React Native version feel sluggish. App store rating moved from 3.2 to 4.4 stars over the following two months. This outcome was not surprising to us — it was the predictable result of choosing a framework whose architecture matches the realities of the African mobile market. This article explains why.",
    },
    { type: "divider" },
    {
      type: "heading",
      level: 2,
      text: "The African Mobile Market in 2025",
    },
    {
      type: "paragraph",
      text: "Building mobile apps for African markets means building for a specific and well-defined set of constraints that differ meaningfully from the assumptions baked into most Western mobile development tooling and tutorials. The median smartphone in active use across sub-Saharan Africa is a mid-range Android device — a Tecno Spark, a Samsung Galaxy A-series, an Infinix Hot — with 3–4GB of RAM, a mid-tier processor, and a screen resolution of 720p. iOS devices exist in the market but represent a minority of the user base, typically concentrated among higher-income urban users and expatriates.",
    },
    {
      type: "paragraph",
      text: "Network conditions are variable and often poor. Mobile data is the primary internet connection for most users, and while 4G coverage in major urban centres is solid, rural coverage is patchy and indoor coverage in concrete buildings is frequently degraded to 3G or EDGE. Data costs, while falling, remain a real constraint on user behaviour — large app downloads, heavy image loading, and frequent API calls all have a cost that users feel directly.",
    },
    {
      type: "callout",
      emoji: "📱",
      title: "Test on the right hardware",
      text: "One of the most common failure modes in African app development is a team that builds and tests on flagship devices — the latest iPhone, a Samsung Galaxy S-series — and ships to users on mid-range hardware. The performance gap between a flagship and a mid-range Android device is significant enough that an app that feels smooth on the former can feel broken on the latter. Flutter's architecture makes this gap smaller. Choosing the right test devices makes it visible before it ships.",
    },
    {
      type: "heading",
      level: 2,
      text: "What Flutter Is and Why the Architecture Matters",
    },
    {
      type: "paragraph",
      text: "Flutter is Google's open-source UI framework for building cross-platform applications from a single codebase. It uses the Dart programming language and, critically, does not use the host platform's native UI components. Instead, Flutter brings its own rendering engine — Impeller on modern devices, Skia on older ones — that draws every pixel of the UI directly to the screen. This architectural decision is the root cause of most of Flutter's performance advantages in the African market context.",
    },
    {
      type: "paragraph",
      text: "Most cross-platform frameworks — React Native, Xamarin, Ionic — work by rendering to native UI components, communicating between JavaScript and native code across a bridge. This bridge is a performance bottleneck. Every interaction that crosses the bridge — a scroll event, an animation frame, a gesture recognition result — incurs a serialisation and deserialisation cost. On high-end hardware with fast processors, this cost is imperceptible. On mid-range Android hardware with slower CPUs and less RAM, it accumulates into the jank and lag that African users of React Native apps frequently experience.",
    },
    {
      type: "heading",
      level: 2,
      text: "Performance on Mid-Range Android Hardware",
    },
    {
      type: "paragraph",
      text: "Flutter's rendering engine bypasses the JavaScript bridge entirely. Dart compiles to native ARM code — the same instruction set that native Android and iOS apps use. The UI rendering happens entirely within Flutter's own engine, targeting 60fps or 120fps depending on the device's display refresh rate, without ever crossing a language bridge. The result is consistent, smooth animation and interaction performance on the same mid-range Android hardware where bridge-based frameworks struggle.",
    },
    {
      type: "code",
      lang: "dart",
      text: `// Flutter's rendering pipeline — no JavaScript bridge
// Every frame is rendered directly by Flutter's engine

// Example: Smooth animated list — performs identically on
// a Tecno Spark and a Samsung Galaxy S24

class TransactionList extends StatelessWidget {
  final List<Transaction> transactions;
  const TransactionList({required this.transactions});

  @override
  Widget build(BuildContext context) {
    return AnimatedList(
      initialItemCount: transactions.length,
      itemBuilder: (context, index, animation) {
        return SlideTransition(
          // 60fps animation — no bridge overhead on mid-range hardware
          position: Tween<Offset>(
            begin: const Offset(1.0, 0.0),
            end: Offset.zero,
          ).animate(CurvedAnimation(
            parent: animation,
            curve: Curves.easeOutCubic,
          )),
          child: TransactionCard(
            transaction: transactions[index],
            // Dart compiled to ARM — direct GPU access, no JS overhead
          ),
        );
      },
    );
  }
}

// Contrast: React Native equivalent crosses the JS bridge
// on every animation frame — noticeable on 3GB RAM devices`,
    },
    {
      type: "paragraph",
      text: "In practical terms this means Flutter apps feel native on the devices African users actually own. Scrolling is smooth. Transitions are crisp. The keyboard appears immediately. Forms respond to input without delay. These are not subtle differences — they are the difference between an app users open willingly and one they open reluctantly.",
    },
    {
      type: "heading",
      level: 2,
      text: "One Codebase, Two Platforms",
    },
    {
      type: "paragraph",
      text: "Flutter's single-codebase model is not unique — React Native, Xamarin, and Ionic all promise the same. What distinguishes Flutter is how completely the promise is kept. Because Flutter renders its own UI rather than delegating to platform components, the same Dart code produces visually identical results on Android and iOS. There is no Android-specific styling to maintain, no iOS-specific layout fixes to apply, no platform-conditional code paths to test. A widget that looks and behaves correctly on Android looks and behaves correctly on iOS from the same source.",
    },
    {
      type: "paragraph",
      text: "For African startups where the user base is overwhelmingly Android but the founding team, investors, and enterprise clients use iPhones, this matters practically. The app needs to work excellently on both platforms. With Flutter, that requirement does not double the development cost — it adds a modest increment for platform-specific integrations like payment SDKs and notification handling, both of which Flutter's plugin ecosystem handles well.",
    },
    {
      type: "callout",
      emoji: "💰",
      title: "The real cost comparison",
      text: "A native Android + native iOS development engagement typically costs 1.8–2.2x the cost of a single-platform build. A Flutter engagement for both platforms typically costs 1.1–1.3x a single-platform build — because the codebase, the business logic, the state management, and the vast majority of the UI are shared. For early-stage African startups managing tight development budgets, that cost difference is meaningful.",
    },
    {
      type: "heading",
      level: 2,
      text: "Offline-First and Low-Bandwidth Optimisation",
    },
    {
      type: "paragraph",
      text: "Flutter does not make offline-first architecture automatic — but it makes it significantly easier than the alternatives. The Dart ecosystem includes mature, well-documented libraries for local data persistence (Hive, Isar, sqflite), connectivity monitoring, and background synchronisation that compose cleanly into offline-first architectures. The synchronous nature of Dart's object model and Flutter's widget rebuild system make it straightforward to design state management that reads from local storage first and updates from the network in the background.",
    },
    {
      type: "code",
      lang: "dart",
      text: `// Offline-first data layer using Hive (local NoSQL) + API sync
// Shows cached data instantly, syncs in background when connected

class StudentRepository {
  final Box<StudentModel> _localBox = Hive.box('students');
  final ApiService _api;

  StudentRepository(this._api);

  // Always returns immediately from local cache
  List<StudentModel> getStudents() => _localBox.values.toList();

  // Stream emits cached data first, then fresh data after sync
  Stream<List<StudentModel>> watchStudents() async* {
    // Emit cached data immediately — no network wait
    yield getStudents();

    // Attempt background sync if connected
    try {
      final connected = await Connectivity()
          .checkConnectivity() != ConnectivityResult.none;

      if (connected) {
        final fresh = await _api.fetchStudents();

        // Update local cache
        await _localBox.clear();
        await _localBox.addAll(fresh);

        // Emit updated data
        yield getStudents();
      }
    } catch (e) {
      // Network failure — cached data remains visible, no error shown
      debugPrint('Sync failed, showing cached data: $e');
    }
  }

  // Queue writes locally, sync when connected
  Future<void> updateAttendance(String studentId, bool present) async {
    final student = _localBox.get(studentId);
    if (student == null) return;

    // Write to local cache immediately
    await _localBox.put(studentId, student.copyWith(present: present));

    // Queue for server sync
    await SyncQueue.enqueue(SyncOperation(
      type: 'attendance_update',
      payload: {'studentId': studentId, 'present': present},
    ));
  }
}`,
    },
    {
      type: "paragraph",
      text: "For bandwidth optimisation, Flutter's image caching, asset bundling, and lazy loading patterns keep data consumption low without sacrificing visual quality. Flutter apps can be configured to serve lower-resolution images on slower connections, defer loading of non-critical assets until after the first frame renders, and compress API payloads efficiently. These are not Flutter-exclusive capabilities — but Flutter's architecture makes implementing them cleanly significantly more straightforward than in bridge-based frameworks.",
    },
    {
      type: "heading",
      level: 2,
      text: "Hot Reload and Development Velocity",
    },
    {
      type: "paragraph",
      text: "Flutter's hot reload is one of its most practically significant features for African startup development teams working under time and budget pressure. Hot reload injects updated Dart code into the running application in under a second, preserving the current application state — meaning a developer can change a colour, adjust a layout, or fix a logic error and see the result instantly without restarting the app or losing the UI state they were testing. Hot restart, which rebuilds the entire app state, takes two to three seconds rather than the thirty to sixty seconds a full build cycle requires.",
    },
    {
      type: "paragraph",
      text: "The compounding effect of fast iteration cycles on a startup development timeline is significant. A UI that would require twenty build-test-adjust cycles to refine in a native Android environment requires the same twenty cycles in Flutter — but completes them in minutes rather than hours. Across a twelve-week development engagement, this difference translates to meaningfully more iteration, more refined user experience, and more features shipped within the same budget envelope.",
    },
    {
      type: "heading",
      level: 2,
      text: "Flutter vs React Native: An Honest Comparison",
    },
    {
      type: "paragraph",
      text: "React Native is a mature, well-supported framework with a large ecosystem, a vast pool of JavaScript developers, and significant investment from Meta. It is not a bad choice for every context — but for the specific context of African market mobile development, Flutter has meaningful structural advantages. Here is an honest assessment of both.",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Performance on mid-range Android — Flutter wins clearly. Dart-to-ARM compilation with direct GPU rendering outperforms React Native's JavaScript bridge architecture on the hardware most African users own. This is the single most important differentiator for this market.",
        "Ecosystem and third-party libraries — React Native has a larger and more mature package ecosystem, particularly for integrations with US-centric services. Flutter's pub.dev ecosystem is growing rapidly and covers all the integrations relevant to African markets — EcoCash, mobile money SDKs, local maps, and authentication providers.",
        "Developer availability — React Native benefits from the enormous JavaScript developer pool. Flutter requires Dart, which has a smaller but rapidly growing developer community in Africa. At FlexiLogic, our Flutter team is fully staffed; we have not found developer availability to be a meaningful constraint.",
        "Web and desktop targets — Flutter compiles to web and desktop (Windows, macOS, Linux) from the same codebase, making it a stronger choice for products that need to span multiple platforms beyond mobile. React Native's web story (via React Native Web) is more complex and less complete.",
        "UI fidelity and consistency — Flutter's custom rendering engine delivers pixel-perfect consistency across Android and iOS. React Native's native component delegation means subtle platform differences require platform-specific code to resolve.",
        "Learning curve — Dart is a new language for most developers. The syntax is approachable for anyone with JavaScript, Java, or Kotlin experience, and most developers are productive within two to three weeks. This is a real but manageable onboarding cost.",
      ],
    },
    {
      type: "quote",
      text: "We evaluate the framework choice at the start of every mobile engagement based on the client's existing team, their target user's hardware, and their platform distribution. For most African market apps — especially those where Android performance and offline capability are requirements — we recommend Flutter. We have not had a client regret that recommendation.",
      author: "FlexiLogic Mobile Engineering Lead",
    },
    {
      type: "heading",
      level: 2,
      text: "When We Recommend React Native Instead",
    },
    {
      type: "paragraph",
      text: "Intellectual honesty requires acknowledging the cases where React Native remains the better choice. If a client's existing engineering team has deep React and JavaScript expertise and will own the app's ongoing development, introducing Dart creates a learning curve that may outweigh Flutter's performance advantages — particularly for internal tools and lower-stakes applications where performance is not critical. If a project requires deep integration with a third-party SDK that has mature React Native support but no Flutter plugin, the cost of building a custom Flutter plugin may not be justified. And if a product already has a significant React Native codebase with a working feature set, the ROI of a full Flutter rewrite must be weighed against the cost of incremental React Native improvements.",
    },
    {
      type: "heading",
      level: 2,
      text: "What We Build with Flutter at FlexiLogic",
    },
    {
      type: "paragraph",
      text: "Flutter is our primary mobile framework for all new client engagements where the recommendation is appropriate. Our Flutter practice covers consumer-facing apps for fintech, healthcare, e-commerce, and edtech clients across African markets — applications where performance on mid-range Android hardware, offline capability, and EcoCash payment integration are standard requirements. We also build internal operations apps in Flutter for logistics teams, field workers, and school staff — use cases where the app needs to function in areas with poor connectivity and on devices that may be several years old.",
    },
    {
      type: "paragraph",
      text: "Our standard Flutter stack pairs the framework with a Node.js or Django REST API backend, PostgreSQL or Firebase for data persistence depending on the project's real-time requirements, and Hive or sqflite for local offline storage. State management uses Riverpod for its compile-time safety and testability. CI/CD pipelines automate builds and deployments to both Google Play and the App Store from a single GitHub Actions workflow — meaning a code merge to the main branch triggers automated testing and a new build to both stores without any manual intervention.",
    },
    {
      type: "callout",
      emoji: "🐦",
      title: "Building a Flutter app for the African market?",
      text: "Whether you are starting from scratch, evaluating a migration from React Native, or looking for a Flutter engineering partner with deep experience building for African market constraints, the FlexiLogic mobile team would be glad to talk. Get in touch to book a free technical scoping call.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "Framework choices are not permanent — but they are consequential. A mobile app built on the wrong foundation for its target market will accumulate performance debt, user experience debt, and maintenance debt that compounds over time. Flutter's architecture aligns with the realities of African mobile development — the hardware, the connectivity, the platform distribution — in a way that makes it the right default choice for teams building mobile products for this market. The startups choosing Flutter now are shipping faster, performing better on the hardware their users own, and doing it at a lower cost than the native development alternative. That combination is hard to argue with.",
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
      slug: "zero-downtime-deployments-node",
      category: "DevOps",
      categoryColor: "bg-[#C8922A]/15 text-[#C8922A]",
      title: "Zero-Downtime Deployments on a Budget: Our Node.js Playbook",
      date: "10 Jan 2025",
      readTime: "5 min read",
      cover: "☁️",
      coverBg: "linear-gradient(135deg,#0a1628 0%,#0d2137 100%)",
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