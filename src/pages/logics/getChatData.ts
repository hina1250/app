// ユーザー名 (localStrageに保存)
import { ChatLog } from "../types/chatLogType";

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

export const getStrTime = (
  message: ChatLog,
  messages: ChatLog[],
  senderId: string,
) => {
  const messageTime = new Date(message.date);

  // 同じ時間に送信され、かつ同じ送信者のメッセージをフィルタリング
  const sameTimeMessages = messages.filter((msg) => {
    const msgTime = new Date(msg.date);
    return (
      messageTime.getDate() === msgTime.getDate() &&
      messageTime.getHours() === msgTime.getHours() &&
      messageTime.getMinutes() === msgTime.getMinutes() &&
      msg.senderId === senderId // 送信者IDもチェック
    );
  });

  // 最後に送信されたメッセージを確認
  if (sameTimeMessages.length > 0) {
    const lastMessage = sameTimeMessages[sameTimeMessages.length - 1];
    if (lastMessage.id === message.id) {
      // 現在のメッセージが最後のメッセージの場合、時間を表示
      return (
        `${messageTime.getHours()}`.padStart(2, "0") +
        ":" +
        `${messageTime.getMinutes()}`.padStart(2, "0")
      );
    }
  }

  // 他のメッセージは時間を表示しない
  return null;
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
    const weekdays = [
      "日曜日",
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
    ];
    return weekdays[inputDate.getDay()];
  }

  // それ以外の場合は日付を返す
  return inputDate.toLocaleDateString();
};
