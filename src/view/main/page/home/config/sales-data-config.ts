export interface IActiveListType {
  flag: "week" | "month" | "lastmonth" | "year" | "lastyear";
  text: string;
}

export const activeList: IActiveListType[] = [
  {
    flag: "week",
    text: "本周",
  },
  {
    flag: "month",
    text: "本月",
  },
  {
    flag: "lastmonth",
    text: "上月",
  },
  {
    flag: "year",
    text: "本年",
  },
  {
    flag: "lastyear",
    text: "上年",
  },
];
