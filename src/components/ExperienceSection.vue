<!-- src/components/ExperienceSection.vue — 經歷證照：左欄助教工作 timeline、右欄語言 / 資訊證照列表，資料來源 src/data/profile.js → experiences / certificates -->
<script setup>
defineProps({ experiences: Array, certificates: Array });
</script>

<template>
  <section id="credentials" class="panel section">
    <div class="section-title-bar" v-reveal>
      <div class="section-dot"></div>
      <h2 class="section-title">經歷證照</h2>
    </div>

    <div class="layout">
      <!-- ── Timeline ── -->
      <div v-reveal="60">
        <h3 class="subhead">工作經歷</h3>
        <div class="timeline">
          <div
            v-for="(exp, i) in experiences"
            :key="exp.role + exp.period"
            class="item"
          >
            <div class="track">
              <div class="dot"></div>
              <div v-if="i < experiences.length - 1" class="line"></div>
            </div>
            <div class="content">
              <h4>{{ exp.role }}</h4>
              <div class="meta">
                <span class="org">{{ exp.org }}</span>
                <span class="period">{{ exp.period }}</span>
              </div>
              <p class="detail">{{ exp.detail }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Certificates ── -->
      <div v-reveal="120">
        <h3 class="subhead">證照資格</h3>
        <div class="cert-list">
          <div
            v-for="cert in certificates"
            :key="cert.name"
            class="cert-item"
          >
            <span class="cert-icon">{{ cert.type === '語言' ? '🌐' : '💻' }}</span>
            <span class="cert-name">{{ cert.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 36px;
  align-items: start;
}

.subhead {
  margin: 0 0 18px;
  font-size: 11.5px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: .7px;
}

/* Timeline */
.timeline { display: flex; flex-direction: column; }

.item {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 16px;
}

.track { display: flex; flex-direction: column; align-items: center; }

.dot {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  flex-shrink: 0;
  margin-top: 5px;
  box-shadow: 0 0 0 3px rgba(37,99,235,.15);
}

.line {
  width: 2px; flex: 1;
  background: linear-gradient(180deg, #bfdbfe 0%, transparent 100%);
  margin-top: 4px;
  min-height: 16px;
}

.content { padding-bottom: 24px; }

h4 { margin: 0 0 6px; font-size: 15px; font-weight: 700; color: #0f172a; }

.meta {
  display: flex; flex-wrap: wrap; align-items: center;
  gap: 8px; margin-bottom: 8px;
}
.org  { font-size: 13.5px; color: #2563eb; font-weight: 600; }
.period {
  font-size: 12px; color: #94a3b8;
  background: #f8fafc;
  padding: 2px 9px;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  font-weight: 500;
}

.detail { margin: 0; color: #475569; font-size: 13.5px; line-height: 1.65; }

/* Certificates */
.cert-list { display: flex; flex-direction: column; gap: 10px; }

.cert-item {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 13px 15px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: box-shadow .2s ease, transform .2s ease;
}
.cert-item:hover {
  box-shadow: 0 4px 14px rgba(15,23,42,.07);
  transform: translateX(3px);
}

.cert-icon { font-size: 17px; flex-shrink: 0; margin-top: 1px; }
.cert-name { font-size: 13.5px; color: #334155; line-height: 1.55; font-weight: 500; }

@media (max-width: 860px) {
  .layout { grid-template-columns: 1fr; gap: 28px; }
}
</style>
