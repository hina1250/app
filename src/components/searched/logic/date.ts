// 時間をフォーマットする関数
export const formatTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
