<!-- src/components/ActivitiesSection.vue — 活動經歷：分類 tabs（社團 / 家教）+ 照片卡片，點擊以 Teleport 燈箱放大，資料來源 src/data/activities.js，照片放 public/activities/ -->
<script setup>
import { ref, computed } from "vue";
import { activities, ACTIVITY_TABS } from "../data/activities.js";

const activeTab = ref("all");
const lightbox  = ref(null);  // { src, alt, title }

const shown = computed(() =>
  activeTab.value === "all"
    ? activities
    : activities.filter((a) => a.category === activeTab.value)
);

function openPhoto(item, photo) {
  lightbox.value = { src: photo.src, alt: photo.alt, title: item.title, org: item.org };
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.value = null;
  document.body.style.overflow = "";
}
</script>

<template>
  <section id="activities" class="panel section">

    <!-- 標題 -->
    <div class="section-title-bar" v-reveal>
      <div class="section-dot"></div>
      <h2 class="section-title">活動經歷</h2>
    </div>
    <p class="section-sub" v-reveal="60">
      社團活動統籌與執行、教育部學伴計畫與英文家教，在實踐中累積協作與教學能力。
    </p>

    <!-- Tab 篩選 -->
    <div class="tabs" v-reveal="80">
      <button
        v-for="tab in ACTIVITY_TABS"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        <span>{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </div>

    <!-- 活動卡片 -->
    <TransitionGroup name="act" tag="div" class="act-grid">
      <div
        v-for="item in shown"
        :key="item.title"
        class="act-card"
        :style="{ '--acolor': item.color }"
        v-reveal
      >
        <!-- 標籤列 -->
        <div class="act-header">
          <span class="act-badge" :style="{ background: item.color + '18', color: item.color }">
            {{ item.label }}
          </span>
          <span class="act-period">{{ item.period }}</span>
        </div>

        <!-- 標題 / 機構 -->
        <h3 class="act-title">{{ item.title }}</h3>
        <p class="act-org">{{ item.org }}</p>
        <p class="act-desc">{{ item.desc }}</p>

        <!-- 照片列 -->
        <div class="photo-row">
          <div
            v-for="photo in item.images"
            :key="photo.src"
            class="photo-wrap"
            @click="openPhoto(item, photo)"
          >
            <img :src="photo.src" :alt="photo.alt" class="photo-img" loading="lazy" />
            <div class="photo-overlay">
              <span class="zoom-hint">🔍</span>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>

  </section>

  <!-- ── Lightbox ── -->
  <Teleport to="body">
    <Transition name="lb">
      <div v-if="lightbox" class="lb-backdrop" @click.self="closeLightbox">
        <div class="lb-box">
          <button class="lb-close" @click="closeLightbox" aria-label="關閉">✕</button>
          <img :src="lightbox.src" :alt="lightbox.alt" class="lb-img" />
          <div class="lb-caption">
            <p class="lb-title">{{ lightbox.title }}</p>
            <p class="lb-org">{{ lightbox.org }}</p>
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
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all .18s ease;
  font-family: inherit;
}
.tab-btn:hover:not(.active) { background: #f1f5f9; color: #334155; }
.tab-btn.active { background: #1e293b; color: #fff; border-color: #1e293b; }

/* ── Grid ── */
.act-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  position: relative;
}

/* ── Card ── */
.act-card {
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  transition: box-shadow .22s ease, transform .22s ease;
}
.act-card::before {
  content: "";
  position: absolute;
  left: 0; top: 0;
  width: 4px;
  height: 100%;
  background: var(--acolor, #2563eb);
  border-radius: 16px 0 0 16px;
}
.act-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 36px rgba(15,23,42,.1);
}

.act-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
}

.act-badge {
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
}

.act-period {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 600;
  background: #f8fafc;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
}

.act-title {
  margin: 4px 0 0;
  font-size: 15.5px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.35;
}

.act-org {
  margin: 0;
  font-size: 13px;
  color: #2563eb;
  font-weight: 600;
}

.act-desc {
  margin: 0 0 8px;
  font-size: 13.5px;
  color: #475569;
  line-height: 1.65;
  flex: 1;
}

/* ── Photos ── */
.photo-row {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.photo-wrap {
  position: relative;
  flex: 1;
  aspect-ratio: 4/3;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: #f1f5f9;
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform .3s ease;
}
.photo-wrap:hover .photo-img { transform: scale(1.06); }

.photo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15,23,42,.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity .2s ease;
}
.photo-wrap:hover .photo-overlay { opacity: 1; }
.zoom-hint { font-size: 22px; }

/* ── Transitions ── */
.act-enter-active { transition: opacity .35s ease, transform .35s cubic-bezier(.22,.68,0,1.2); }
.act-leave-active { transition: opacity .2s ease; position: absolute; }
.act-enter-from   { opacity: 0; transform: translateY(14px) scale(.97); }
.act-leave-to     { opacity: 0; }
.act-move         { transition: transform .35s ease; }

/* ── Lightbox ── */
.lb-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: rgba(10,15,30,.82);
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
  max-height: 92vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 32px 80px rgba(0,0,0,.35);
}

.lb-close {
  position: absolute;
  top: 12px; right: 12px;
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
.lb-close:hover { background: rgba(15,23,42,.16); }

.lb-img {
  width: 100%;
  display: block;
  border-radius: 20px 20px 0 0;
  max-height: 65vh;
  object-fit: contain;
  background: #f8fafc;
}

.lb-caption {
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.lb-title { margin: 0; font-size: 15px; font-weight: 700; color: #0f172a; }
.lb-org   { margin: 0; font-size: 13px; color: #2563eb; font-weight: 600; }

.lb-enter-active, .lb-leave-active { transition: opacity .25s ease; }
.lb-enter-from, .lb-leave-to       { opacity: 0; }
.lb-enter-active .lb-box,
.lb-leave-active .lb-box           { transition: transform .25s cubic-bezier(.22,.68,0,1.2); }
.lb-enter-from .lb-box             { transform: scale(.94) translateY(16px); }
.lb-leave-to .lb-box               { transform: scale(.96); }

/* ── Responsive ── */
@media (max-width: 640px) {
  .act-grid { grid-template-columns: 1fr; }
  .photo-row { flex-wrap: wrap; }
  .photo-wrap { min-width: 45%; }
}
</style>
