// src/data/projects.js — 作品集資料：專案陣列、類別顏色對照表 CATEGORY_STYLE、工具函式 getCategoryStyle

export const projects = [
  {
    name: "LINE Bot 英語學習系統",
    category: "AI 應用",
    emoji: "🗣️",
    objective: "整合 LINE 平台與 LLM 打造的完整英語學習系統，支援對話練習、聽力測驗、跟讀與單字學習四大模組。",
    impact: "論文系統，已於 ICIM 2025 國際資訊管理學術研討會發表。",
    stack: ["Flask", "OpenAI API", "Whisper ASR", "TTS", "LINE Bot SDK", "Prompt Engineering"],
    images: [],
  },
  {
    name: "新聞輿情分析平台",
    category: "系統 / Web",
    emoji: "📰",
    objective: "Django 多模組新聞分析系統，整合關鍵字熱度、NER 命名實體識別、BERT 情感分析、語意相似度新聞推薦等功能。",
    impact: "從爬蟲到前端視覺化全自建，協助快速掌握輿情趨勢與熱門議題。",
    stack: ["Django", "BERT", "NER", "TF-IDF", "ECharts", "MongoDB", "爬蟲"],
    images: [
      { src: "/projects/bigdata1.png", alt: "關鍵字聲量趨勢分析頁面" },
      { src: "/projects/bigdata2.png", alt: "新聞搜尋與相似推薦頁面" },
    ],
  },
  {
    name: "陪伴型機器人「小陪」",
    category: "AI 應用",
    emoji: "🤝",
    objective: "多模態 AI 陪伴機器人，支援語音、圖片、文字三種輸入方式，結合情緒感知與長期記憶，回覆語氣自然如台灣朋友。",
    impact: "整合 Whisper、LLaVA、Qwen、ChromaDB 五個元件於單一系統，實現真正的多模態陪伴體驗。",
    stack: ["Ollama", "Qwen 2.5", "LLaVA", "Whisper ASR", "ChromaDB", "LangChain", "Gradio"],
    images: [
      { src: "/projects/accompany.png", alt: "小陪陪伴型機器人對話介面" },
    ],
    highlight: true,
  },
  {
    name: "Online Judge 自動評測系統",
    category: "系統 / Web",
    emoji: "⚖️",
    objective: "線上交作業、考試與自動判題平台，支援多語言程式碼提交與即時評測，含後台管理功能。",
    impact: "獨立完成從建置到維運全流程，實際支援課程作業與線上考試場景。",
    stack: ["Django", "Judge0", "PostgreSQL", "Docker", "Nginx", "Gunicorn", "Linux"],
    images: [
      { src: "/projects/oj.png", alt: "LetsOJ 競賽列表與課程作業管理頁面" },
    ],
  },
  {
    name: "QLoRA & LLM 微調實驗",
    category: "LLM 微調",
    emoji: "🤖",
    objective: "完整的 LLM 實驗流水線：從預訓練模型展示、全量 SFT、QLoRA 參數高效微調，到多輪對話與 Streaming 輸出。",
    impact: "QLoRA 以僅 6.7% 的參數量達到接近全量微調的對話品質，大幅降低顯存需求。",
    stack: ["BLOOM-389M", "QLoRA", "LoRA / PEFT", "BitsAndBytes 4-bit", "HuggingFace", "Gradio"],
    images: [
      { src: "/projects/llm_chat.png", alt: "QLoRA 100K 對話 Demo 介面" },
    ],
    highlight: true,
  },
  {
    name: "ABSA 飯店評論情感分析",
    category: "NLP",
    emoji: "🔍",
    objective: "細粒度情感分析系統，對飯店評論拆解至整潔、服務、地點、性價比等六個面向，各自判斷正面／中立／負面。",
    impact: "比整體情感分類提供更細緻的洞察，後處理 pipeline 確保複雜句子也能穩定輸出。",
    stack: ["BLOOM-389M", "Full SFT", "Gradio", "OpenCC", "regex 後處理"],
    images: [
      { src: "/projects/absa.png", alt: "飯店評論多面向情感分析介面" },
    ],
  },
  {
    name: "VGG19 口罩偵測",
    category: "電腦視覺",
    emoji: "😷",
    objective: "即時偵測圖片中每張人臉是否配戴口罩，標示 WITH MASK／NO MASK 框線與信心度，支援多人臉同時偵測。",
    impact: "VGG19 遷移學習微調後準確率達 99.75%，Early Stopping 防止過擬合。",
    stack: ["VGG19", "TensorFlow / Keras", "OpenCV Haar Cascade", "Gradio"],
    images: [
      { src: "/projects/mask1.png", alt: "口罩偵測 - WITH MASK 結果" },
      { src: "/projects/mask2.png", alt: "口罩偵測 - NO MASK 結果" },
    ],
    highlight: true,
  },
  {
    name: "YOLOv8 人臉年齡性別偵測",
    category: "電腦視覺",
    emoji: "👁️",
    objective: "單一模型同時完成人臉偵測與年齡性別分類（10 類別），於原圖標示框線與標籤，並統計群體分佈。",
    impact: "YOLOv8 端對端架構，推論速度快，支援批次圖片測試與統計分析。",
    stack: ["YOLOv8", "Ultralytics", "Gradio", "AMP 混合精度"],
    images: [
      { src: "/projects/gender_age.png", alt: "人臉年齡性別偵測介面" },
    ],
  },
  {
    name: "電商客服 AI 系統",
    category: "AI 應用",
    emoji: "🎧",
    objective: "以 Java Spring Boot 為後端框架，整合本地 LLM（llama.cpp）打造電商客服聊天系統。透過可編輯的 system prompt 定義客服角色與業務規則，支援訂單查詢、退換貨申請、付款問題三大場景，並提供快捷回覆按鈕提升使用者體驗。",
    impact: "Session-based 多輪對話記憶，歷史訊息持久化至 SQLite；RESTful API 串接前端，完整實作從使用者提問到 LLM 推論到對話儲存的全流程。",
    stack: ["Spring Boot 3", "Java 21", "Spring Data JPA", "SQLite", "llama.cpp", "RESTful API", "Lombok"],
    images: [
      { src: "/projects/cs_chat1.png", alt: "電商客服 AI 對話介面 — 訂單查詢場景" },
      { src: "/projects/cs_chat2.png", alt: "退換貨問題處理與快捷回覆按鈕" },
    ],
  },
  {
    name: "RAG 程式碼查詢系統",
    category: "RAG / LLM",
    emoji: "🔎",
    objective: "以自然語言查詢程式碼庫，系統自動定位相關檔案與函式說明，無需記憶檔案名稱或手動搜尋。",
    impact: "結合 qwen3-embedding 向量化與 ChromaDB 檢索，有效縮短開發者查詢程式碼的時間。",
    stack: ["LangChain", "ChromaDB", "qwen3-embedding", "Ollama", "Web UI"],
    images: [],
  },
  {
    name: "個人作品集網站",
    category: "系統 / Web",
    emoji: "🌐",
    objective: "你正在看的這個網站。從設計、開發到部署全程自己來，用 Vue 3 實作，部署在 Firebase 並掛上自訂網域。",
    impact: "採用 Cloudflare CDN 加速、深色模式、滾動動畫、RWD 設計，在行動裝置與桌面均有良好體驗。",
    stack: ["Vue 3", "Vite", "Firebase Hosting", "Cloudflare", "CSS 變數"],
    images: [],
  },
];

export const CATEGORY_STYLE = {
  "系統 / Web": { accent: "#2563eb", badge: "#dbeafe", text: "#1e40af" },
  "AI 應用":    { accent: "#7c3aed", badge: "#ede9fe", text: "#5b21b6" },
  "NLP / 資料": { accent: "#0891b2", badge: "#cffafe", text: "#0e7490" },
  "NLP":        { accent: "#0ea5e9", badge: "#e0f2fe", text: "#0369a1" },
  "LLM 微調":   { accent: "#9333ea", badge: "#f3e8ff", text: "#7e22ce" },
  "LLM":        { accent: "#8b5cf6", badge: "#ede9fe", text: "#6d28d9" },
  "RAG / LLM":  { accent: "#6366f1", badge: "#e0e7ff", text: "#4338ca" },
  "電腦視覺":   { accent: "#16a34a", badge: "#dcfce7", text: "#15803d" },
};

export function getCategoryStyle(cat) {
  return CATEGORY_STYLE[cat] ?? { accent: "#64748b", badge: "#f1f5f9", text: "#475569" };
}
