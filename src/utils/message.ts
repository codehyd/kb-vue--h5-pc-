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
  confirm(message: string, callback: () => void) {
    ElMessageBox.confirm(message, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      callback();
    });
  }
}

export default new message();
