import { App } from "vue";
import { elDrag } from "./drag";
import { elLoading } from "./loading";

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

const tabScroll = {
  mounted(el: HTMLElement, bind: any) {
    // 获取子元素的所有高度并且存放到数组里
    const children = el.children;
    const childrenHeight: number[] = [];
    for (let i = 0; i < children.length; i++) {
      childrenHeight.push((children[i] as HTMLElement).offsetHeight);
    }

    // 监听滚动事件
    el.addEventListener("scroll", () => {
      console.log(bind);
    });
  },
};

const inlineFormCol = {
  mounted(el: HTMLElement, bind: any) {
    // 拿到el的style.flex属性
    const flex = getComputedStyle(el).flex;
    const value = bind.value;
    // 如果value = true，则设置el的style.flex属性为none 否则为flex
    el.style.flex = value ? "none" : flex;
  },
};

export default function (app: App): void {
  app.directive("drag", drag);
  app.directive("elDrag", elDrag);
  app.directive("elLoading", elLoading);
  app.directive("tabScroll", tabScroll);
  app.directive("inlineFormCol", inlineFormCol);
}
