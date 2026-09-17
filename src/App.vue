<!-- src/App.vue — 根元件：組裝所有 Section、頂部導覽 / 手機 tab active 狀態、深色模式切換（localStorage）、返回頂部按鈕 -->
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import HeroSection        from "./components/HeroSection.vue";
import AboutSection       from "./components/AboutSection.vue";
import SkillsSection      from "./components/SkillsSection.vue";
import ProjectsSection    from "./components/ProjectsSection.vue";
import ExperienceSection  from "./components/ExperienceSection.vue";
import AchievementsSection from "./components/AchievementsSection.vue";
import ActivitiesSection  from "./components/ActivitiesSection.vue";
import ContactSection     from "./components/ContactSection.vue";

import { useActiveSection } from "./composables/useActiveSection.js";
import { profile, skillGroups, experiences, certificates } from "./data/profile.js";
import { projects } from "./data/projects.js";

const navItems = [
  { id: "about",        label: "關於我",   icon: "👤" },
  { id: "skills",       label: "技能",     icon: "⚡" },
  { id: "portfolio",    label: "作品集",   icon: "🗂️" },
  { id: "credentials",  label: "經歷證照",  icon: "🏅" },
  { id: "achievements", label: "成就",     icon: "🏆" },
  { id: "activities",   label: "活動",     icon: "🤝" },
  { id: "contact",      label: "聯絡我",   icon: "✉️" },
];

const { activeSection } = useActiveSection(navItems.map((n) => n.id));

// ── 深色模式 ──
const dark = ref(localStorage.getItem("theme") === "dark");
function toggleDark() {
  dark.value = !dark.value;
  localStorage.setItem("theme", dark.value ? "dark" : "light");
  document.documentElement.classList.toggle("dark", dark.value);
}
onMounted(() => {
  document.documentElement.classList.toggle("dark", dark.value);
});

// ── 返回頂部 ──
const showTop = ref(false);
function onScroll() { showTop.value = window.scrollY > 400; }
onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
function scrollTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

// ── 頁面載入動畫 ──
const loaded = ref(false);
onMounted(() => setTimeout(() => { loaded.value = true; }, 80));

// ── 全頁背景粒子（雪點 + 星點，固定生成避免 hydration 閃動） ──
const bgParticles = Array.from({ length: 40 }, (_, i) => ({
  left: `${(i * 97) % 100}%`,
  top:  `${(i * 61) % 100}%`,   // 星點用；雪點從頂端落下
  size: 2 + (i % 4),             // 2–5 px
  dur:  `${12 + (i * 7 % 16)}s`,
  del:  `-${(i * 3) % 15}s`,
  star: i % 5 === 0,             // 每 5 個一顆星點，其餘雪點
  gold: i % 10 === 0,            // 金色星（harry potter 魔法感）
}));
</script>

