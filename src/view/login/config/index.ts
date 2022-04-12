export const accountData = ref({
  cnstr: "",
  csname: "",
  uname: "",
  upwd: "",
  sns: "",
  authCode: "",
});

export const selectSoftList = [];

export const rules = {
  cnstr: [
    {
      required: true,
      message: "请输入公司名称",
      trigger: "blur",
    },
  ],
  uname: [
    {
      required: true,
      message: "请输入帐套用户名",
      trigger: "blur",
    },
  ],
  sns: [
    {
      required: true,
      message: "请选择软件系统",
      trigger: "change",
    },
  ],
  authCode: [
    {
      required: true,
      message: "请输入验证码",
      trigger: "blur",
    },
  ],
};
