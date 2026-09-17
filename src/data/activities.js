// src/data/activities.js — 活動經歷資料：社團活動 / 家教，照片放 public/activities/

export const activities = [
  // ── 社團活動 ──────────────────────────
  {
    category: "club",
    label: "社團活動",
    color: "#16a34a",
    title: "公益鬼屋",
    org: "國立高雄科技大學",
    period: "2021–2022",
    desc: "以發票作為入場門票，活動結束後將所有收入捐出，兼顧趣味體驗與公益目的，負責活動現場佈置與執行。",
    images: [
      { src: "/activities/image17.jpeg", alt: "鬼屋現場佈置" },
    ],
  },
  {
    category: "club",
    label: "社團活動",
    color: "#16a34a",
    title: "聖誕營隊",
    org: "國立高雄科技大學",
    period: "2022–2023",
    desc: "邀請國小學生參加兩天一夜聖誕主題營隊，曾擔任音控及總召，統籌活動流程規劃與現場協調，帶領夥伴完成完整營隊執行。",
    images: [
      { src: "/activities/image19.jpg",  alt: "音控操作" },
      { src: "/activities/image18.jpg",  alt: "陪伴學童活動互動" },
    ],
  },

  // ── 家教經驗 ──────────────────────────
  {
    category: "tutor",
    label: "家教經驗",
    color: "#2563eb",
    title: "教育部學伴計畫",
    org: "教育部 / 國立高雄科技大學",
    period: "2021–2022",
    desc: "參與教育部偏鄉學伴計畫，線上一對一陪伴偏鄉國小學童學習英文，依學生程度設計教材，培養跨地域教學溝通能力。",
    images: [
      { src: "/activities/image21.jpg", alt: "與學伴學童合照" },
    ],
  },
  {
    category: "tutor",
    label: "家教經驗",
    color: "#2563eb",
    title: "英文家教",
    org: "個人接案",
    period: "2022–2024",
    desc: "擔任英文家教，以雜誌英檢（彭蒙惠英語）為教材輔助，協助學生準備英語檢定，強化聽讀能力與單字量。",
    images: [],
  },
];

export const ACTIVITY_TABS = [
  { key: "all",   label: "全部",    icon: "✦" },
  { key: "club",  label: "社團活動", icon: "🎪" },
  { key: "tutor", label: "家教",    icon: "📚" },
];
