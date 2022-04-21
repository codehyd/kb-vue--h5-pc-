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
}

export default new message();
