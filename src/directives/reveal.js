// src/directives/reveal.js — 自訂指令 v-reveal：元素捲入視窗時觸發 fade + slide-up 動畫，v-reveal="150" 可指定延遲 ms（stagger 用）
export default {
  mounted(el, binding) {
    const delay = typeof binding.value === "number" ? binding.value : 0;

    // 初始隱藏狀態
    Object.assign(el.style, {
      opacity: "0",
      transform: "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(.22,.68,0,1.2) ${delay}ms`,
      willChange: "opacity, transform",
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          // 動畫結束後清除 will-change 節省記憶體
          el.addEventListener(
            "transitionend",
            () => { el.style.willChange = "auto"; },
            { once: true }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
  },
};
