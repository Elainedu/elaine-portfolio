<!-- src/components/AboutSection.vue — 關於我：個人介紹、學歷時間線、特質卡片，資料來源 src/data/profile.js -->
<script setup>
import { aboutPoints, education } from "../data/profile.js";
</script>

<template>
  <section id="about" class="panel section">

    <div class="section-title-bar" v-reveal>
      <div class="section-dot"></div>
      <h2 class="section-title">關於我</h2>
    </div>

    <!-- ── 上半：介紹文 + 學歷 ── -->
    <div class="top-layout" v-reveal="60">

      <!-- 左：個人介紹 -->
      <div class="bio">
        <p class="bio-text">
          我是杜宜霖，畢業於國立高雄科技大學應用英語系，目前就讀同校資訊管理研究所。
          大學四年在英語溝通、商務表達與跨文化語境中打底，研究所則深入 AI 應用與系統開發。
        </p>
        <p class="bio-text">
          跨域背景讓我能同時理解技術與業務兩側的語言。開發上從需求分析、後端實作到部署維運都有實際經歷；
          研究上以 LLM 與 NLP 為方向，論文系統已於 ICIM 2025 國際研討會發表。
        </p>
        <p class="bio-text">
          擔任過三屆助教、帶過社團、做過家教，習慣在有限資源下把事情做完、做好，並從每次迭代中找到改善空間。
        </p>

        <!-- 關鍵字標籤 -->
        <div class="tags">
          <span>🌏 應用英語</span>
          <span>🤖 AI / NLP</span>
          <span>🐍 Python</span>
          <span>🐱 Django</span>
          <span>📄 ICIM 2025</span>
          <span>🌐 TOEIC 790</span>
        </div>
      </div>

      <!-- 右：學歷時間線 -->
      <div class="edu-col">
        <div class="edu-label">✦ 學歷</div>
        <div class="edu-list">
          <div
            v-for="(edu, i) in education"
            :key="edu.degree"
            class="edu-item"
            v-reveal="80 + i * 80"
          >
            <div class="edu-track">
              <div class="edu-dot" :style="{ background: edu.color }"></div>
              <div v-if="i < education.length - 1" class="edu-line"></div>
            </div>
            <div class="edu-content">
              <div class="edu-top">
                <span class="edu-tag" :style="{ background: edu.color + '18', color: edu.color }">
                  {{ edu.tag }}
                </span>
                <span class="edu-period">{{ edu.period }}</span>
              </div>
              <strong class="edu-degree">{{ edu.degree }}</strong>
              <p class="edu-school">{{ edu.school }}</p>
              <p class="edu-desc">{{ edu.desc }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- ── 下半：特質卡片 ── -->
    <div class="cards">
      <div
        v-for="(pt, i) in aboutPoints"
        :key="pt.title"
        class="card"
        v-reveal="200 + i * 70"
      >
        <span class="card-icon">{{ pt.icon }}</span>
        <div>
          <strong>{{ pt.title }}</strong>
          <p>{{ pt.desc }}</p>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* ── 上半版型 ── */
.top-layout {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 36px;
  margin-bottom: 28px;
  align-items: start;
}

/* ── 介紹文 ── */
.bio-text {
  margin: 0 0 14px;
  color: var(--sub, #475569);
  font-size: 14.5px;
  line-height: 1.8;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}
.tags span {
  font-size: 12.5px;
  font-weight: 600;
  padding: 5px 13px;
  border-radius: 999px;
  background: var(--accent-soft, #eff6ff);
  color: var(--accent, #2563eb);
  border: 1px solid rgba(37,99,235,.15);
  transition: background .18s ease;
}
.tags span:hover {
  background: var(--accent, #2563eb);
  color: #fff;
}

/* ── 學歷 ── */
.edu-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .7px;
  text-transform: uppercase;
  color: var(--muted, #94a3b8);
  margin-bottom: 18px;
}

.edu-list { display: flex; flex-direction: column; }

.edu-item {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 14px;
  padding-bottom: 24px;
}
.edu-item:last-child { padding-bottom: 0; }

.edu-track {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.edu-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
  box-shadow: 0 0 0 3px rgba(37,99,235,.12);
}
.edu-line {
  width: 2px;
  flex: 1;
  min-height: 12px;
  background: linear-gradient(180deg, #bfdbfe 0%, transparent 100%);
  margin-top: 4px;
}

.edu-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}
.edu-tag {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 9px;
  border-radius: 999px;
}
.edu-period {
  font-size: 11.5px;
  color: var(--muted, #94a3b8);
  font-weight: 600;
}

.edu-degree {
  display: block;
  font-size: 14.5px;
  font-weight: 700;
  color: var(--ink, #0f172a);
  margin-bottom: 2px;
}
.edu-school {
  margin: 0 0 6px;
  font-size: 12.5px;
  color: var(--accent, #2563eb);
  font-weight: 600;
}
.edu-desc {
  margin: 0;
  font-size: 12.5px;
  color: var(--sub, #64748b);
  line-height: 1.65;
}

/* ── 特質卡片 ── */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 12px;
  padding-top: 4px;
  border-top: 1px solid var(--line, #e2e8f0);
}

.card {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 16px 18px;
  background: var(--bg, #f8fafc);
  border-radius: 14px;
  border: 1px solid var(--line, #e2e8f0);
  transition: box-shadow .2s ease, transform .2s ease;
}
.card:hover {
  box-shadow: 0 6px 20px rgba(15,23,42,.08);
  transform: translateY(-2px);
}

.card-icon { font-size: 22px; flex-shrink: 0; line-height: 1; margin-top: 2px; }

strong {
  display: block;
  color: var(--ink, #0f172a);
  font-weight: 700;
  margin-bottom: 4px;
  font-size: 14px;
}
p { margin: 0; color: var(--sub, #64748b); font-size: 13px; line-height: 1.65; }

/* ── Responsive ── */
@media (max-width: 780px) {
  .top-layout { grid-template-columns: 1fr; gap: 24px; }
}
@media (max-width: 680px) {
  .cards { grid-template-columns: 1fr; }
}
</style>
