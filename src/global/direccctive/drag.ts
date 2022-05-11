export const elDrag = {
  mounted(el: HTMLElement, bind: any) {
    el.style.position = "absolute";
    el.style.cursor = "pointer";

    const { x, y, onclick } = bind.value;

    el.addEventListener("mousedown", (e: MouseEvent) => {
      console.log(e);
      // let dragx = e.
    });
  },
};
