export const elLoading = {
  mounted(el: HTMLElement) {
    console.log(el);
    // 获取el的父元素
    const parent = el.parentElement;
    // 给el的父元素添加绝对定位
    parent!.style.position = "relative";
  },
};
