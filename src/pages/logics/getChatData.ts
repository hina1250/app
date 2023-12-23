// ユーザー名 (localStrageに保存)
export const getUName = (): string | null => {
  let userName = localStorage.getItem("firebase-Chat1-username");

  if (!userName) {
    const inputName = window.prompt("ユーザー名を入力してください", "");
    if (inputName && inputName.trim() !== "") {
      localStorage.setItem("firebase-Chat1-username", inputName);
      return inputName;
    } else {
      return null;
    }
  }

  return userName;
};

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const handleLogin = async (email: string, password: string) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    // ログイン成功時の処理
  } catch (error) {
    if (error instanceof Error) {
      console.error("ログイン失敗:", error.message);
    }
    // エラー処理
  }
};

export const getStrTime = (time: Date | number) => {
  let t = new Date(time);
  return (
    `${t.getHours()}`.padStart(2, "0") +
    ":" +
    `${t.getMinutes()}`.padStart(2, "0")
  );
};

export const getTime = (time: Date | number) => {
  // time が number 型の場合は Date 型に変換
  let inputDate = time instanceof Date ? time : new Date(time);
  let currentDate = new Date();

  // 日付の比較のみのために別の Date オブジェクトを作成
  let inputDateWithoutTime = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate(),
  );
  let currentDateWithoutTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  // 日付の差をミリ秒で計算し、日数に変換
  const diffInDays =
    (currentDateWithoutTime.getTime() - inputDateWithoutTime.getTime()) /
    (1000 * 60 * 60 * 24);

  // 日付の差が0（つまり今日）の場合は時刻を返す
  if (diffInDays === 0) {
    return (
      `${inputDate.getHours()}`.padStart(2, "0") +
      ":" +
      `${inputDate.getMinutes()}`.padStart(2, "0")
    );
  }

  // 日付の差が7日未満の場合は曜日を返す
  if (diffInDays < 7) {
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    return weekdays[inputDate.getDay()];
  }

  // それ以外の場合は日付を返す
  return inputDate.toLocaleDateString();
};
