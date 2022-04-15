export interface IActiveListType {
  flag: string;
  text: string;
}

export const activeList: IActiveListType[] = [
  {
    flag: "day",
    text: "今天",
  },
  {
    flag: "week",
    text: "本周",
  },
  {
    flag: "month",
    text: "本月",
  },
  {
    flag: "all",
    text: "所有",
  },
];
