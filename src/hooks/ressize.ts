export default function () {
  const changeMountResize = (callback: () => void, isOnce?: boolean) => {
    onMounted(() => {
      if (isOnce) {
        callback && callback();
      }
      // 监听窗口大小变化
      window.addEventListener("resize", () => {
        callback && callback();
      });
    });
  };

  return {
    changeMountResize,
  };
}
