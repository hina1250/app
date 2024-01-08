/** @jsxImportSource @emotion/react */
import React, { useState, useMemo, useEffect, FC, useRef } from "react";
import firebase from "firebase/compat/app";
import db from "../firebaseConfig";
import { onSnapshot } from "firebase/firestore";
import sendIcon from "../assets/images/icon/send.svg";
import plusIcon from "../assets/images/icon/plus.svg";
import backIcon from "../assets/images/icon/back.svg";
import searchIcon from "../assets/images/icon/search.svg";
import {
  balloonLeftStyle,
  balloonStyle, chatFlexLeftStyle,
  chatFlexStyle,
  chatFukidashiStyle,
  chatLeftStyle,
  chatStyle,
  chatUserFlexStyle,
  chatUserIconStyle, chatUserNoIconStyle,
  chatUserStyle,
  chatWrapperPositionStyle,
  chatWrapperStyle,
  dayStyle,
  formStyle,
  inputStyle,
  messageMarginStyle,
  timeStyle,
  userStyle,
} from "./styles/chatStyle";
import { formatDateTime } from "./logics/getDay";
import { Link, useParams } from "react-router-dom";
import { getStrTime } from "./logics/getChatData";
import { ChatLog } from "./types/chatLogType";
import { UserIdProfile } from "./types/userProfileType";

