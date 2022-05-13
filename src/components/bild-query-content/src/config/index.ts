import { ref } from "vue";

interface IAccountConfigType {
  title: string;
  checked: boolean;
  disabled: boolean;
}

export const accountConfig = ref<IAccountConfigType[]>([
  {
    title: "是否显示批号",
    checked: false,
    disabled: false,
  },
  {
    title: "是否显示附件信息",
    checked: false,
    disabled: false,
  },
  {
    title: "是否显示金额",
    checked: false,
    disabled: false,
  },
  {
    title: "是否显示颜色规格",
    checked: false,
    disabled: false,
  },
]);

interface IAccountMenuConfigType {
  name: string;
  flag: number | string;
  radio: "menu";
}

export const accountMenuConfig: IAccountMenuConfigType[] = [
  { name: "默认", flag: 0, radio: "menu" },
  { name: "订货确认", flag: 1, radio: "menu" },
  { name: "收货确认", flag: 2, radio: "menu" },
];
