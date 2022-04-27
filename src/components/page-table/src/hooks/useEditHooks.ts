import { useStore } from "@/store";
import useGetUserPrice from "@/hooks/useGetUserPrice";

export default function (changeFootMethodCallback?: () => void) {
  const store = useStore();
  const derNumber = computed(
    () => store.state.selectOptions?.paras?.["0"]?.fvalue ?? 1
  );

  const { changeGoodPrice } = useGetUserPrice();

  const handleUpdateModelValue = (val: any, key: string, row: any) => {
    // 如果改变推导性数量
    const ftdqty = key.indexOf("ftdqty") != -1;
    if (ftdqty) {
      changeInferNumber(row);
    }

    // 如果改变多数量
    const fcqty = key.indexOf("fcqty") != -1;
    if (fcqty) {
      changeMoreNumber(row);
    }
    // 可以改变用户价格的字段 fpack fcolor
    const fpack = key.indexOf("fpack") != -1;
    const fcolor = key.indexOf("fcolor") != -1;
    if (fpack || fcolor) {
      return changePrice(row);
    }

    changeAmount(row);
  };

  // 改变推导性数量
  const changeInferNumber = (row: any) => {
    /**
     * 改变推导性数量 同时改变(*)数量 并且需要 / 分母
     */
    const rowKeys = Object.keys(row);
    let moreNumber = 0;
    for (const key of rowKeys) {
      if (!key.indexOf("ftdqty")) {
        moreNumber *= row[key] || 1;
      }
    }
    row.fqty = moreNumber / derNumber.value;
    // changeAmount(row)
  };

  // 改变多数量
  const changeMoreNumber = (row: any) => {
    /**
     * 改变多数量 同时需要改变(+)数量
     */

    let moreNumber = 0;
    let unitNumber = 0;
    for (const key in row) {
      if (!key.indexOf("fcqty")) {
        if (row[key] !== 0) {
          unitNumber++;
        }
        moreNumber += row[key];
      }
    }
    row.fqty = moreNumber;
    row.fjianqty = unitNumber;
    // changeAmount(row)
  };

  const changePrice = async (row: any) => {
    const newRow = await changeGoodPrice(row);
    changeAmount(newRow);
  };

  // 改变金额
  const changeAmount = (row: any) => {
    console.log(row);
    let amount = 0;
    let totalDiscount = 1;
    let totalTjAmount = 0;
    let price = row.fprice;
    let fqty = row.fqty;
    Object.keys(row).forEach((item) => {
      // 正则匹配item fzhekou+n n为数字可能有多个 也可能没有
      const reg = /^fzhekou(\d+)/;
      if (reg.test(item) || item === "fzhekou") {
        totalDiscount *= row[item] / 10;
      } else if (item.indexOf("ftjamount") != -1) {
        totalTjAmount += Number(row[item]);
      }
    });

    amount = price * fqty * totalDiscount + totalTjAmount;
    // console.log(price, fqty, totalDiscount, totalTjAmount);
    row.fweight = row.fqty * row.funitweight;
    row.famount = Math.floor(amount * 100) / 100;
    row.famountbefore = price * fqty + totalTjAmount;
    row.fzhekouamount = row.famountbefore - row.famount;
    const newRow = { ...row };

    changeFootMethodCallback && changeFootMethodCallback();

    return { newRow, totalDiscount, totalTjAmount };
  };

  return {
    handleUpdateModelValue,
  };
}
