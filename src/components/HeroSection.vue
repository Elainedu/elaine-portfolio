<!-- src/components/HeroSection.vue — 首屏 Hero：個人照片、名稱打字動畫、統計數字計數、浮動技術 badge、富士山 SVG 背景、星星裝飾 -->
<script setup>
import { ref, onMounted } from "vue";
import { useCounter } from "../composables/useCounter.js";

const props = defineProps({ profile: Object });

// ── 打字動畫 ──
const typedRole = ref("");
onMounted(() => {
  const full = props.profile.role;
  let i = 0;
  const iv = setInterval(() => {
    if (i < full.length) { typedRole.value += full[i++]; }
    else clearInterval(iv);
  }, 38);
});

// ── 數字 counting ──
const statsRef = ref(null);
const counters = (props.profile.stats ?? []).map((s) => {
  const { count, start } = useCounter(s.num, 1400);
  return { ...s, count, start };
});

onMounted(() => {
  const obs = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) { counters.forEach((c) => c.start()); obs.disconnect(); } },
    { threshold: 0.3 }
  );
  if (statsRef.value) obs.observe(statsRef.value);
});

</script>

<template>
  <header class="hero panel">

    <!-- 富士山背景剪影 -->
    <svg class="fuji-bg" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path class="fuji-mountain" d="M300,30 C270,55 220,90 160,140 L60,280 L540,280 L440,140 C380,90 330,55 300,30 Z"/>
      <path class="fuji-snow"    d="M300,30 L330,95 L270,95 Z"/>
      <path class="fuji-snow2"   d="M300,30 L320,72 L280,72 Z"/>
    </svg>

    <!-- 魔法星星（哈利波特風格） -->
    <div class="stars-bg" aria-hidden="true">
      <span class="star s1">✦</span>
      <span class="star s2">✧</span>
      <span class="star s3">✦</span>
      <span class="star s4">✧</span>
      <span class="star s5">✦</span>
      <span class="star s6">✧</span>
    </div>

    <div class="hero-grid">

      <!-- ── 左側：文字 ── -->
      <div class="hero-text" v-reveal>
        <p class="greeting">Hi, 我是</p>
        <h1>{{ profile.name }}</h1>

        <p class="role">
          {{ typedRole }}<span class="cursor" aria-hidden="true">|</span>
        </p>

        <p class="intro">{{ profile.intro }}</p>

        <div class="actions">
          <a class="btn solid" href="#portfolio">查看作品集</a>
          <a class="btn outline" :href="`mailto:${profile.email}`">聯絡我</a>
        </div>

        <div class="stats-row" ref="statsRef">
          <template v-for="(s, i) in counters" :key="s.label">
            <div class="stat-divider" v-if="i > 0"></div>
            <div class="stat">
              <span class="stat-num">{{ s.count }}{{ s.suffix }}</span>
              <span class="stat-label">{{ s.label }}</span>
            </div>
          </template>
        </div>
      </div>

      <!-- ── 右側：照片框 ── -->
      <div class="photo-col" v-reveal="100">
        <div class="photo-wrap">
          <img class="photo" src="/photo.jpg" alt="杜宜霖 Elaine 個人照" />

          <div class="badge-float b1">🐍 Python</div>
          <div class="badge-float b2">🤖 AI / ML</div>
          <div class="badge-float b3">🐱 Django</div>
          <div class="badge-float b4">⚡ LLM</div>
        </div>

        <div class="ring r1"></div>
        <div class="ring r2"></div>
      </div>

    </div>
  </header>
</template>

<style scoped>
/* ── Shell ── */
.hero {
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 55%, #eef4ff 100%);
}
.dark .hero {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 55%, #1a1035 100%);
}

