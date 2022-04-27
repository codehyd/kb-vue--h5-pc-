export const shortcuts = [
  {
    text: "今天",
    value: () => {
      const end = new Date();
      const start = new Date();
      return [start, end];
    },
  },
  {
    text: "本周",
    value: () => {
      const currentDate = new Date();
      const week = currentDate.getDay();
      const millisecond = 1000 * 60 * 60 * 24;
      const minusDay = week != 0 ? week - 1 : 6;
      const monday = new Date(currentDate.getTime() - minusDay * millisecond);
      const sunday = new Date(monday.getTime() + 6 * millisecond);
      return [monday, sunday];
    },
  },
  {
    text: "本月",
    value: () => {
      const start = new Date();
      start.setDate(1);
      var date = new Date();
      var currentMonth = date.getMonth();
      var nextMonth = ++currentMonth;
      var nextMonthFirstDay: any = new Date(date.getFullYear(), nextMonth, 1);
      var oneDay = 1000 * 60 * 60 * 24;
      var lasttime = new Date(nextMonthFirstDay - oneDay);
      var lastday = ("0" + lasttime.getDate()).slice(-2);
      var lastmonth = ("0" + (lasttime.getMonth() + 1)).slice(-2);
      var today = lasttime.getFullYear() + "-" + lastmonth + "-" + lastday;
      return [start, today];
    },
  },
  {
    text: "上月",
    value: () => {
      // 上一个月开始时间
      const gettimeStart = () => {
        const nowdays = new Date();
        let year = nowdays.getFullYear();
        let month: any = nowdays.getMonth();
        if (month === 0) {
          month = 12;
          year = year - 1;
        }

        let firstDayOfPreMonth =
          year + "-" + `${month < 10 ? "0" + month : month}` + "-" + "01";
        firstDayOfPreMonth = firstDayOfPreMonth.toString();
        return new Date(firstDayOfPreMonth);
      };

      // 上一个月结束时间
      const gettimeEnd = () => {
        const nowdays = new Date();
        let year = nowdays.getFullYear();
        let month: any = nowdays.getMonth();
        if (month === 0) {
          month = 12;
          year = year - 1;
        }

        const lastDay = new Date(year, month, 0);
        let lastDayOfPreMonth =
          year +
          "-" +
          `${month < 10 ? "0" + month : month}` +
          "-" +
          lastDay.getDate();
        lastDayOfPreMonth = lastDayOfPreMonth.toString();
        return new Date(lastDayOfPreMonth);
      };

      const start = gettimeStart();
      const end = gettimeEnd();
      return [start, end];
    },
  },
  {
    text: "最近一周",
    value: () => {
      const start = new Date();
      const end = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "最近一个月",
    value: () => {
      const start = new Date();
      const end = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "最近三个月",
    value: () => {
      const start = new Date();
      const end = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];
