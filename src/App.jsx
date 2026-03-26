import React, { useMemo, useState } from "react";

const ICONS = {
  spark: [
    "M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2z",
    "M19 16l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9.9-2.4z",
  ],
  shield: [
    "M12 3l7 3v5c0 4.8-2.8 8.3-7 10-4.2-1.7-7-5.2-7-10V6l7-3z",
    "M9.7 12.1l1.6 1.6 3.2-3.4",
  ],
  chart: ["M4 20h16", "M7 16V11", "M12 16V7", "M17 16V9"],
  network: [
    "M7 8h10",
    "M7 16h10",
    "M12 8v8",
    "M5 6a2 2 0 110 4 2 2 0 010-4z",
    "M17 6a2 2 0 110 4 2 2 0 010-4z",
    "M5 14a2 2 0 110 4 2 2 0 010-4z",
    "M17 14a2 2 0 110 4 2 2 0 010-4z",
  ],
  layers: ["M12 4l8 4-8 4-8-4 8-4z", "M4 12l8 4 8-4", "M4 16l8 4 8-4"],
  message: ["M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H9l-4 3v-3H5a2 2 0 01-2-2V8a2 2 0 012-2z"],
  shopping: [
    "M6 7h15l-1.4 8.2a2 2 0 01-2 1.8H9.2a2 2 0 01-2-1.6L5.5 4H3",
    "M10 21a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z",
    "M18 21a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z",
  ],
  target: [
    "M12 3a9 9 0 100 18 9 9 0 000-18z",
    "M12 7a5 5 0 100 10 5 5 0 000-10z",
    "M12 10.4a1.6 1.6 0 110 3.2 1.6 1.6 0 010-3.2z",
  ],
  clock: ["M12 3a9 9 0 100 18 9 9 0 000-18z", "M12 7v5l3 2"],
  alert: ["M12 3l9 16H3l9-16z", "M12 9v4", "M12 16h.01"],
  check: ["M5 12l4 4L19 7"],
  grid: ["M4 4h7v7H4z", "M13 4h7v7h-7z", "M4 13h7v7H4z", "M13 13h7v7h-7z"],
};

function Icon({ name, className = "h-5 w-5" }) {
  const paths = ICONS[name] || ICONS.spark;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

const NEXT_MODE = { en: "zh", zh: "sync", sync: "en" };

function inline(mode, en, zh) {
  if (mode === "en") return en;
  if (mode === "zh") return zh;
  return `${en} · ${zh}`;
}

function Copy({ mode, en, zh, as = "p", className = "", zhClassName = "" }) {
  const Tag = as;
  if (mode === "en") return <Tag className={className}>{en}</Tag>;
  if (mode === "zh") return <Tag className={className}>{zh}</Tag>;
  return (
    <div className="space-y-2">
      <Tag className={className}>{en}</Tag>
      <Tag className={zhClassName || `${className} text-stone-600`}>{zh}</Tag>
    </div>
  );
}

function Pill({ children, className = "" }) {
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${className}`}>{children}</span>;
}

function SectionTitle({ mode, id, kickerEn, kickerZh, titleEn, titleZh, bodyEn, bodyZh }) {
  return (
    <div id={id} className="space-y-3 scroll-mt-32">
      <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
        <Icon name="spark" className="h-3.5 w-3.5" />
        {inline(mode, kickerEn, kickerZh)}
      </div>
      <Copy
        mode={mode}
        as="h2"
        en={titleEn}
        zh={titleZh}
        className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl"
      />
      <Copy mode={mode} en={bodyEn} zh={bodyZh} className="max-w-3xl text-sm leading-7 text-stone-700 sm:text-[15px]" />
    </div>
  );
}

function StatCard({ mode, icon, value, labelEn, labelZh, noteEn, noteZh }) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-[0_8px_24px_rgba(120,98,58,0.06)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-2xl bg-stone-100 p-2 text-stone-700"><Icon name={icon} className="h-5 w-5" /></div>
        <div className="text-2xl font-semibold tracking-tight text-stone-900">{value}</div>
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium text-stone-900">{inline(mode, labelEn, labelZh)}</div>
        <div className="text-xs leading-6 text-stone-600">{inline(mode, noteEn, noteZh)}</div>
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_8px_24px_rgba(120,98,58,0.06)] ${className}`}>{children}</div>;
}

