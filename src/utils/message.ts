import { ElMessage } from "element-plus";

type MessageType = "success" | "warning" | "info" | "error";

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
}

export default new message();
