<!-- src/components/ContactSection.vue — 聯絡我：Email 連結卡（點擊開啟 mailto）+ 求職狀態提示，email 由 App.vue 從 src/data/profile.js 傳入 -->
<script setup>
defineProps({ email: String });
</script>

<template>
  <section id="contact" class="panel section contact-section" style="scroll-margin-top:32px">
    <div class="inner">
      <div class="section-title-bar center" v-reveal>
        <div class="section-dot"></div>
        <h2 class="section-title">聯絡我</h2>
      </div>

      <p class="section-sub center-text" v-reveal="80">
        如果你正在找能把需求變成可交付成果的工程夥伴，歡迎和我聊聊。
      </p>

      <a
        class="email-card"
        :href="`mailto:${email}`"
        v-reveal="140"
      >
        <span class="e-icon">✉️</span>
        <div>
          <span class="e-label">Email</span>
          <span class="e-value">{{ email }}</span>
        </div>
        <span class="arrow">→</span>
      </a>

      <div class="status" v-reveal="200">
        <span class="status-dot"></span>
        目前正積極尋找工作機會
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: linear-gradient(135deg, #fff 0%, #f0f7ff 60%, #e8f0fe 100%);
}

.inner { max-width: 500px; margin: 0 auto; }

.center { justify-content: center; }
.center-text { text-align: center; margin-bottom: 28px; }

.email-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border-radius: 18px;
  text-decoration: none;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  transition: all .22s ease;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(15,23,42,.05);
}
.email-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 32px rgba(37,99,235,.14);
  border-color: #2563eb;
}

.e-icon { font-size: 28px; flex-shrink: 0; }
.e-label {
  display: block;
  font-size: 10.5px; font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase; letter-spacing: .6px;
  margin-bottom: 3px;
}
.e-value {
  display: block;
  font-size: 15px; font-weight: 700;
  color: #1d4ed8;
}

.arrow {
  margin-left: auto;
  font-size: 20px;
  color: #cbd5e1;
  transition: all .22s ease;
}
.email-card:hover .arrow { color: #2563eb; transform: translateX(4px); }

.status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  font-size: 13.5px;
  color: #475569;
  font-weight: 500;
}
.status-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: status-pulse 2s infinite;
}

@keyframes status-pulse {
  0%, 100% { box-shadow: 0 0 0 2px rgba(34,197,94,.25); }
  50%       { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
}
</style>