function Nav({ mode }) {
  const items = [
    ["overview", "Overview", "總覽"],
    ["newness", "What is actually new", "真正新的地方"],
    ["pilot", "Pilot anatomy", "試點結構"],
    ["timeline", "Timeline", "時間線"],
    ["framework", "Course framework", "課程框架"],
    ["capture", "Value capture", "價值捕捉"],
    ["unknowns", "Unknowns", "未知與限制"],
    ["classuse", "Class use", "課堂使用"],
    ["sources", "Source stack", "來源堆疊"],
  ];
  return (
    <div className="border-b border-stone-200 bg-[#FCFAF2]/90 backdrop-blur">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-max gap-2">
          {items.map(([id, en, zh]) => (
            <a key={id} href={`#${id}`} className="rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs text-stone-700 transition hover:border-stone-400 hover:text-stone-900">
              {inline(mode, en, zh)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function StickyStrip({ mode }) {
  const items = [
    {
      enTitle: "Current thesis",
      zhTitle: "目前主論點",
      enBody: "Target matters because discovery, comparison, and ad exposure are starting to happen inside the same AI conversation.",
      zhBody: "Target 之所以重要，是因為商品探索、比較與廣告接觸，開始在同一段 AI 對話內同時發生。",
    },
    {
      enTitle: "Key numbers",
      zhTitle: "關鍵數字",
      enBody: "40% monthly traffic growth from ChatGPT to Target. Roundel works with 2,000+ vendors and generates nearly $2B of value.",
      zhBody: "從 ChatGPT 導向 Target 的流量平均每月成長 40%。Roundel 合作 vendor 超過 2,000 家，創造近 20 億美元價值。",
    },
    {
      enTitle: "Safest oral position",
      zhTitle: "最穩的口頭立場",
      enBody: "This is still an early discovery channel and learning system, not yet a mature lower-funnel performance engine.",
      zhBody: "這仍然是早期的探索通路與學習系統，還不是成熟的下層漏斗績效引擎。",
    },
  ];
  return (
    <div className="sticky top-0 z-30 border-y border-stone-200 bg-[#FCFAF2]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        {items.map((item) => (
          <div key={item.enTitle} className="min-w-[290px] rounded-2xl border border-stone-200 bg-white/90 px-4 py-3 shadow-sm">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">{inline(mode, item.enTitle, item.zhTitle)}</div>
            <div className="text-sm leading-6 text-stone-700">{inline(mode, item.enBody, item.zhBody)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingModeButton({ mode, setMode }) {
  return (
    <button
      onClick={() => setMode(NEXT_MODE[mode])}
      className="fixed bottom-4 right-4 z-50 rounded-full border border-stone-300 bg-white/92 px-3 py-2 text-[11px] font-semibold tracking-[0.16em] text-stone-700 shadow-lg backdrop-blur transition hover:border-stone-400 hover:text-stone-900"
      aria-label="Switch language mode"
    >
      {mode === "en" ? "EN" : mode === "zh" ? "中" : "EN+中"}
    </button>
  );
}

export default function TargetInChatGPTInfrastructure() {
  const [mode, setMode] = useState("en");

  const stats = useMemo(() => [
    {
      icon: "chart",
      value: "40%",
      labelEn: "Average monthly traffic growth",
      labelZh: "平均每月流量成長",
      noteEn: "Target says traffic from ChatGPT to Target.com has been growing about 40% each month.",
      noteZh: "Target 表示，從 ChatGPT 導向 Target.com 的流量平均每月約成長 40%。",
    },
    {
      icon: "network",
      value: "2,000+",
      labelEn: "Roundel vendors",
      labelZh: "Roundel 合作 vendors",
      noteEn: "Roundel already works with more than 2,000 vendors across owned and off-platform media.",
      noteZh: "Roundel 已經在自有與站外媒體上服務超過 2,000 家 vendors。",
    },
    {
      icon: "target",
      value: "~$2B",
      labelEn: "Roundel annual value",
      labelZh: "Roundel 年度價值",
      noteEn: "Target says Roundel now generates nearly $2 billion of value for the company.",
      noteZh: "Target 表示，Roundel 現已為公司創造近 20 億美元價值。",
    },
    {
      icon: "shield",
      value: "Pilot",
      labelEn: "Trust-first operating rules",
      labelZh: "以信任為先的運作規則",
      noteEn: "Ads are labeled, visually separate, and not supposed to shape the answer itself.",
      noteZh: "廣告會清楚標示、與答案分離，而且不應影響回答內容。",
    },
  ], []);

  const timeline = [
    {
      date: "Nov 2025",
      titleEn: "Target app launches in ChatGPT",
      titleZh: "Target app 進入 ChatGPT",
      bodyEn: "Target positions ChatGPT as a curated shopping surface, not just a search referral source.",
      bodyZh: "Target 把 ChatGPT 視為可策展的購物介面，而不只是搜尋導流來源。",
    },
    {
      date: "Jan 2026",
      titleEn: "UCP enters the picture",
      titleZh: "UCP 協定層進場",
      bodyEn: "Google introduces Universal Commerce Protocol with Target among collaborators, signaling broader agentic commerce standardization.",
      bodyZh: "Google 推出 Universal Commerce Protocol，Target 為共同協作者之一，代表更廣義的 agentic commerce 標準化正在形成。",
    },
    {
      date: "Feb 2026",
      titleEn: "Contextual ad pilot starts",
      titleZh: "情境式廣告試點開始",
      bodyEn: "Target and Roundel begin testing clearly labeled ads inside ChatGPT shopping conversations.",
      bodyZh: "Target 與 Roundel 開始在 ChatGPT 的購物對話中測試清楚標示的廣告。",
    },
    {
      date: "Mar 2026",
      titleEn: "Richer product discovery arrives",
      titleZh: "更完整的商品探索上線",
      bodyEn: "OpenAI upgrades ChatGPT shopping with richer visuals, side-by-side comparison, and stronger product discovery flows.",
      bodyZh: "OpenAI 強化 ChatGPT 購物體驗，加入更完整的視覺呈現、並排比較與更強的商品探索流程。",
    },
  ];

  const sources = [
    ["Marketing Dive", "Feb 11, 2026", "Article that surfaced the ad pilot and framed Roundel as a bridge into AI advertising.", "揭露廣告試點，並把 Roundel 定位為 AI 廣告橋樑的新聞來源。"],
    ["Target fact sheet", "Feb 9, 2026", "Official description of how the test works, including keyword-triggered ads and 40% traffic growth.", "官方說明測試如何運作，包括關鍵字觸發與 40% 流量成長。"],
    ["OpenAI ad notes", "Feb 9, 2026", "Official operating rules on answer independence, privacy, aggregate reporting, and sensitive-topic exclusions.", "官方說明答案獨立、隱私、彙總成效回報與敏感主題排除。"],
    ["Target in ChatGPT release", "Nov 19, 2025", "Shows that Target had already moved from referral logic toward in-chat shopping.", "顯示 Target 先前就已從導流邏輯走向聊天內購物。"],
    ["OpenAI shopping update", "Mar 24, 2026", "Shows the product layer is expanding toward richer AI-native shopping.", "顯示產品層正在擴張到更完整的 AI 原生購物體驗。"],
    ["Google UCP", "Jan 11, 2026", "Adds the protocol layer and expands the case beyond one platform or one ad format.", "補進協定層脈絡，使案例意義超過單一平臺或單一廣告格式。"],
  ];

  return (
    <div className="min-h-screen bg-[#FCFAF2] text-stone-900 selection:bg-stone-200">
      <FloatingModeButton mode={mode} setMode={setMode} />

      <header className="border-b border-stone-200 bg-[radial-gradient(circle_at_top,_rgba(191,181,152,0.18),_transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(252,250,242,0.88))]">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pb-14 lg:pt-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Pill className="border-stone-300 bg-white text-stone-700">Marketing Dive · Feb 11, 2026</Pill>
                <Pill className="border-stone-300 bg-white text-stone-700">Target · Feb 9, 2026</Pill>
                <Pill className="border-stone-300 bg-white text-stone-700">OpenAI · Feb 9 and Mar 24, 2026</Pill>
              </div>

              <div className="space-y-4">
                <Copy mode={mode} as="div" en="Case brief" zh="案例重點" className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500" />
                <Copy
                  mode={mode}
                  as="h1"
                  en="Target in ChatGPT"
                  zh="Target in ChatGPT"
                  className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl"
                />
                <Copy
                  mode={mode}
                  en="An early look at how conversational AI may reshape discovery, retail media, and shopping behavior."
                  zh="一個提早觀察對話式 AI 如何改變商品探索、零售媒體與購物行為的案例。"
                  className="max-w-3xl text-sm leading-7 text-stone-700 sm:text-[15px]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Pill className="border-stone-300 bg-[#F1EBDD] text-stone-800">{inline(mode, "Conversation as channel", "對話即通路")}</Pill>
                <Pill className="border-stone-300 bg-[#F7F1E6] text-stone-800">{inline(mode, "Retail media bridge", "零售媒體橋樑")}</Pill>
                <Pill className="border-stone-300 bg-[#F4EFE5] text-stone-800">{inline(mode, "Trust and governance", "信任與治理")}</Pill>
                <Pill className="border-stone-300 bg-[#EFE9DC] text-stone-800">{inline(mode, "Agentic commerce path", "agentic commerce 路徑")}</Pill>
              </div>
            </div>

            <Card>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{inline(mode, "At a glance", "速覽")}</div>
                  <div className="mt-1 text-lg font-semibold text-stone-900">{inline(mode, "Why this case is bigger than it looks", "為何這個案例比表面更大")}</div>
                </div>
                <div className="rounded-2xl bg-stone-100 p-3 text-stone-700"><Icon name="layers" className="h-6 w-6" /></div>
              </div>
              <div className="space-y-4 text-sm leading-7 text-stone-700">
                <div className="rounded-2xl bg-stone-50 px-4 py-3">{inline(mode, "This is not just ads entering AI. It is product discovery moving into the AI conversation itself.", "這不只是廣告進入 AI，而是商品探索本身正在移入 AI 對話。")}</div>
                <div className="rounded-2xl bg-stone-50 px-4 py-3">{inline(mode, "Target is not entering alone. It is bringing Roundel, which gives the case channel scale beyond one retailer’s own brand.", "Target 不是單獨進場，而是把 Roundel 一起帶進來，使此案例的通路規模超過單一零售商品牌自身。")}</div>
                <div className="rounded-2xl bg-stone-50 px-4 py-3">{inline(mode, "The correct frame is not only media placement. It is the emerging architecture of conversational commerce.", "正確的框架不只是一個媒體版位，而是正在形成中的對話式商務架構。")}</div>
              </div>
            </Card>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => <StatCard key={item.labelEn} mode={mode} {...item} />)}
          </div>
        </div>
      </header>
      <Nav mode={mode} />

      <main className="mx-auto max-w-7xl space-y-20 px-4 py-10 pb-24 sm:px-6 lg:px-8 lg:space-y-24 lg:py-14 lg:pb-28">
        <section className="space-y-8" id="overview">
          <SectionTitle
            mode={mode}
            id="overview"
            kickerEn="Overview"
            kickerZh="總覽"
            titleEn="Why this matters now"
            titleZh="為何這件事現在值得注意"
            bodyEn="At first glance, this may look like a narrow media experiment. In reality, it matters because it points to a new decision environment where recommendation, comparison, advertising, and transaction pathways may increasingly sit inside the same AI interaction."
            bodyZh="乍看之下，這像是一個範圍不大的媒體測試。實際上它之所以重要，是因為它指向一種新的決策環境，在這個環境裡，推薦、比較、廣告與交易路徑，未來可能愈來愈常出現在同一段 AI 互動之中。"
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <div className="mb-4 text-sm font-semibold text-stone-900">{inline(mode, "Three things to notice", "三個值得注意的地方")}</div>
              <div className="space-y-3">
                {[
                  ["Official OpenAI rules on answer independence, privacy, sensitive topics, and aggregate reporting.", "OpenAI 對答案獨立、隱私、敏感主題與彙總成效回報的正式規則。"],
                  ["Target’s November 2025 launch of a shopping app experience inside ChatGPT.", "Target 在 2025 年 11 月推出的 ChatGPT 內購物 app 體驗。"],
                  ["The March 2026 shopping-product upgrade from OpenAI, which made ChatGPT more visual and more compare-friendly.", "OpenAI 於 2026 年 3 月對購物產品層的升級，使 ChatGPT 更視覺化，也更適合比較。"],
                  ["The protocol layer, where UCP signals that conversational commerce is becoming a broader ecosystem question.", "協定層脈絡，亦即 UCP 顯示對話式商務正在變成更大的生態系問題。"],
                ].map(([en, zh]) => (
                  <div key={en} className="flex gap-3 text-sm leading-7 text-stone-700">
                    <div className="mt-1 rounded-full bg-emerald-50 p-1 text-emerald-700"><Icon name="check" className="h-3.5 w-3.5" /></div>
                    <div>{inline(mode, en, zh)}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="mb-4 text-sm font-semibold text-stone-900">{inline(mode, "Three easy misreads", "三個常見誤讀")}</div>
              <div className="space-y-3">
                {[
                  ["The move can look like an ad-format story when it is also a channel-power story.", "這件事表面像廣告格式故事，但本質上也同時是通路權力的故事。"],
                  ["Roundel can look secondary, even though it is the bridge that scales this beyond one retailer brand.", "Roundel 看似配角，但它其實是讓規模超越單一零售商品牌的橋樑。"],
                  ["Trust can look like a side issue, when in fact it is built directly into the product design.", "信任看似只是附帶議題，但其實已經被直接寫進產品設計。"],
                  ["The pilot can look isolated, even though it sits inside a broader shift toward AI-native commerce surfaces.", "試點看似孤立，但其實位於更大規模 AI 原生商務介面的轉變之中。"],
                ].map(([en, zh]) => (
                  <div key={en} className="flex gap-3 text-sm leading-7 text-stone-700">
                    <div className="mt-1 rounded-full bg-amber-50 p-1 text-amber-700"><Icon name="alert" className="h-3.5 w-3.5" /></div>
                    <div>{inline(mode, en, zh)}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section className="space-y-8" id="newness">
          <SectionTitle
            mode={mode}
            id="newness"
            kickerEn="Interpretation"
            kickerZh="判讀"
            titleEn="What is actually new here"
            titleZh="這裡真正新的地方是甚麼"
            bodyEn="The real novelty is not simply that an ad appears in AI. The deeper change is that the discovery layer may now sit inside the same conversation where intent is forming. In earlier digital models, search, comparison, recommendation, and advertising were often distributed across different surfaces. Here they may increasingly compress into one interaction."
            bodyZh="真正的新意，不只是 AI 裡出現了廣告。更深層的變化是：商品探索層現在可能直接位在偏好與意圖正在形成的同一段對話裡。過去的數位模型裡，搜尋、比較、推薦與廣告往往分散在不同介面；現在它們可能逐漸壓縮到同一個互動裡。"
          />

          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <Card>
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-stone-900"><Icon name="grid" className="h-4 w-4" />{inline(mode, "Older discovery logic", "較舊的探索邏輯")}</div>
              <div className="space-y-3">
                {["Search", "Review site", "Retail site", "Ad exposure"].map((step, idx) => (
                  <div key={step} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
                    <span className="mr-2 font-semibold text-stone-500">0{idx + 1}</span>
                    {inline(mode, step, step === "Search" ? "搜尋" : step === "Review site" ? "評測網站" : step === "Retail site" ? "零售網站" : "廣告接觸")}
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-stone-900"><Icon name="message" className="h-4 w-4" />{inline(mode, "Emerging AI discovery logic", "正在形成的 AI 探索邏輯")}</div>
              <div className="space-y-3">
                {[
                  ["Ask", "提問"],
                  ["Refine", "收斂"],
                  ["Compare", "比較"],
                  ["See sponsored option", "看見贊助選項"],
                  ["Click or transact", "點擊或交易"],
                ].map(([en, zh], idx) => (
                  <div key={en} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
                    <span className="mr-2 font-semibold text-stone-500">0{idx + 1}</span>
                    {inline(mode, en, zh)}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section className="space-y-8" id="pilot">
          <SectionTitle
            mode={mode}
            id="pilot"
            kickerEn="Pilot anatomy"
            kickerZh="試點結構"
            titleEn="How the ad system is currently being framed"
            titleZh="目前這套廣告系統如何被公開描述"
            bodyEn="At the surface level, the pilot looks simple: a user asks a shopping-related question, ChatGPT returns the organic answer, and a clearly labeled sponsored placement may appear separately nearby. Underneath that simple format, however, are governance choices that matter strategically."
            bodyZh="從表面看，試點似乎很簡單：使用者提出與購物相關的問題，ChatGPT 先給自然回答，然後附近可能另外出現一個清楚標示的贊助版位。但在這個簡單格式底下，其實埋著對戰略很重要的治理選擇。"
          />

          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <Card>
              <div className="mb-4 text-sm font-semibold text-stone-900">{inline(mode, "Ad experience anatomy", "廣告體驗結構")}</div>
              <div className="space-y-4">
                <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{inline(mode, "User prompt", "使用者提問")}</div>
                  <div className="rounded-2xl bg-white p-4 text-sm leading-7 text-stone-700">{inline(mode, '“What are some countertop cooking appliances that make everyday meals more convenient?”', '「有哪些放在檯面上的烹飪家電，可以讓日常做飯更方便？」')}</div>
                </div>
                <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{inline(mode, "Organic answer", "自然回答")}</div>
                  <div className="rounded-2xl bg-white p-4 text-sm leading-7 text-stone-700">{inline(mode, "ChatGPT gives the main answer first. This answer is not supposed to be changed by the ad.", "ChatGPT 先提供主要回答，而這段回答不應被廣告改變。")}</div>
                </div>
                <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{inline(mode, "Sponsored placement", "贊助版位")}</div>
                    <Pill className="border-stone-300 bg-stone-50 text-stone-700">Sponsored</Pill>
                  </div>
                  <div className="text-sm leading-7 text-stone-700">{inline(mode, "A Target or Roundel partner ad may appear separately and clearly, positioned as a contextual option rather than part of the answer body.", "Target 或 Roundel 合作品牌的廣告可能另外清楚出現，被定位成情境相關選項，而不是回答正文的一部分。")}</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="mb-4 text-sm font-semibold text-stone-900">{inline(mode, "Important operating constraints", "重要運作限制")}</div>
              <div className="space-y-3 text-sm leading-7 text-stone-700">
                {[
                  ["Ads are clearly labeled and visually separated from the answer.", "廣告會清楚標示，並與回答視覺分離。"],
                  ["Advertisers get aggregate performance data, not access to individual chats.", "廣告主拿到的是彙總成效資料，而非個別聊天內容。"],
                  ["OpenAI says ads do not influence the answer itself.", "OpenAI 表示廣告不會影響回答本身。"],
                  ["Ads are excluded near sensitive or regulated topics such as health, mental health, and politics.", "健康、心理健康、政治等敏感或受規範主題附近不會展示廣告。"],
                  ["The test starts in the U.S. and is limited to specific account contexts rather than a fully open rollout.", "測試先從美國開始，而且限定在特定帳號與使用情境中，並非全面開放。"],
                ].map(([en, zh]) => (
                  <div key={en} className="rounded-2xl bg-stone-50 px-4 py-3">{inline(mode, en, zh)}</div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <div className="mb-4 text-sm font-semibold text-stone-900">{inline(mode, "One nuance worth seeing clearly", "一個值得特別看清楚的細節")}</div>
            <Copy
              mode={mode}
              en="Target publicly describes the pilot as keyword-triggered from the user’s prompt. OpenAI’s own ad notes describe a somewhat broader relevance logic during the test, including conversation topic, past chats, and prior ad interactions. That distinction matters because it suggests the system may evolve from simple prompt adjacency toward a richer relevance model over time."
              zh="Target 對外把試點描述成由使用者 prompt 關鍵字觸發。OpenAI 自己的廣告說明則把測試中的相關性邏輯描述得更寬一些，包括對話主題、過往聊天，以及先前的廣告互動。這個差異很重要，因為它意味著這套系統未來可能從較單純的 prompt 鄰接，逐步演進成更完整的相關性模型。"
              className="text-sm leading-7 text-stone-700"
            />
          </Card>
        </section>

        <section className="space-y-8" id="timeline">
          <SectionTitle
            mode={mode}
            id="timeline"
            kickerEn="Timeline"
            kickerZh="時間線"
            titleEn="The wider commerce sequence matters"
            titleZh="更大的商務時間序列很重要"
            bodyEn="This case becomes much stronger once the events are placed in sequence. The ad pilot is not the first move. It is one step inside a broader path toward AI-native commerce surfaces, shopping flows, and interoperability."
            bodyZh="把事件放進時間序列之後，案例會變得更有力。廣告試點不是第一步，而是更大路徑中的一環，這條路徑正朝向 AI 原生商務介面、購物流程與互通標準前進。"
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {timeline.map((item) => (
              <Card key={item.date} className="relative overflow-hidden">
                <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-[28px] bg-stone-100" />
                <div className="relative space-y-3">
                  <div className="inline-flex rounded-full border border-stone-300 bg-stone-50 px-3 py-1 text-xs font-semibold text-stone-700">{item.date}</div>
                  <div className="text-lg font-semibold leading-7 text-stone-900">{inline(mode, item.titleEn, item.titleZh)}</div>
                  <div className="text-sm leading-7 text-stone-700">{inline(mode, item.bodyEn, item.bodyZh)}</div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8" id="framework">
          <SectionTitle
            mode={mode}
            id="framework"
            kickerEn="Course framework"
            kickerZh="課程框架"
            titleEn="How this connects to the course more cleanly"
            titleZh="這個案例如何更乾淨地接回課程框架"
            bodyEn="The strongest classroom version of this case is not just to repeat the news. It is to connect the case to core marketing logic: touchpoints, channel design, value delivery, trust, measurement, and the balance between generative and analytical AI."
            bodyZh="最強的課堂版本，不是重述新聞，而是把案例接回核心行銷邏輯：接觸點、通路設計、價值傳遞、信任、衡量，以及 generative AI 與 analytical AI 之間的分工。"
          />

          <div className="grid gap-5 lg:grid-cols-3">
            <Card>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-stone-900"><Icon name="layers" className="h-4 w-4" />{inline(mode, "IMC and touchpoints", "IMC 與接觸點")}</div>
              <div className="text-sm leading-7 text-stone-700">{inline(mode, "This case is about a new touchpoint. The key question is where in the decision process the firm now influences the customer, and how that touchpoint interacts with search, social, retail sites, and post-purchase advocacy.", "這個案例本質上是在談新的接觸點。關鍵問題是：企業現在在哪一個決策階段影響顧客，以及這個接觸點如何和搜尋、社群、零售網站與購後口碑互動。")}</div>
            </Card>

            <Card>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-stone-900"><Icon name="chart" className="h-4 w-4" />{inline(mode, "Gen AI plus analytical AI", "Gen AI 加上 analytical AI")}</div>
              <div className="text-sm leading-7 text-stone-700">{inline(mode, "The conversation layer is clearly generative, but the ad logic is also analytical: relevance matching, ranking, purchase intent inference, and performance measurement. So this is not a pure gen AI case. It is a combined system.", "對話層顯然是 generative，但廣告邏輯同時也是 analytical 的，包括相關性配對、排序、購買意圖判讀與成效衡量。因此這不是純 gen AI 案例，而是複合系統。")}</div>
            </Card>

            <Card>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-stone-900"><Icon name="shield" className="h-4 w-4" />{inline(mode, "Governance and risk control", "治理與風險控制")}</div>
              <div className="text-sm leading-7 text-stone-700">{inline(mode, "The pilot is useful because governance is visible. Labeling, answer separation, privacy controls, and sensitive-topic limits are not side notes. They are part of the product design and therefore part of the marketing system.", "這個試點有價值的一點是，治理機制是可見的。標示、答案分離、隱私控制與敏感主題限制都不是附註，而是產品設計的一部分，因此也屬於行銷系統的一部分。")}</div>
            </Card>
          </div>
        </section>

        <section className="space-y-8" id="capture">
          <SectionTitle
            mode={mode}
            id="capture"
            kickerEn="Value capture"
            kickerZh="價值捕捉"
            titleEn="Where value may be captured if this model scales"
            titleZh="若此模式擴大，價值可能在哪裡被捕捉"
            bodyEn="The right strategic question is not simply whether users will tolerate ads. The stronger question is who controls the discovery environment and therefore who captures the most durable value over time."
            bodyZh="正確的戰略問題，不只是使用者會不會接受廣告。更強的問題是：誰在控制商品探索環境，因此誰能在長期內捕捉最可持久的價值。"
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <div className="mb-4 text-sm font-semibold text-stone-900">{inline(mode, "Likely value pools", "可能的價值池")}</div>
              <div className="space-y-3">
                {[
                  ["OpenAI / interface owner", "Controls the decision surface, ad supply, ranking context, and the user experience rules.", "OpenAI／介面擁有者", "控制決策介面、廣告供給、排序情境與整體體驗規則。"],
                  ["Target / retailer", "Captures traffic, shopping intent, and downstream conversion or basket value.", "Target／零售商", "捕捉流量、購物意圖，以及下游轉換或購物籃價值。"],
                  ["Roundel / retail media network", "Turns retailer data and inventory access into scalable media intermediation across many brands.", "Roundel／零售媒體網路", "把零售商資料與庫存觸達能力轉成可規模化的媒體中介力量。"],
                  ["Brand partners", "Gain access to higher-intent demand at the moment preferences are narrowing.", "品牌合作夥伴", "在偏好正在收斂的時刻，接觸更高意圖的需求。"],
                ].map(([enA, enB, zhA, zhB]) => (
                  <div key={enA} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                    <div className="text-sm font-semibold text-stone-900">{inline(mode, enA, zhA)}</div>
                    <div className="mt-1 text-sm leading-7 text-stone-700">{inline(mode, enB, zhB)}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="mb-4 text-sm font-semibold text-stone-900">{inline(mode, "My strongest strategic read", "最強的戰略判讀")}</div>
              <div className="space-y-4 text-sm leading-7 text-stone-700">
                <div className="rounded-2xl bg-stone-50 px-4 py-3">{inline(mode, "The competition is no longer only for ad impressions. It is for presence inside the environment where preference is being formed.", "競爭焦點不再只是搶廣告曝光，而是搶進顧客偏好正在形成的環境。")}</div>
                <div className="rounded-2xl bg-stone-50 px-4 py-3">{inline(mode, "That is why Roundel matters. Retail media networks already sit between brands, retailer data, and purchase pathways. If conversational AI becomes part of shopping, RMNs are well placed to become one of the first scalable bridges.", "這也是為甚麼 Roundel 很重要。零售媒體網路原本就位在品牌、零售商資料與購買路徑之間。若對話式 AI 成為購物旅程的一部分，RMN 很有機會成為最早可規模化的橋樑之一。")}</div>
              </div>
            </Card>
          </div>
        </section>

        <section className="space-y-8" id="unknowns">
          <SectionTitle
            mode={mode}
            id="unknowns"
            kickerEn="Unknowns"
            kickerZh="未知與限制"
            titleEn="What is still unknown and should not be overstated"
            titleZh="仍然未知、因此不應被誇大的地方"
            bodyEn="A stronger page is not one that sounds certain about everything. It is one that clearly marks what is known, what is inferred, and what is still unresolved. This case is still early."
            bodyZh="更強的頁面，不是對所有事情都講得很肯定，而是能清楚標出哪些是已知、哪些是合理推論、哪些仍未解決。這個案例仍然很早期。"
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <div className="mb-4 text-sm font-semibold text-stone-900">{inline(mode, "Known now", "目前已知")}</div>
              <div className="space-y-3 text-sm leading-7 text-stone-700">
                {[
                  ["The pilot is live and official.", "試點已正式上線。"],
                  ["Ads are clearly labeled and separate from answers.", "廣告清楚標示並與回答分離。"],
                  ["Target sees strong traffic growth from ChatGPT.", "Target 已看到來自 ChatGPT 的強勁流量成長。"],
                  ["Roundel provides scale beyond one retailer brand.", "Roundel 讓規模超越單一零售商品牌。"],
                ].map(([en, zh]) => <div key={en} className="rounded-2xl bg-stone-50 px-4 py-3">{inline(mode, en, zh)}</div>)}
              </div>
            </Card>

            <Card>
              <div className="mb-4 text-sm font-semibold text-stone-900">{inline(mode, "Still unresolved", "仍未解決")}</div>
              <div className="space-y-3 text-sm leading-7 text-stone-700">
                {[
                  ["How much downstream sales lift this will create versus simple upper-funnel discovery.", "這件事到底會帶來多少下游銷售提升，而不只是上層漏斗探索。"],
                  ["Whether users will keep trusting the surface as ad load grows.", "若廣告量增加，使用者是否仍會信任這個介面。"],
                  ["How durable any early advantage will be once more retailers and RMNs join.", "一旦更多零售商與 RMN 進場，早期優勢能維持多久。"],
                  ["Whether the long-run winner is the platform, the retailer, the RMN, or some combination.", "長期贏家究竟是平臺、零售商、RMN，還是某種組合。"],
                ].map(([en, zh]) => <div key={en} className="rounded-2xl bg-stone-50 px-4 py-3">{inline(mode, en, zh)}</div>)}
              </div>
            </Card>
          </div>

          <Card>
            <div className="mb-4 text-sm font-semibold text-stone-900">{inline(mode, "Best calibrated caution", "最適合的保守判讀")}</div>
            <Copy
              mode={mode}
              en="The most defensible current position is that this is a meaningful discovery and traffic-generation experiment inside conversational AI, but not yet enough evidence that it is already a mature lower-funnel conversion engine."
              zh="目前最穩健、最能自圓其說的立場是：這是一個在對話式 AI 內很有意義的探索與導流實驗，但現階段仍不足以證明它已經是成熟的下層漏斗轉換引擎。"
              className="text-sm leading-7 text-stone-700"
            />
          </Card>
        </section>

        <section className="space-y-8" id="classuse">
          <SectionTitle
            mode={mode}
            id="classuse"
            kickerEn="Class use"
            kickerZh="課堂使用"
            titleEn="Discussion lens"
            titleZh="討論切入點"
            bodyEn="The cleanest way to discuss this case is to hold onto one central idea, one clear limitation, and one question about long-term value capture. That keeps the discussion readable and strategic at the same time."
            bodyZh="要討論這個案例，最好的方式是抓住一個核心觀點、一個明確限制，以及一個關於長期價值捕捉的問題。這樣既容易理解，也仍保有戰略密度。"
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <div className="mb-4 text-sm font-semibold text-stone-900">{inline(mode, "Main takeaway", "主要結論")}</div>
              <div className="rounded-3xl bg-stone-50 p-4 text-sm leading-7 text-stone-700">
                {inline(
                  mode,
                  "What stands out is that this is not mainly about AI making marketing faster or cheaper. It is about where discovery happens. Target is testing contextual ads in ChatGPT for both its own brand and its Roundel partners, with ads clearly labeled and separated from the answer. What makes the case important is that the conversation itself may become part of the shopping journey. That matters because it shifts marketing closer to the moment when preference is being formed. It also fits the course framework well because the system combines generative AI at the conversation layer with analytical AI in relevance matching, ranking, and measurement. My cautious view is that this still looks like an early discovery and learning channel more than a mature conversion engine. The bigger strategic question is who captures the long-term value if AI assistants become a real discovery layer for commerce.",
                  "我覺得最值得注意的地方，不是 AI 讓行銷變得更快或更便宜，而是 discovery 發生的位置正在改變。Target 正在 ChatGPT 內測試情境式廣告，不只替自己，也替 Roundel 合作品牌投放，而且廣告會清楚標示並和回答分開。這個案例真正重要的地方，是對話本身可能開始成為購物旅程的一部分。這很重要，因為它把行銷推進到顧客偏好正在形成的那一刻。它也很適合接到課堂框架，因為這套系統在對話層用的是 generative AI，但在相關性配對、排序與量測上又同時用到 analytical AI。我的保守看法是，這目前看起來仍比較像早期的探索與學習通路，而不是成熟的轉換引擎。更大的戰略問題是，如果 AI assistant 真的變成新的 discovery layer，長期價值最後會被誰拿走。"
                )}
              </div>
            </Card>

            <Card>
              <div className="mb-4 text-sm font-semibold text-stone-900">{inline(mode, "Question worth asking", "值得追問的問題")}</div>
              <div className="rounded-3xl bg-stone-50 p-4 text-sm leading-7 text-stone-700">
                {inline(
                  mode,
                  "If ads in ChatGPT must remain separate from the answer and cannot influence the answer itself, where will durable value capture really sit over time: in ad adjacency, in retailer first-party data, in ownership of the discovery environment, or in the retail media network that bridges all three?",
                  "如果 ChatGPT 裡的廣告必須和回答分開，而且不能影響回答本身，那長期來看，真正可持續的價值捕捉，究竟會落在廣告鄰接位置、零售商 first-party data、掌握 discovery environment 的平臺，還是把三者接起來的 retail media network？"
                )}
              </div>
            </Card>
          </div>
        </section>

        <section className="space-y-8" id="sources">
          <SectionTitle
            mode={mode}
            id="sources"
            kickerEn="Source stack"
            kickerZh="來源堆疊"
            titleEn="Source basis"
            titleZh="資料基礎"
            bodyEn="The page is grounded in the supplied article summary, then strengthened with the official public materials that most clearly expand or clarify the case. The purpose is to keep the structure readable while preserving source discipline."
            bodyZh="這一頁以您提供的文章整理為基礎，再補入最能實質擴充或釐清案例的官方公開材料。目的不是堆滿引用，而是在可讀性與來源紀律之間取得平衡。"
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sources.map(([name, date, en, zh]) => (
              <Card key={name}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-stone-900">{name}</div>
                  <Pill className="border-stone-300 bg-stone-50 text-stone-700">{date}</Pill>
                </div>
                <div className="text-sm leading-7 text-stone-700">{inline(mode, en, zh)}</div>
              </Card>
            ))}
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white/70 px-4 py-4 text-sm leading-7 text-stone-600">
            {inline(mode, "The structure here is built for general readers first: a clear thesis, a visible process, the main strategic implications, and only the most relevant source layer notes.", "這裡的結構優先是為一般讀者設計：先給清楚主論點、再看運作方式、接著理解主要戰略意涵，最後只保留最相關的來源層註記。")}
          </div>
        </section>
      </main>
    </div>
  );
}