/* ── 富士山背景 ── */
.fuji-bg {
  position: absolute;
  right: -5%;
  bottom: -10%;
  width: 55%;
  max-width: 480px;
  opacity: .055;
  pointer-events: none;
  z-index: 0;
}
.fuji-mountain { fill: #0891b2; }
.fuji-snow     { fill: #ffffff; }
.fuji-snow2    { fill: rgba(255,255,255,.6); }
.dark .fuji-mountain { fill: #60a5fa; }

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 48px;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* ── Text ── */
.hero-text { position: relative; z-index: 1; }

.greeting {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 600;
  color: var(--accent, #2563eb);
  letter-spacing: .5px;
}

h1 {
  margin: 0 0 10px;
  font-size: clamp(32px, 4.8vw, 54px);
  line-height: 1.06;
  font-weight: 900;
  letter-spacing: -.4px;
  background: linear-gradient(135deg, #0f172a 20%, #1d4ed8 65%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.dark h1 {
  background: linear-gradient(135deg, #f1f5f9 20%, #93c5fd 60%, #f59e0b 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.role {
  margin: 0 0 10px;
  color: #475569;
  font-weight: 600;
  font-size: 14.5px;
  min-height: 1.5em;
}
.dark .role { color: #94a3b8; }

.cursor {
  display: inline-block;
  color: #2563eb;
  font-weight: 300;
  animation: blink-cursor 1s step-end infinite;
  margin-left: 1px;
}

.intro {
  margin: 0;
  color: #64748b;
  max-width: 52ch;
  font-size: 15px;
  line-height: 1.65;
}
.dark .intro { color: #94a3b8; }

/* Buttons */
.actions { margin-top: 18px; display: flex; gap: 10px; flex-wrap: wrap; }

.btn {
  text-decoration: none;
  padding: 11px 22px;
  border-radius: 13px;
  font-weight: 700;
  font-size: 14px;
  transition: all .2s ease;
  display: inline-block;
}
.btn:hover { transform: translateY(-2px); }
.btn.solid {
  background: linear-gradient(135deg, #1d4ed8, #2563eb 60%, #d97706);
  color: #fff;
  box-shadow: 0 4px 18px rgba(37,99,235,.38);
}
.btn.solid:hover { box-shadow: 0 8px 28px rgba(37,99,235,.48); }
.btn.outline { border: 1.5px solid #cbd5e1; color: #475569; background: #fff; }
.btn.outline:hover { border-color: #2563eb; color: #2563eb; background: #eff6ff; }
.dark .btn.outline { border-color: #334155; color: #94a3b8; background: transparent; }
.dark .btn.outline:hover { border-color: #60a5fa; color: #60a5fa; background: #1e3a5f20; }

/* Stats */
.stats-row {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid #f1f5f9;
  flex-wrap: wrap;
}
.dark .stats-row { border-color: #334155; }

.stat { text-align: center; }
.stat-num {
  display: block;
  font-size: 24px; font-weight: 800;
  color: #1d4ed8; line-height: 1;
  font-variant-numeric: tabular-nums;
}
.dark .stat-num { color: #60a5fa; }
.stat-label {
  display: block; margin-top: 3px;
  font-size: 11px; color: #94a3b8;
  text-transform: uppercase; letter-spacing: .6px; font-weight: 600;
}
.stat-divider { width: 1px; height: 32px; background: #e2e8f0; }
.dark .stat-divider { background: #334155; }

/* ── 照片欄 ── */
.photo-col {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-wrap {
  position: relative;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  z-index: 1;
}

.photo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: top center;
  border: 4px solid #fff;
  box-shadow: 0 16px 48px rgba(37,99,235,.18);
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px dashed #bfdbfe;
  background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  padding: 20px;
}
.dark .photo-placeholder {
  border-color: #334155;
  background: linear-gradient(135deg, #1e293b 0%, #1a1035 100%);
}

.ph-initials {
  font-size: 52px;
  font-weight: 900;
  color: #93c5fd;
  line-height: 1;
  font-family: "Plus Jakarta Sans", sans-serif;
}

.ph-hint {
  margin: 0;
  font-size: 12px;
  color: #93c5fd;
  line-height: 1.6;
}
.ph-hint code {
  background: rgba(255,255,255,.6);
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 11px;
  color: #3b82f6;
}

/* 浮動技術 badge */
.badge-float {
  position: absolute;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 999px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 700;
  color: #334155;
  box-shadow: 0 4px 14px rgba(15,23,42,.10);
  animation: badge-float 3s ease-in-out infinite;
  white-space: nowrap;
}
.dark .badge-float { background: #1e293b; border-color: #334155; color: #cbd5e1; }
.b1 { top: 5%;   left: -16%; animation-delay: 0s;    color: #1d4ed8; }
.b2 { top: 50%;  right: -20%; animation-delay: 1.1s; color: #7c3aed; }
.b3 { bottom: 5%; left: -12%; animation-delay: 2s;   color: #ec4899; }
.b4 { top: 25%;  right: -18%; animation-delay: .6s;  color: #16a34a; }

/* 裝飾環 */
.ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid rgba(37,99,235,.12);
  pointer-events: none;
}
.r1 { width: 310px; height: 310px; animation: ring-spin 18s linear infinite; }
.r2 { width: 375px; height: 375px; animation: ring-spin 28s linear infinite reverse; border-color: rgba(124,58,237,.08); }

/* ── Keyframes ── */
@keyframes blink-cursor {
  0%, 100% { opacity: 1; } 50% { opacity: 0; }
}
@keyframes badge-float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-7px); }
}
@keyframes ring-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ── 魔法星星 ── */
.stars-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}
.star {
  position: absolute;
  color: #d97706;
  opacity: 0;
  animation: star-twinkle 4s ease-in-out infinite;
  font-size: 12px;
}
.dark .star { color: #f59e0b; }
.s1 { top: 12%; left: 8%;    animation-delay: 0s;    font-size: 10px; }
.s2 { top: 28%; left: 42%;   animation-delay: 1.3s;  font-size: 14px; }
.s3 { top: 8%;  right: 30%;  animation-delay: 0.7s;  font-size: 8px;  }
.s4 { top: 55%; left: 15%;   animation-delay: 2.1s;  font-size: 11px; }
.s5 { top: 75%; right: 38%;  animation-delay: 1.8s;  font-size: 9px;  }
.s6 { top: 40%; right: 8%;   animation-delay: 3s;    font-size: 13px; }
@keyframes star-twinkle {
  0%, 100% { opacity: 0;    transform: scale(.8) rotate(0deg); }
  40%, 60% { opacity: .55;  transform: scale(1.2) rotate(20deg); }
}

/* ── Responsive ── */
@media (max-width: 860px) {
  .hero-grid { grid-template-columns: 1fr; gap: 32px; }
  .photo-wrap { width: 200px; height: 200px; }
  .r1 { width: 240px; height: 240px; }
  .r2 { width: 290px; height: 290px; }
  .fuji-bg { width: 80%; right: -15%; bottom: -5%; opacity: .04; }
}
</style>
