// 日付を指定されたフォーマットで表示する関数
export const formatDateTime = (date: Date) => {
  const now = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

  if (
    year === now.getFullYear() &&
    month === now.getMonth() + 1 &&
    day === now.getDate()
  ) {
    // 日付が今日の場合のフォーマット
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `今日（${month}月${day}日：${dayOfWeek}）`;
  } else if (
    year === now.getFullYear() &&
    month === now.getMonth() + 1 &&
    day === now.getDate() - 1
  ) {
    // 日付が昨日の場合のフォーマット
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `昨日（${month}月${day}日：${dayOfWeek}）`;
  } else {
    // 今日または昨日以外の場合のフォーマット
    return `${month}月${day}日`;
  }
};
