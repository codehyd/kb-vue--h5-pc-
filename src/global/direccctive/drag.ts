export const elDrag = {
  mounted(el: HTMLElement, bind: any) {
    // 给元素添加拖拽的基本样式
    el.style.cursor = "pointer";
    el.style.position = "absolute";
    const parentNode = el.parentNode as HTMLElement;

    // 1. 防止鼠标移动后触发点击事件
    let moveFlag = false;

    // 给el添加拖拽事件
    el.addEventListener("mousedown", (e: MouseEvent) => {
      console.log("鼠标按下");
      e.preventDefault();
      const move = () => {
        moveFlag = true;
        console.log("鼠标移动");
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
      });
    });
    // 鼠标点击
    el.addEventListener("click", () => {
      if (moveFlag) {
        moveFlag = false;
        return;
      }
      console.log("鼠标点击");
    });
  },
};
