import { App } from "vue";

// 实现自定义拖拽的自定义指令
const drag = {
  mounted(el: HTMLElement) {
    // 如果窗口发生改变，则重新计算拖拽范围
    window.addEventListener("resize", () => {
      // el.style.left = "";
      el.style.top = "60px";
    });

    const transition = getComputedStyle(el).transition;
    el.onmousedown = (e) => {
      let disY = e.clientY - el.offsetTop;
      el.style.transition = "none";
      // pc端拖拽
      document.onmousemove = (e) => {
        let top = e.clientY - disY;
        if (top < 0) {
          top = 0;
        } else if (top > el.parentElement!.offsetHeight - el.offsetHeight) {
          top = el.parentElement!.offsetHeight - el.offsetHeight;
        }
        el.style.top = top + "px";
      };

      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
        el.style.transition = transition;
      };
    };

    // 移动端拖拽
    el.addEventListener("touchstart", (e) => {
      let touch = e.touches[0];
      let disY = touch.clientY - el.offsetTop;
      el.style.transition = "none";
      el.addEventListener("touchmove", (e) => {
        let top = e.touches[0].clientY - disY;
        if (top < 0) {
          top = 0;
        } else if (top > el.parentElement!.offsetHeight - el.offsetHeight) {
          top = el.parentElement!.offsetHeight - el.offsetHeight;
        }
        el.style.top = top + "px";
      });

      el.addEventListener("touchend", (e) => {
        el.removeEventListener("touchmove", null!);
        el.removeEventListener("touchend", null!);
        el.style.transition = transition;
      });
    });
  },
};

export default function (app: App): void {
  app.directive("drag", drag);
}