const ChatDetail = () => {
  const messagesElementRef = useRef<HTMLDivElement | null>(null);
  const { chatId } = useParams();
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [msg, setMsg] = useState("");
  const loggedInUserId = firebase.auth().currentUser?.uid;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [userInformation, setUserInformation] = useState<UserIdProfile | null>(
    null,
  );

  // チャットルームのIDを生成し、対応するmessagesRefを取得
  const getChatId = async (loggedInUserId: string, chatId: string) => {
    const generatedChatId = [loggedInUserId, chatId].sort().join("-");
    return generatedChatId;
  };

  // メッセージ用の参照を生成（chatIdに基づいて動的に変更）
  const [messagesRef, setMessagesRef] =
    useState<firebase.firestore.CollectionReference | null>(null);

  useEffect(() => {
    (async () => {
      if (loggedInUserId && chatId) {
        const chatroomId = await getChatId(loggedInUserId, chatId);
        const newMessagesRef = db
          .collection("chatroom")
          .doc(chatroomId)
          .collection("messages");
        setMessagesRef(newMessagesRef);
      }
    })();
  }, [loggedInUserId, chatId]);

  // メッセージのリアルタイム監視
  useEffect(() => {
    if (messagesRef) {
      const unsubscribe = onSnapshot(
        messagesRef.orderBy("date", "asc"),
        (querySnapshot) => {
          const updatedMessages = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            senderId: doc.data().senderId,
            msg: doc.data().msg,
            date: new Date(doc.data().date),
          }));
          setChatLogs(updatedMessages); // chatLogsを更新
        },
      );

      return () => {
        unsubscribe(); // コンポーネントがアンマウントされる時に購読を解除
      };
    }
  }, [messagesRef]);

  // ユーザープロフィール情報を取得
  useEffect(() => {
    if (chatId) {
      const getUserInfo = async () => {
        const userDoc = await db.collection("users").doc(chatId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          if (userData) {
            setUserInformation({
              id: userData.id,
              name: userData.name,
              image: userData.image,
              comment: userData.comment,
            });
          }
        }
      };
      getUserInfo();
    }
  }, [chatId]);

  useEffect(() => {
    let unsubscribe = () => {};

    const fetchMessages = async () => {
      if (!loggedInUserId || !chatId) return;

      const chatroomId = await getChatId(loggedInUserId, chatId);
      const messagesRef = db
        .collection("chatroom")
        .doc(chatroomId)
        .collection("messages");

      unsubscribe = onSnapshot(
        messagesRef.orderBy("date", "asc"),
        (querySnapshot) => {
          const updatedMessages = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            senderId: doc.data().senderId,
            msg: doc.data().msg,
            date: new Date(doc.data().date),
          }));
          setChatLogs(updatedMessages);
        },
      );
    };

    fetchMessages().catch(console.error);

    // クリーンアップ関数
    return () => {
      unsubscribe(); // この関数は購読を解除します
    };
  }, [loggedInUserId, chatId]);

  // メッセージ送信機能
  const submitMsg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg.length === 0) {
      return;
    }

    if (loggedInUserId && chatId) {
      const chatroomId = await getChatId(loggedInUserId, chatId);
      const messagesRef = db
        .collection("chatroom")
        .doc(chatroomId)
        .collection("messages");

      await messagesRef.add({
        msg: msg,
        date: new Date().getTime(),
        senderId: loggedInUserId,
      });
      setMsg("");
    }
  };

  // テキストエリアの高さを調整する関数
  useEffect(() => {
    const resizeTextarea = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 12);
      const lines = (msg + "\n").match(/\n/g)?.length || 1;
      textarea.style.height = `${lineHeight * lines}px`;
    };

    resizeTextarea();
  }, [msg]);

  // 新しいメッセージのスクロール
  useEffect(() => {
    if (messagesElementRef.current) {
      messagesElementRef.current.scrollTo({
        top: messagesElementRef.current.scrollHeight,
        behavior: "auto",
      });
    }
  }, [setMsg, chatLogs]);

  // getStrTime関数の結果をメモ化
  const memoizedTimeStamps = useMemo(() => {
    return chatLogs.map((message) => {
      return getStrTime(message, chatLogs, message.senderId);
    });
  }, [chatLogs]);

  return (
    <div css={chatWrapperPositionStyle}>
      <div css={chatUserStyle}>
        <Link to="/contact/chat">
          <img src={backIcon} alt="" />
        </Link>
        <div css={userStyle}>
          <img
            src={userInformation ? userInformation?.image : undefined}
            alt={userInformation?.name}
            css={chatUserIconStyle}
            width={40}
            height={40}
          />
          <p>{userInformation?.name}</p>
        </div>
        <img src={searchIcon}></img>
      </div>

      {/* チャットログ */}
      <div css={chatWrapperStyle} ref={messagesElementRef}>
        {chatLogs.map((item, index) => {
          const isOwnMessage = item.senderId === loggedInUserId;
          // 前のメッセージの日付と比較する
          const isDifferentDay =
            index === 0 ||
            item.date.toDateString() !==
              chatLogs[index - 1].date.toDateString();

          return (
            <React.Fragment key={item.id}>
              {isDifferentDay && (
                // 新しい日付の場合のみ日付を表示
                <p css={dayStyle}>{formatDateTime(item.date)}</p>
              )}
              <div
                css={[
                  balloonStyle,
                  !isOwnMessage && balloonLeftStyle,
                  memoizedTimeStamps[index] && messageMarginStyle,
                ]}
              >
                <div css={[chatFlexStyle, !isOwnMessage && chatFlexLeftStyle]}>
                  <div css={chatUserFlexStyle}>
                    {!isOwnMessage && memoizedTimeStamps[index] && (
                      <img
                        src={
                          userInformation ? userInformation?.image : undefined
                        }
                        alt={userInformation?.name}
                        width={40}
                        height={40}
                        css={[chatUserIconStyle, !memoizedTimeStamps[index] && chatUserNoIconStyle]}
                      />
                    )}
                    <p
                      css={[
                        chatStyle,
                        memoizedTimeStamps[index] && chatFukidashiStyle,
                        !isOwnMessage && chatLeftStyle,
                      ]}
                    >
                      {item.msg}
                    </p>
                  </div>
                  {memoizedTimeStamps[index] && (
                    <span css={timeStyle}>{memoizedTimeStamps[index]}</span>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* メッセージ入力 */}
      <form onSubmit={submitMsg} css={formStyle}>
        <img src={plusIcon} alt="ファイルを追加" />
        <textarea
          value={msg}
          ref={textareaRef}
          onChange={(e) => setMsg(e.target.value)}
          css={inputStyle}
          placeholder={"メッセージを入力"}
        />
        <input type="image" src={sendIcon} alt="" width={32} height={32} />
      </form>
    </div>
  );
};

export default ChatDetail;
