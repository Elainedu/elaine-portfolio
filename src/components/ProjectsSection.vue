<!-- src/components/ProjectsSection.vue — 作品集：類別篩選 tabs + 卡片 Grid + 截圖縮圖燈箱，資料來源 src/data/projects.js -->
<script setup>
import { ref, computed } from "vue";
import { getCategoryStyle } from "../data/projects.js";

const props = defineProps({ projects: Array });

const active   = ref("全部");
const lightbox = ref(null);

// 每張卡片目前顯示的圖片 index
const imgIndex = ref({});
function getIndex(name) { return imgIndex.value[name] ?? 0; }
function setIndex(name, i) { imgIndex.value = { ...imgIndex.value, [name]: i }; }

const categories = computed(() => {
  const seen = new Set();
  return props.projects
    .map((p) => p.category)
    .filter((c) => { if (seen.has(c)) return false; seen.add(c); return true; });
});

const shown = computed(() =>
  active.value === "全部"
    ? props.projects
    : props.projects.filter((p) => p.category === active.value)
);

function openLightbox(img, title) {
  lightbox.value = { ...img, title };
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.value = null;
  document.body.style.overflow = "";
}
</script>

<template>
  <section id="portfolio" class="panel section">

    <div class="section-title-bar" v-reveal>
      <div class="section-dot"></div>
      <h2 class="section-title">作品集</h2>
    </div>
    <p class="section-sub" v-reveal="60">
      共 {{ projects.length }} 個專案，涵蓋系統開發、AI 應用、NLP 與電腦視覺。
    </p>

    <!-- 篩選器 -->
    <div class="filter-row" v-reveal="100">
      <button class="fbtn" :class="{ active: active === '全部' }" @click="active = '全部'">
        全部 <span class="cnt">{{ projects.length }}</span>
      </button>
      <button
        v-for="cat in categories" :key="cat"
        class="fbtn" :class="{ active: active === cat }"
        :style="active === cat ? {
          background:  getCategoryStyle(cat).badge,
          color:       getCategoryStyle(cat).text,
          borderColor: getCategoryStyle(cat).accent + '99'
        } : {}"
        @click="active = cat"
      >{{ cat }}</button>
    </div>

    <!-- 卡片 Grid -->
    <TransitionGroup name="card" tag="div" class="grid">
      <article
        v-for="item in shown" :key="item.name"
        class="card"
        :style="{ '--accent': getCategoryStyle(item.category).accent }"
      >
        <!-- 截圖縮圖區（有圖才顯示） -->
        <div v-if="item.images?.length" class="thumb-area">
          <!-- 主圖 -->
          <div
            class="thumb-main"
            @click="openLightbox(item.images[getIndex(item.name)], item.name)"
          >
            <img
              :src="item.images[getIndex(item.name)].src"
              :alt="item.images[getIndex(item.name)].alt"
              class="thumb-img"
              loading="lazy"
            />
            <div class="thumb-overlay">
              <span class="zoom-hint">點擊放大 🔍</span>
            </div>
          </div>

          <!-- 多圖切換圓點 -->
          <div v-if="item.images.length > 1" class="dots-row">
            <button
              v-for="(img, i) in item.images" :key="i"
              class="dot-btn"
              :class="{ active: getIndex(item.name) === i }"
              @click.stop="setIndex(item.name, i)"
            ></button>
          </div>
        </div>

        <!-- 卡片內容 -->
        <div class="card-body">
          <div class="card-head">
            <span class="emoji">{{ item.emoji }}</span>
            <span class="badge" :style="{
              background: getCategoryStyle(item.category).badge,
              color:      getCategoryStyle(item.category).text,
            }">{{ item.category }}</span>
          </div>

          <h3>{{ item.name }}</h3>
          <p class="obj">{{ item.objective }}</p>

          <p class="impact">
            <span class="check">✓</span>{{ item.impact }}
          </p>

          <div class="stack">
            <span v-for="tech in item.stack" :key="tech">{{ tech }}</span>
          </div>
        </div>
      </article>
    </TransitionGroup>

  </section>

  <!-- 燈箱 -->
  <Teleport to="body">
    <Transition name="lb">
      <div v-if="lightbox" class="lb-backdrop" @click.self="closeLightbox">
        <div class="lb-box">
          <button class="lb-close" @click="closeLightbox" aria-label="關閉">✕</button>
          <img :src="lightbox.src" :alt="lightbox.alt" class="lb-img" />
          <div class="lb-caption">
            <p class="lb-title">{{ lightbox.title }}</p>
            <p class="lb-alt">{{ lightbox.alt }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Filter ── */
.filter-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }

