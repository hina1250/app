/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import db from "../firebaseConfig";
import { images } from "./Data/defaultChatData";
import { getStrTime } from "./logics/getChatData";
import firebase from "firebase/compat/app";
import searchImg from "../assets/images/icon/search.svg";
import {Message} from "./types/messageType";

const wrapperStyle = css`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  padding-bottom: 90px;
`;
const searchStyle = css`
  display: flex;
  position: relative;
  width: 90%;
  margin: 0 auto;
`;

const inputStyle = css`
  border-radius: 100px;
  border: 1px solid #333;
  padding: 12px 20px;
  width: 100%;
  position: relative;
  z-index: 1;
  font-size: 15px;
`;

const inputShadowStyle = css`
  position: absolute;
  z-index: 0;
  top: 5px;
  border-radius: 100px;
  width: 100%;
  height: 100%;
  background-color: #333;
`;

const buttonStyle = css`
  position: absolute;
  z-index: 1;
  top: 50%;
  right: 15px;
  cursor: pointer;
  transform: translateY(-50%);
  padding: 10px;
`;

const messageListStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const messageStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 15px 18px;
  border-top: 1px solid #333;
  transition: background-color 0.2s ease;
  & > img {
    border-radius: 50%;
  }
  &:last-child {
    border-bottom: 1px solid #333;
  }
  @media (any-hover: hover) {
    &:hover {
      background-color: #eee;
    }
  }
`;

const messageTextAreaStyle = css`
  width: 100%;
  display: grid;
  gap: 3px;
`;
const messageUserStyle = css`
  font-size: 16px;
`;
const messageTextStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
`;

const Chat = () => {
  const [lastMessages, setLastMessages] = useState<Message[]>([]);
  const loggedInUserId = firebase.auth().currentUser?.uid;

  useEffect(() => {
    // Firestoreからユーザー一覧を取得
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        const promises: Promise<void>[] = [];

        querySnapshot.forEach((userDoc) => {
          const userId = userDoc.id;
          const userName = userDoc.data().name;
          const userImage = userDoc.data().image;

          // このユーザーとのチャットルームIDを生成
          const chatroomId = [loggedInUserId, userId].sort().join("-");

          // 各ユーザーの最新メッセージを取得するプロミスを作成
          const promise = db
            .collection("chatroom")
            .doc(chatroomId)
            .collection("messages")
            .orderBy("date", "desc")
            .limit(1)
            .get()
            .then((messageSnapshot) => {
              const messageDoc = messageSnapshot.docs[0];
              if (messageDoc) {
                const newMessage = {
                  sessionId: userId,
                  id: messageDoc.id,
                  name: userName,
                  msg: messageDoc.data().msg,
                  imageURL: userImage,
                  date: new Date(messageDoc.data().date),
                };

                // 既存のメッセージを更新（または新しいメッセージを追加）
                setLastMessages((prevMessages) => {
                  const existingIndex = prevMessages.findIndex(
                    (msg) => msg.sessionId === userId,
                  );

                  if (existingIndex >= 0) {
                    // 既存のメッセージを新しいもので置き換える
                    const updatedMessages = [...prevMessages];
                    updatedMessages[existingIndex] = newMessage;
                    return updatedMessages;
                  } else {
                    // 新しいメッセージを追加する
                    return [...prevMessages, newMessage];
                  }
                });
              }
            });

          promises.push(promise);
        });

        // すべてのプロミスが解決されるのを待つ
        return Promise.all(promises);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [loggedInUserId]);


  return (
    <div css={wrapperStyle}>
      <div css={searchStyle}>
        <input
          css={[inputStyle]}
          type={"text"}
          placeholder={"検索する"}
        ></input>
        <span css={inputShadowStyle}></span>
        <button css={buttonStyle} type="submit">
          <img src={searchImg} alt="検索する" width={22} height={22} />
        </button>
      </div>
      <ul css={messageListStyle}>
        {lastMessages
          .filter((message) => message.sessionId !== loggedInUserId)
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .map((message) => (
            <li key={message.sessionId}>
              <Link
                to={`/contact/chat/${message.sessionId}`}
                css={messageStyle}
              >
                <img
                  src={message.imageURL || undefined}
                  alt={message.name}
                  width={56}
                  height={56}
                />
                <div css={messageTextAreaStyle}>
                  <p css={messageUserStyle}>{message.name}</p>
                  <p css={messageTextStyle}>{message.msg}</p>
                </div>
                <span>{getStrTime(message.date)}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Chat;
