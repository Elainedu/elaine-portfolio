// src/composables/useActiveSection.js — 用 IntersectionObserver 監聽各 section 進入視窗，回傳目前 active 的 section id，供導覽列高亮使用
import { ref, onMounted, onUnmounted } from "vue";
export function useActiveSection(ids) {
  const activeSection = ref(ids[0]);
  let observer;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id;
          }
        });
      },
      { root: null, rootMargin: "-28% 0px -58% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  });

  onUnmounted(() => observer?.disconnect());

  return { activeSection };
}
