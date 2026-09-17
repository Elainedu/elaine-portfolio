// src/composables/useCounter.js — 數字 counting 動畫：傳入目標值與時長，回傳會從 0 往上跑的 ref，供 HeroSection 統計數字使用
import { ref } from "vue";
export function useCounter(target, duration = 1400) {
  const count = ref(0);

  function start() {
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      count.value = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  return { count, start };
}
