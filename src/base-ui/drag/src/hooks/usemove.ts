function useDrag(
  el: HTMLElement,
  isXscroll: boolean,
  isYscroll: boolean,
  clickCallback?: (() => void) | null
) {
  const lexObj: any = getComputedStyle(el);
  const currentTransition = lexObj.transition;

  let currentMode = "";

  let offsetX: number,
    offsetY: number,
    oL: number,
    oT: number,
    oLeft: number,
    oTop: number;
  // 监听el的鼠标按下事件
  const browser = {
    versions: (function () {
      const u = navigator.userAgent;
      return {
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //判断设备
        //  ..... 其他设备信息
      };
    })(),
  };

  // pc
  if (!browser.versions.mobile) {
    if (el != null) {
      // 拖拽
      el.addEventListener("mousedown", (event: MouseEvent) => {
        currentMode = "mousedown";
        offsetX = event.pageX - el.offsetLeft + parseInt(lexObj["margin-left"]);
        offsetY = event.pageY - el.offsetTop + parseInt(lexObj["margin-right"]);

        const move = function (event: any) {
          currentMode = "mouseover";
          if (el != null) {
            event.stopPropagation();
            event.preventDefault();

            let x = event.pageX - offsetX;
            let y = event.pageY - offsetY;
            const parentElement = el.parentElement as HTMLElement;

            if (isXscroll) {
              if (x < 0) {
                x = 0;
              } else if (x > document.body.clientWidth - el.offsetWidth) {
                x = document.body.clientWidth - el.offsetWidth;
              }
              el.style.left = x + "px";
            }
            if (isYscroll) {
              if (y < 0) {
                y = 0;
              } else if (y > parentElement.clientHeight - el.offsetHeight) {
                y = parentElement.clientHeight - el.offsetHeight;
              }
              el.style.top = y + "px";
            }
          }
          return false;
        };

        document.addEventListener("mouseover", move);
        document.addEventListener("mouseup", () => {
          document.removeEventListener("mouseover", move);
          document.removeEventListener("mouseup", () => {});
        });
      });

      el.addEventListener("click", () => {
        if (currentMode == "mouseover") {
          currentMode = "";
          return;
        }
        clickCallback && clickCallback();
      });
    }
  }
}

export default useDrag;