<template>
  <!-- ── 全頁浮動粒子（fixed，蓋整個視窗） ── -->
  <div class="global-bg" aria-hidden="true">
    <span
      v-for="(p, i) in bgParticles" :key="i"
      :class="p.star ? (p.gold ? 'gp-star gold' : 'gp-star') : 'gp-snow'"
      :style="{
        left: p.left,
        top:  p.star ? p.top : undefined,
        '--sz':  p.star ? `${p.size + 9}px` : `${p.size}px`,
        '--dur': p.dur,
        '--del': p.del,
      }"
    >{{ p.star ? '✦' : '' }}</span>
  </div>

  <!-- ── 富士山固定剪影（頁面最底層） ── -->
  <div class="fuji-bg" aria-hidden="true">
    <svg viewBox="0 0 1440 520" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
      <!-- 山體 -->
      <path class="fuji-body"
        d="M0,520 L380,210 Q480,60 600,25 Q720,0 840,25 Q960,60 1060,210 L1440,520 Z"/>
      <!-- 雪帽 -->
      <path class="fuji-snow"
        d="M570,200 Q720,10 870,200 L840,275 Q720,75 600,275 Z"/>
    </svg>
  </div>

  <!-- 載入遮罩 -->
  <Transition name="loader">
    <div v-if="!loaded" class="loader-mask">
      <div class="loader-cat">🐱</div>
    </div>
  </Transition>

  <!-- ── 桌面頂部固定導覽 ── -->
  <header class="topnav">
    <div class="topnav-inner">
      <a class="nav-brand" href="#about">Elaine</a>
      <nav class="nav-links">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          :class="{ active: activeSection === item.id }"
        >{{ item.label }}</a>
      </nav>
      <button class="theme-btn" @click="toggleDark" :title="dark ? 'Nox → Lumos' : 'Lumos → Nox'">
        <span class="theme-spell">{{ dark ? '☀️ Lumos' : '🌙 Nox' }}</span>
      </button>
    </div>
  </header>

  <!-- ── 手機底部 tab ── -->
  <nav class="mobile-nav" aria-label="底部導覽">
    <a
      v-for="item in navItems"
      :key="item.id"
      :href="`#${item.id}`"
      :class="{ active: activeSection === item.id }"
    >
      <span class="m-icon">{{ item.icon }}</span>
      <span class="m-label">{{ item.label }}</span>
    </a>
  </nav>

  <!-- ── 頁面主體 ── -->
  <div class="page-wrap">
    <HeroSection :profile="profile" />

    <main class="content-wrap">
      <AboutSection />
      <SkillsSection :skillGroups="skillGroups" />
      <ProjectsSection :projects="projects" />
      <ExperienceSection :experiences="experiences" :certificates="certificates" />
      <AchievementsSection />
      <ActivitiesSection />
      <ContactSection :email="profile.email" />
    </main>
  </div>

  <!-- ── 全寬 Footer CTA ── -->
  <footer class="site-footer">
    <!-- 浮動粒子（櫻花瓣 + 金色星點） -->
    <div class="sfp" aria-hidden="true">
      <i></i><i></i><i></i><i></i><i></i><i></i>
      <i></i><i></i><i></i><i></i><i></i><i></i>
      <i></i><i></i><i></i><i></i><i></i><i></i>
    </div>
    <div class="sf-inner">
      <div class="sf-emoji">🗻</div>
      <h2 class="sf-title">一起合作吧！</h2>
      <p class="sf-sub">有任何想法、合作機會或只是想打個招呼，都歡迎聯絡 👋</p>
      <a href="mailto:dyl890922@gmail.com" class="sf-btn">✉️ dyl890922@gmail.com</a>
      <p class="sf-copy">
        <span class="footer-cat" title="喵～">🐱</span>
        © {{ new Date().getFullYear() }} Elaine · 杜宜霖
      </p>
    </div>
  </footer>

  <!-- ── 返回頂部 ── -->
  <Transition name="fab">
    <button v-if="showTop" class="back-top" @click="scrollTop" title="回到頂部">↑</button>
  </Transition>
</template>

<style>
/* ── 深色模式變數 ── */
.dark {
  --bg:          #0f172a;
  --paper:       #1e293b;
  --ink:         #f1f5f9;
  --sub:         #94a3b8;
  --muted:       #64748b;
  --line:        #334155;
  --accent:      #60a5fa;
  --accent-soft: #1e3a5f20;
  --gold:        #f59e0b;
  --gold-soft:   #78350f30;
  --shadow:      0 4px 20px rgba(0,0,0,.3), 0 2px 6px rgba(0,0,0,.2);
}
.dark body {
  background: var(--bg);
  background-image:
    radial-gradient(ellipse 1000px 550px at 8%   0%,   rgba(96,165,250,.06)  0%, transparent 65%),
    radial-gradient(ellipse 700px  400px at 96%  6%,   rgba(167,139,250,.05) 0%, transparent 60%),
    radial-gradient(ellipse 600px  400px at 50%  100%, rgba(52,211,153,.03)  0%, transparent 60%);
}
.dark .topnav  { background: rgba(15,23,42,.92); border-color: rgba(51,65,85,.7); }
.dark .mobile-nav { background: rgba(15,23,42,.96); border-color: var(--line); }
.dark .panel   { background: var(--paper); border-color: var(--line); }

/* ── 主題切換按鈕 ── */
.theme-btn {
  background: none;
  border: 1.5px solid var(--line);
  border-radius: 999px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--sub);
  transition: all .18s ease;
  flex-shrink: 0;
  white-space: nowrap;
  font-family: inherit;
}
.theme-btn:hover { background: var(--accent-soft); border-color: var(--accent); color: var(--accent); }
.theme-spell { font-size: 12px; }

/* ── 返回頂部按鈕 ── */
.back-top {
  position: fixed;
  bottom: 90px; right: 20px;
  z-index: 500;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  border: none;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(37,99,235,.35);
  display: flex; align-items: center; justify-content: center;
  transition: transform .2s ease, box-shadow .2s ease;
}
.back-top:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(37,99,235,.45); }
.fab-enter-active, .fab-leave-active { transition: opacity .25s, transform .25s; }
.fab-enter-from, .fab-leave-to { opacity: 0; transform: translateY(12px); }

@media (max-width: 680px) { .back-top { bottom: 76px; right: 12px; } }

/* ══════════════════════════════════════
   全頁浮動粒子（雪點 + 星點）
   ══════════════════════════════════════ */
.global-bg {
  position: fixed;
  inset: 0;
  z-index: 3;           /* 面板之上，導覽之下 */
  pointer-events: none;
  overflow: hidden;
}

