<!-- src/components/SkillsSection.vue — 技能區：依群組顯示技能 chip，資料來源 src/data/profile.js → skillGroups -->
<script setup>
defineProps({ skillGroups: Array });
</script>

<template>
  <section id="skills" class="panel section">
    <div class="section-title-bar" v-reveal>
      <div class="section-dot"></div>
      <h2 class="section-title">技能</h2>
    </div>

    <div class="groups">
      <div
        v-for="(group, i) in skillGroups"
        :key="group.label"
        class="group"
        v-reveal="i * 100"
      >
        <div class="group-label" :style="{ color: group.color }">
          <span class="bar" :style="{ background: group.color }"></span>
          {{ group.label }}
        </div>
        <div class="chip-wrap">
          <div
            v-for="skill in group.skills"
            :key="skill.name"
            class="chip"
            :style="{ '--c': group.color }"
          >
            <span class="skill-name">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.groups {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
}

.group-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: .6px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.bar { width: 4px; height: 16px; border-radius: 2px; flex-shrink: 0; }

.chip-wrap { display: flex; flex-wrap: wrap; gap: 7px; }

.chip {
  background: var(--bg, #f8fafc);
  border: 1.5px solid var(--line, #e2e8f0);
  border-radius: 10px;
  padding: 6px 12px;
  transition: all .18s ease;
  cursor: default;
}
.chip:hover {
  border-color: var(--c, #2563eb);
  background: var(--paper, #fff);
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(0,0,0,.07);
}

.skill-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink, #334155);
}
</style>
