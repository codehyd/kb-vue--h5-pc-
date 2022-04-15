import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import zh from "dayjs/locale/zh";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.locale(zh);

// 时间戳
export function timestamp() {
  return Math.round(new Date().getTime() / 1000).toString();
}

// 当月第一天
export function firstDay() {
  let time = new Date();
  let month = ("0" + (time.getMonth() + 1)).slice(-2);
  let today = time.getFullYear() + "-" + month + "-01";
  return today;
}

// 当月最后一天
export function lastDay() {
  let date = new Date();
  let currentMonth = date.getMonth();
  let nextMonth = ++currentMonth;
  let nextMonthFirstDay: any = new Date(date.getFullYear(), nextMonth, 1);
  let oneDay = 1000 * 60 * 60 * 24;
  let lasttime = new Date(nextMonthFirstDay - oneDay);
  let lastday = ("0" + lasttime.getDate()).slice(-2);
  let lastmonth = ("0" + (lasttime.getMonth() + 1)).slice(-2);
  let today = lasttime.getFullYear() + "-" + lastmonth + "-" + lastday;
  return today;
}

export function mapDayjsFirstDay() {
  return dayjs(firstDay());
}

export function mapDayjsLastDay() {
  return dayjs(lastDay());
}

// 需要 yyyy-mm-dd h:m:s 格式
export function fromNow(timer: any) {
  return dayjs(timer).fromNow();
}

// 转化为yyyy-mm-dd格式
export function timeConvert(data: Date) {
  const d = new Date(data);
  const resDate =
    d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  return resDate;
}

function p(s: number) {
  return s < 10 ? "0" + s : s;
}

export function toDay() {
  const day = new Date();
  return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
}

// 获取上个月范围
export const getLastMonth = (value: any = null, separate = "-") => {
  // 如果为null,则格式化当前时间
  if (!value) {
    value = Number(new Date());
  }
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (value.toString().length == 10) value *= 1000;
  value = +new Date(Number(value));

  // 获取上个月时间
  const targetTime = new Date(value);
  let year = targetTime.getFullYear();
  let month: any = targetTime.getMonth();
  if (month === 0) {
    month = 12;
    year = year - 1;
  }
  if (month < 10) {
    month = "0" + month;
  }

  const yDate = new Date(year, month, 0);

  const startDateTime = year + separate + month + separate + "01"; //上个月第一天
  const endDateTime = year + separate + month + separate + yDate.getDate(); //上个月最后一天
  return {
    startDateTime: startDateTime,
    endDateTime: endDateTime,
  };
};

export function getDay(day: number) {
  var today = new Date();
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码
  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
}
export function doHandleMonth(month: number) {
  var m: any = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
}