/* 雪點：從頂端緩緩落下，帶輕微左右漂移 */
.gp-snow {
  position: absolute;
  top: -8px;
  border-radius: 50%;
  width: var(--sz);
  height: var(--sz);
  background: rgba(191, 219, 254, 0.75);   /* 冰藍 */
  box-shadow: 0 0 5px rgba(37, 99, 235, 0.18);
  animation: snow-fall var(--dur) linear var(--del) infinite;
  will-change: transform;
}
.dark .gp-snow {
  background: rgba(226, 232, 240, 0.6);
  box-shadow: 0 0 6px rgba(148, 163, 184, 0.3);
}
/* 每 3 顆略大一點，增加層次感 */
.gp-snow:nth-child(3n) { width: calc(var(--sz) * 1.5); height: calc(var(--sz) * 1.5); opacity: .6; }
.gp-snow:nth-child(5n) { background: rgba(255,255,255,.8); }

@keyframes snow-fall {
  0%   { transform: translateY(-8px) translateX(0px);   opacity: 0; }
  6%   { opacity: 1; }
  92%  { opacity: .7; }
  100% { transform: translateY(102vh) translateX(28px);  opacity: 0; }
}

/* 星點：停在固定位置閃爍 */
.gp-star {
  position: absolute;
  font-size: var(--sz);
  line-height: 1;
  color: #94a3b8;       /* 銀灰星 */
  animation: star-wink var(--dur) ease-in-out var(--del) infinite;
  opacity: 0;
  will-change: opacity, transform;
}
.gp-star.gold { color: #d97706; }  /* 哈利波特金 */
.dark .gp-star       { color: #cbd5e1; }
.dark .gp-star.gold  { color: #fbbf24; }

@keyframes star-wink {
  0%, 100% { opacity: 0;    transform: scale(.5) rotate(0deg);    }
  25%       { opacity: .55;  transform: scale(1)   rotate(12deg);  }
  60%       { opacity: .35;  transform: scale(.8)  rotate(-8deg);  }
}

/* ══════════════════════════════════════
   富士山固定剪影
   ══════════════════════════════════════ */
.fuji-bg {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 52vh;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}
.fuji-bg svg { width: 100%; height: 100%; display: block; }

.fuji-body { fill: rgba(37, 99, 235, 0.04); }
.fuji-snow { fill: rgba(255, 255, 255, 0.07); }

.dark .fuji-body { fill: rgba(96, 165, 250, 0.07); }
.dark .fuji-snow { fill: rgba(255, 255, 255, 0.10); }

/* ── 全寬 Footer CTA ── */
.site-footer {
  position: relative;
  overflow: hidden;
  padding: 72px clamp(20px, 6vw, 120px) 48px;
  background: linear-gradient(180deg, var(--bg) 0%, #dbeafe 55%, #bfdbfe 100%);
  text-align: center;
}
.dark .site-footer {
  background: linear-gradient(180deg, #0f172a 0%, #0e2244 55%, #0c1a38 100%);
}

/* 富士山山脊剪影 */
.site-footer::before {
  content: "";
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 110px;
  background: rgba(37,99,235,.05);
  clip-path: polygon(0 100%, 12% 48%, 28% 72%, 42% 28%, 58% 62%, 74% 38%, 88% 58%, 100% 40%, 100% 100%);
  pointer-events: none;
}
.dark .site-footer::before { background: rgba(96,165,250,.06); }

/* 浮動粒子（雪點 + 星點，與全頁主題一致） */
.sfp { position: absolute; inset: 0; pointer-events: none; }
.sfp i {
  position: absolute;
  display: block;
  border-radius: 50%;
  opacity: 0;
  animation: sfp-rise linear infinite;
}
.sfp i:nth-child(1)  { left:  3%; bottom: 0; width:  6px; height:  6px; background: #bfdbfe; animation-duration: 5s;   animation-delay: 0s;   }
.sfp i:nth-child(2)  { left:  9%; bottom: 0; width:  4px; height:  4px; background: #d97706; animation-duration: 3.8s; animation-delay: .6s;  }
.sfp i:nth-child(3)  { left: 16%; bottom: 0; width:  7px; height:  7px; background: #e0f2fe; animation-duration: 6s;   animation-delay: 1.2s; }
.sfp i:nth-child(4)  { left: 23%; bottom: 0; width:  4px; height:  4px; background: #fbbf24; animation-duration: 3.5s; animation-delay: .3s;  }
.sfp i:nth-child(5)  { left: 31%; bottom: 0; width:  6px; height:  6px; background: #bfdbfe; animation-duration: 4.8s; animation-delay: .9s;  }
.sfp i:nth-child(6)  { left: 39%; bottom: 0; width:  5px; height:  5px; background: #94a3b8; animation-duration: 4.2s; animation-delay: 1.6s; }
.sfp i:nth-child(7)  { left: 46%; bottom: 0; width:  8px; height:  8px; background: #dbeafe; animation-duration: 5.5s; animation-delay: .4s;  }
.sfp i:nth-child(8)  { left: 53%; bottom: 0; width:  4px; height:  4px; background: #d97706; animation-duration: 3.8s; animation-delay: 1.1s; }
.sfp i:nth-child(9)  { left: 60%; bottom: 0; width:  6px; height:  6px; background: #bfdbfe; animation-duration: 4.6s; animation-delay: .7s;  }
.sfp i:nth-child(10) { left: 66%; bottom: 0; width:  5px; height:  5px; background: #fbbf24; animation-duration: 4s;   animation-delay: 2s;   }
.sfp i:nth-child(11) { left: 73%; bottom: 0; width:  7px; height:  7px; background: #e0f2fe; animation-duration: 5.2s; animation-delay: .5s;  }
.sfp i:nth-child(12) { left: 79%; bottom: 0; width:  4px; height:  4px; background: #94a3b8; animation-duration: 3.6s; animation-delay: 1.4s; }
.sfp i:nth-child(13) { left: 84%; bottom: 0; width:  6px; height:  6px; background: #bfdbfe; animation-duration: 4.9s; animation-delay: .8s;  }
.sfp i:nth-child(14) { left: 90%; bottom: 0; width:  5px; height:  5px; background: #d97706; animation-duration: 4.3s; animation-delay: 1.7s; }
.sfp i:nth-child(15) { left: 95%; bottom: 0; width:  7px; height:  7px; background: #dbeafe; animation-duration: 5.8s; animation-delay: .2s;  }
.sfp i:nth-child(16) { left: 12%; bottom: 0; width:  4px; height:  4px; background: #fbbf24; animation-duration: 3.9s; animation-delay: 2.3s; }
.sfp i:nth-child(17) { left: 56%; bottom: 0; width:  5px; height:  5px; background: #bfdbfe; animation-duration: 4.7s; animation-delay: 1.5s; }
.sfp i:nth-child(18) { left: 70%; bottom: 0; width:  4px; height:  4px; background: #94a3b8; animation-duration: 3.4s; animation-delay: 2.6s; }

@keyframes sfp-rise {
  0%   { transform: translateY(0) scale(1);    opacity: 0; }
  10%  { opacity: .8; }
  88%  { opacity: .5; }
  100% { transform: translateY(-160px) scale(.4); opacity: 0; }
}

.sf-inner { position: relative; z-index: 1; }

.sf-emoji {
  font-size: 46px;
  display: inline-block;
  margin-bottom: 14px;
  animation: sf-sway 3.5s ease-in-out infinite;
}
@keyframes sf-sway {
  0%, 100% { transform: rotate(-8deg) scale(1);   }
  50%       { transform: rotate( 8deg) scale(1.1); }
}

.sf-title {
  margin: 0 0 12px;
  font-size: clamp(26px, 5vw, 44px);
  font-weight: 800;
  letter-spacing: -.5px;
  background: linear-gradient(135deg, #0f172a 15%, #2563eb 55%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.dark .sf-title {
  background: linear-gradient(135deg, #f1f5f9 15%, #60a5fa 55%, #f59e0b 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.sf-sub {
  margin: 0 0 28px;
  color: var(--sub);
  font-size: 15.5px;
}

.sf-btn {
  display: inline-block;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: #fff;
  text-decoration: none;
  padding: 13px 32px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 15px;
  box-shadow: 0 6px 24px rgba(37,99,235,.35);
  transition: transform .22s ease, box-shadow .22s ease;
}
.sf-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(37,99,235,.45); }

.sf-copy {
  margin: 28px 0 0;
  font-size: 13px;
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

@media (max-width: 680px) {
  .site-footer { padding: 56px 20px 100px; } /* 100px 避開手機底部 tab */
}

/* ── 載入遮罩 ── */
.loader-mask {
  position: fixed; inset: 0; z-index: 9999;
  background: var(--bg, #f1f5f9);
  display: flex; align-items: center; justify-content: center;
}
.loader-cat {
  font-size: 52px;
  animation: cat-bounce .6s ease infinite alternate;
}
@keyframes cat-bounce {
  from { transform: translateY(0) scale(1); }
  to   { transform: translateY(-16px) scale(1.1); }
}
.loader-enter-active, .loader-leave-active { transition: opacity .4s ease; }
.loader-enter-from, .loader-leave-to { opacity: 0; }

/* ── Footer 貓咪 ── */
.footer-cat {
  font-size: 16px;
  display: inline-block;
  cursor: default;
  transition: transform .3s cubic-bezier(.22,.68,0,1.5);
}
.footer-cat:hover { transform: rotate(-20deg) scale(1.3); }
</style>
