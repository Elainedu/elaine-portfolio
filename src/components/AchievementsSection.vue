<!-- src/components/AchievementsSection.vue — 成就 & 證書：分類 tabs + 縮圖卡片，點擊以 Teleport 燈箱放大，資料來源 src/data/achievements.js -->
<script setup>
import { ref, computed } from "vue";
import { achievements, ACHIEVEMENT_TABS } from "../data/achievements.js";

const activeTab = ref("all");
const lightbox  = ref(null);   // { image, title, desc }

const shown = computed(() =>
  activeTab.value === "all"
    ? achievements
    : achievements.filter((a) => a.type === activeTab.value)
);

function openLightbox(item) {
  lightbox.value = item;
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.value = null;
  document.body.style.overflow = "";
}
</script>

<template>
  <section id="achievements" class="panel section">

    <!-- 標題 -->
    <div class="section-title-bar" v-reveal>
      <div class="section-dot"></div>
      <h2 class="section-title">成就 & 證書</h2>
    </div>
    <p class="section-sub" v-reveal="60">
      競賽獲獎、學術發表、培訓研習與專業證照。
    </p>

    <!-- Tab 篩選 -->
    <div class="tabs" v-reveal="80">
      <button
        v-for="tab in ACHIEVEMENT_TABS"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.label }}
        <span class="tab-cnt">
          {{ tab.key === 'all' ? achievements.length : achievements.filter(a => a.type === tab.key).length }}
        </span>
      </button>
    </div>

    <!-- 卡片 Grid -->
    <TransitionGroup name="ach" tag="div" class="grid">
      <article
        v-for="item in shown"
        :key="item.title + item.year"
        class="card"
        :style="{ '--bcolor': item.badgeColor }"
        @click="openLightbox(item)"
        v-reveal
      >
        <!-- 圖片縮圖 -->
        <div class="thumb-wrap">
          <img :src="item.image" :alt="item.title" class="thumb" loading="lazy" />
          <div class="thumb-overlay">
            <span class="zoom-icon">🔍 點擊放大</span>
          </div>
        </div>

        <!-- 內容 -->
        <div class="card-body">
          <div class="card-top">
            <span class="badge" :style="{ background: item.badgeColor + '18', color: item.badgeColor }">
              {{ item.badge }}
            </span>
            <span class="year">{{ item.year }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p class="org">{{ item.org }}</p>
          <p class="desc">{{ item.desc }}</p>
        </div>
      </article>
    </TransitionGroup>

  </section>

  <!-- ── Lightbox ── -->
  <Teleport to="body">
    <Transition name="lb">
      <div v-if="lightbox" class="lb-backdrop" @click.self="closeLightbox">
        <div class="lb-box">
          <button class="lb-close" @click="closeLightbox" aria-label="關閉">✕</button>
          <img :src="lightbox.image" :alt="lightbox.title" class="lb-img" />
          <div class="lb-info">
            <span class="badge" :style="{ background: lightbox.badgeColor + '18', color: lightbox.badgeColor }">
              {{ lightbox.badge }}
            </span>
            <h3>{{ lightbox.title }}</h3>
            <p class="lb-org">{{ lightbox.org }}・{{ lightbox.year }}</p>
            <p class="lb-desc">{{ lightbox.desc }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Tabs ── */
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  color: #64748b;
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all .18s ease;
  font-family: inherit;
}
.tab-btn:hover:not(.active) { background: #f1f5f9; color: #334155; }
.tab-btn.active { background: #1e293b; color: #fff; border-color: #1e293b; }

.tab-icon { font-size: 14px; }

.tab-cnt {
  background: #e2e8f0;
  color: #64748b;
  border-radius: 999px;
  padding: 1px 7px;
  font-size: 11px;
  margin-left: 2px;
}
.tab-btn.active .tab-cnt { background: rgba(255,255,255,.2); color: #fff; }

/* ── Grid ── */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  position: relative;
}

/* ── Card ── */
.card {
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  transition: transform .22s ease, box-shadow .22s ease;
  display: flex;
  flex-direction: column;
}
.card::before {
  content: "";
  position: absolute;
  left: 0; top: 0; right: 0;
  height: 3px;
  background: var(--bcolor, #2563eb);
  border-radius: 16px 16px 0 0;
}
.card { position: relative; }
.card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(15,23,42,.12); }

/* Thumbnail */
.thumb-wrap {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #f8fafc;
  flex-shrink: 0;
}
.thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform .3s ease;
}
.card:hover .thumb { transform: scale(1.04); }

.thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15,23,42,.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity .22s ease;
}
.card:hover .thumb-overlay { opacity: 1; }
.zoom-icon { color: #fff; font-size: 14px; font-weight: 600; }

/* Card body */
.card-body { padding: 16px; display: flex; flex-direction: column; flex: 1; }

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 6px;
}

.badge {
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  letter-spacing: .2px;
  white-space: nowrap;
}

.year {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 600;
  background: #f8fafc;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
}

h3 {
  margin: 0 0 4px;
  font-size: 14.5px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
}

.org {
  margin: 0 0 8px;
  font-size: 12.5px;
  color: #2563eb;
  font-weight: 600;
}

.desc {
  margin: 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.6;
  flex: 1;
}

/* ── TransitionGroup ── */
.ach-enter-active { transition: opacity .35s ease, transform .35s cubic-bezier(.22,.68,0,1.2); }
.ach-leave-active { transition: opacity .2s ease; position: absolute; }
.ach-enter-from   { opacity: 0; transform: translateY(14px) scale(.97); }
.ach-leave-to     { opacity: 0; }
.ach-move         { transition: transform .35s ease; }

/* ── Lightbox ── */
.lb-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: rgba(10,15,30,.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.lb-box {
  background: #fff;
  border-radius: 20px;
  max-width: 680px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 32px 80px rgba(0,0,0,.35);
}

.lb-close {
  position: absolute;
  top: 14px; right: 14px;
  z-index: 1;
  background: rgba(15,23,42,.08);
  border: none;
  border-radius: 50%;
  width: 36px; height: 36px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .18s ease;
  color: #334155;
}
.lb-close:hover { background: rgba(15,23,42,.15); }

.lb-img {
  width: 100%;
  display: block;
  border-radius: 20px 20px 0 0;
  max-height: 60vh;
  object-fit: contain;
  background: #f8fafc;
}

.lb-info {
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.lb-info h3 { margin: 4px 0 0; font-size: 17px; font-weight: 700; color: #0f172a; }
.lb-org { margin: 0; font-size: 13.5px; color: #2563eb; font-weight: 600; }
.lb-desc { margin: 4px 0 0; font-size: 14px; color: #475569; line-height: 1.65; }

/* Lightbox transition */
.lb-enter-active, .lb-leave-active { transition: opacity .25s ease; }
.lb-enter-from, .lb-leave-to       { opacity: 0; }
.lb-enter-active .lb-box,
.lb-leave-active .lb-box           { transition: transform .25s cubic-bezier(.22,.68,0,1.2); }
.lb-enter-from .lb-box             { transform: scale(.94) translateY(16px); }
.lb-leave-to .lb-box               { transform: scale(.96); }

/* ── Responsive ── */
@media (max-width: 680px) {
  .grid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .thumb-wrap { height: 130px; }
  .card-body { padding: 12px; }
  h3 { font-size: 13px; }
  .desc { display: none; }
}
@media (max-width: 420px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
