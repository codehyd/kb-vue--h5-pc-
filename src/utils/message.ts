import { ElMessage, ElMessageBox } from "element-plus";

export type MessageType = "success" | "warning" | "info" | "error";

class message {
  show(message: string, type: MessageType = "info") {
    ElMessage({
      message,
      type,
    });
  }

  error(message: string) {
    ElMessage({
      message,
      type: "error",
    });
  }
  success(message: string) {
    ElMessage({
      message,
      type: "success",
    });
  }

  // 消息提示框
  confirm(message: string, callback: () => void, catchBack?: () => void) {
    ElMessageBox.confirm(message, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        callback && callback();
      })
      .catch(() => {
        catchBack && catchBack();
      });
  }

  // 消息输入提示框
  prompt(
    content: string,
    title: string,
    inputPattern?: RegExp,
    errorMessage: string = "输入信息错误"
  ) {
    return new Promise<string>((resolve, reject) => {
      ElMessageBox.prompt(content, title, {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        inputPattern,
        inputErrorMessage: errorMessage,
      })
        .then(({ value }) => {
          if (!value) {
            return ElMessage({
              type: "info",
              message: "请输入内容",
            });
          }
          resolve(value);
        })
        .catch(() => {
          reject(false);
        });
    });
  }

  // 消息输入提示框
  messageBox(
    title: string,
    content: string,
    type?: MessageType,
    dangerouslyUseHTMLString?: boolean,
    isShowCancelBtn: boolean = true,
    isShowClose: boolean = true,
    confirmSuccessText?: string,
    cancelSuccessText?: string
  ) {
    return new Promise((resolve, reject) => {
      ElMessageBox.confirm(content, title, {
        confirmButtonText: confirmSuccessText,
        cancelButtonText: cancelSuccessText ?? "确定",
        showCancelButton: isShowCancelBtn ?? "取消",
        showClose: isShowClose,
        dangerouslyUseHTMLString: dangerouslyUseHTMLString ?? false,
        type,
      })
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    });
  }
}

export default new message();
