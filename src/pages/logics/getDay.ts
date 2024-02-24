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

// yyyy年mm月dd日 hh:mm で表示する関数
export const formatDateTime2 = (date: Date) => {
  // 年、月、日、時、分を取得
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()は0から始まるため、1を足す
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // 数値を2桁の文字列に変換（例: 5 -> '05'）
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  // フォーマットに従って文字列を組み立て
  const formattedDate = `${year}年${formatNumber(month)}月${formatNumber(
    day,
  )}日 ${formatNumber(hours)}:${formatNumber(minutes)}`;

  return formattedDate;
};
