import { useStore } from "@/store";
export default function () {
  const store = useStore();
  const isShowAuthMessage = computed(() => {
    const isShowAuthMessage = store.state.setup.config["pc-form"]?.setup ?? [];
    return (
      isShowAuthMessage.find((item: any) => item.id === "isShowAuthMessage")
        ?.value ?? true
    );
  });
  return {
    isShowAuthMessage,
  };
}
