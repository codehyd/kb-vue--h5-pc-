class format {
  // 格式化金额千分位
  formatMoney(money: number): string {
    if (!money) return "0.00";
    let str = (money / 100).toFixed(2) + "";
    let intSum = str
      .substring(0, str.indexOf("."))
      .replace(/\B(?=(?:\d{3})+$)/g, ","); //取到整数部分
    let dot = str.substring(str.length, str.indexOf(".")); //取到小数部分搜索
    let ret = intSum + dot;
    return ret;
    // money = money * 100;
    // return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default new format();