.fbtn {
  background: var(--bg, #f8fafc);
  border: 1.5px solid var(--line, #e2e8f0);
  color: #64748b;
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all .16s ease;
  font-family: inherit; display: flex; align-items: center; gap: 6px;
}
.fbtn:hover:not(.active) { color: #334155; }
.fbtn.active { background: #1e293b; color: #fff; border-color: #1e293b; }
.cnt {
  background: #e2e8f0; color: #64748b;
  border-radius: 999px; padding: 1px 7px; font-size: 11px;
}
.fbtn.active .cnt { background: rgba(255,255,255,.2); color: #fff; }

/* ── Grid ── */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px; position: relative;
}

/* ── Card ── */
.card {
  border: 1px solid var(--line, #e2e8f0);
  border-radius: 16px;
  background: var(--paper, #fff);
  overflow: hidden;
  display: flex; flex-direction: column;
  transition: transform .2s ease, box-shadow .2s ease;
  position: relative;
}
.card::before {
  content: "";
  position: absolute; left: 0; top: 0; right: 0;
  height: 3px;
  background: var(--accent, #2563eb);
  border-radius: 16px 16px 0 0;
}
.card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(15,23,42,.11); }

/* ── 截圖區 ── */
.thumb-area { flex-shrink: 0; }

.thumb-main {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  cursor: pointer;
  background: #f1f5f9;
}
.thumb-img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform .4s ease;
}
.card:hover .thumb-img { transform: scale(1.03); }

.thumb-overlay {
  position: absolute; inset: 0;
  background: rgba(15,23,42,.45);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity .2s ease;
}
.thumb-main:hover .thumb-overlay { opacity: 1; }
.zoom-hint { color: #fff; font-size: 13px; font-weight: 600; }

/* 多圖圓點 */
.dots-row {
  display: flex; justify-content: center; gap: 6px;
  padding: 8px 0 4px;
}
.dot-btn {
  width: 7px; height: 7px; border-radius: 50%;
  border: none; background: var(--line, #e2e8f0);
  cursor: pointer; transition: background .18s ease; padding: 0;
}
.dot-btn.active { background: var(--accent, #2563eb); }

/* ── Card body ── */
.card-body { padding: 18px; display: flex; flex-direction: column; flex: 1; }

.card-head {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;
}
.emoji { font-size: 26px; line-height: 1; }
.badge {
  font-size: 11px; font-weight: 700;
  padding: 3px 10px; border-radius: 999px; white-space: nowrap;
}

h3 { margin: 0 0 8px; font-size: 15px; font-weight: 700; color: var(--ink, #0f172a); line-height: 1.35; }
.obj { margin: 0 0 10px; color: var(--sub, #64748b); font-size: 13px; line-height: 1.65; flex: 1; }

.impact {
  display: flex; align-items: flex-start; gap: 6px;
  margin: 0 0 14px; color: var(--ink, #334155); font-size: 12.5px; line-height: 1.55;
}
.check { color: #16a34a; font-weight: 800; font-size: 14px; flex-shrink: 0; margin-top: 1px; }

.stack { display: flex; flex-wrap: wrap; gap: 5px; margin-top: auto; }
.stack span {
  font-size: 11px; border-radius: 7px; padding: 3px 8px;
  border: 1px solid var(--line, #e2e8f0);
  background: var(--bg, #f8fafc);
  color: var(--sub, #475569); font-weight: 500;
}

/* ── TransitionGroup ── */
.card-enter-active { transition: opacity .35s ease, transform .35s cubic-bezier(.22,.68,0,1.2); }
.card-leave-active { transition: opacity .2s ease; position: absolute; }
.card-enter-from   { opacity: 0; transform: translateY(14px) scale(.97); }
.card-leave-to     { opacity: 0; }
.card-move         { transition: transform .35s ease; }

/* ── Lightbox ── */
.lb-backdrop {
  position: fixed; inset: 0; z-index: 9000;
  background: rgba(10,15,30,.85);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.lb-box {
  background: var(--paper, #fff); border-radius: 20px;
  max-width: 1000px; width: 100%; max-height: 92vh; overflow-y: auto;
  position: relative; box-shadow: 0 40px 100px rgba(0,0,0,.4);
}
.lb-close {
  position: absolute; top: 12px; right: 12px; z-index: 1;
  background: rgba(15,23,42,.1); border: none; border-radius: 50%;
  width: 36px; height: 36px; font-size: 16px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background .18s; color: #334155;
}
.lb-close:hover { background: rgba(15,23,42,.18); }
.lb-img {
  width: 100%; display: block;
  border-radius: 20px 20px 0 0;
  object-fit: contain; background: #f1f5f9;
}
.lb-caption { padding: 14px 20px 20px; }
.lb-title { margin: 0 0 4px; font-size: 15px; font-weight: 700; color: var(--ink, #0f172a); }
.lb-alt   { margin: 0; font-size: 13px; color: var(--sub, #64748b); }

.lb-enter-active, .lb-leave-active { transition: opacity .25s ease; }
.lb-enter-from, .lb-leave-to       { opacity: 0; }
.lb-enter-active .lb-box, .lb-leave-active .lb-box { transition: transform .25s cubic-bezier(.22,.68,0,1.2); }
.lb-enter-from .lb-box { transform: scale(.94) translateY(16px); }
.lb-leave-to   .lb-box { transform: scale(.96); }

/* ── Responsive ── */
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
