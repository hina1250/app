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
