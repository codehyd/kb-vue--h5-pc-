import * as echarts from "echarts";

// import chinaMapData from '../data/china.json'

// echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  // 创建echarts实例
  const echartInstance = echarts.init(el);
  // 设置echarts实例的配置项
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options);
  };

  // 改变数据时候触发
  const updateSize = () => {
    echartInstance.resize();
  };

  // 监听el宽度的变化
  const observer = new ResizeObserver(updateSize);
  observer.observe(el);

  // 改变窗口的时候触发
  window.addEventListener("resize", () => {
    echartInstance.resize();
  });

  return {
    echartInstance,
    setOptions,
    updateSize,
  };
}
