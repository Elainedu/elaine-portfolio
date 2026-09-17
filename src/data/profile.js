// src/data/profile.js — 個人核心資料：基本資訊、技能群組（含熟練等級 0–3）、助教經歷、語言 / 資訊證照、關於我特質卡片
export const profile = {
  name: "杜宜霖 Elaine",
  role: "Software Engineer · AI Application · System Integration",
  intro: "把需求變成可上線、可維運、可迭代的系統，並用穩定交付證明價值。",
  email: "dyl890922@gmail.com",
  stats: [
    { num: 11, suffix: "+", label: "Projects" },
    { num: 3,  suffix: "",  label: "TA Roles" },
    { num: 5,  suffix: "",  label: "Certificates" },
  ],
};

export const skillGroups = [
  {
    label: "程式語言",
    color: "#2563eb",
    skills: [
      { name: "Python",  level: 3 },
      { name: "Java",    level: 2 },
    ],
  },
  {
    label: "後端 / 框架",
    color: "#7c3aed",
    skills: [
      { name: "Django",       level: 3 },
      { name: "Flask",        level: 3 },
      { name: "RESTful API",  level: 2 },
    ],
  },
  {
    label: "資料庫 / 維運",
    color: "#0891b2",
    skills: [
      { name: "PostgreSQL / SQL", level: 2 },
      { name: "Docker",           level: 2 },
      { name: "Linux",            level: 2 },
      { name: "Nginx",            level: 1 },
      { name: "Gunicorn",         level: 1 },
    ],
  },
  {
    label: "AI / ML",
    color: "#16a34a",
    skills: [
      { name: "LLM / NLP",          level: 3 },
      { name: "Computer Vision",     level: 2 },
      { name: "PyTorch",             level: 2 },
      { name: "FastAI",              level: 1 },
      { name: "Prompt Engineering",  level: 3 },
    ],
  },
  {
    label: "工具 / 整合",
    color: "#d97706",
    skills: [
      { name: "LangChain",         level: 2 },
      { name: "LINE Bot SDK",      level: 3 },
      { name: "System Integration",level: 2 },
      { name: "Gradio",            level: 2 },
    ],
  },
];

export const experiences = [
  {
    role: "深度學習助教",
    org: "國立高雄科技大學",
    period: "2025/02 – 2025/06",
    detail: "協助 LLM 與電腦視覺課程，支援專題測試、除錯與成果驗證。",
  },
  {
    role: "大數據分析助教",
    org: "國立高雄科技大學",
    period: "2024/09 – 2025/01",
    detail: "協助資料分析專題，整合爬蟲、NLP 與視覺化應用。",
  },
  {
    role: "Java 程式設計助教",
    org: "國立高雄科技大學",
    period: "2023/09 – 2024/06",
    detail: "協助 Java 與 OOP 教學，強化問題拆解與程式除錯能力。",
  },
];

export const certificates = [
  { name: "TOEIC 790",                                  type: "語言" },
  { name: "PVQC 專業英文詞彙能力國際認證 Tier Five",      type: "語言" },
  { name: "CERPS ERP 應用工程師（配銷模組）",             type: "資訊" },
  { name: "CERPS ERP 應用工程師（Workflow ERP GP 2.x）", type: "資訊" },
  { name: "TQC-OA Word / Excel / 中文輸入",              type: "資訊" },
];

export const education = [
  {
    degree: "資訊管理研究所",
    school: "國立高雄科技大學",
    period: "2024 – 至今",
    tag: "碩士",
    color: "#2563eb",
    desc: "研究方向為 LLM 應用與 NLP，論文聚焦於 LINE Bot 結合大型語言模型的英語學習系統，並於 ICIM 2025 國際研討會發表。",
  },
  {
    degree: "應用英語系",
    school: "國立高雄科技大學",
    period: "2020 – 2024",
    tag: "學士",
    color: "#7c3aed",
    desc: "修習應用英語、商務溝通與跨文化管理，同時自學程式開發，取得 TOEIC 790、PVQC Tier Five，並擔任三屆助教。",
  },
];

export const aboutPoints = [
  {
    icon: "🔀",
    title: "跨域背景",
    desc: "應英系奠定英語溝通與商務表達能力，資管所帶入 AI 與系統開發訓練，兩者融合是核心競爭力。",
  },
  {
    icon: "🎯",
    title: "目標導向",
    desc: "重視需求理解與長期可維護性，習慣把模糊需求拆解成可執行的具體步驟再動手。",
  },
  {
    icon: "🔗",
    title: "跨角色溝通",
    desc: "能在技術與非技術之間快速對齊語境，讓工程決策與業務目標保持一致。",
  },
  {
    icon: "📈",
    title: "持續迭代",
    desc: "習慣以數據和使用者回饋驅動優化，不只交付功能，也在乎上線後的穩定與改善。",
  },
];
