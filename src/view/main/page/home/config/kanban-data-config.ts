import { firstDay, lastDay, getLastMonth, getDay } from "@/utils/timer";

export interface IKanbanDataConfigType {
  flag: "month" | "lastMonth" | "lastThirdMonth";
  text: string;
  getDate?: () => any;
}

export const optionConfig: IKanbanDataConfigType[] = [
  {
    flag: "month",
    text: "本月",
    getDate: getMonthDate,
  },
  {
    flag: "lastMonth",
    text: "上个月",
    getDate: getLastMonthDate,
  },
  {
    flag: "lastThirdMonth",
    text: "近三个月",
    getDate: getLastThirdMonthDate,
  },
];

function getMonthDate() {
  return [firstDay(), lastDay()];
}
function getLastMonthDate() {
  return getLastMonth();
}
function getLastThirdMonthDate() {
  return [getDay(-90), getDay()];
}
