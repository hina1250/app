/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useMemo, useEffect, FC, useRef } from "react";
import firebase from "firebase/compat/app";
import db from "../firebaseConfig";
import sendIcon from "../assets/images/icon/send.svg";
import penIcon from "../assets/images/icon/pen-active.svg";
import clockIcon from "../assets/images/icon/clock.svg";
import backIcon from "../assets/images/icon/back.svg";
import searchIcon from "../assets/images/icon/search.svg";
import {
  balloonLeftStyle,
  balloonStyle,
  chatFlexLeftStyle,
  chatFlexStyle,
  chatFukidashiStyle,
  chatLeftStyle,
  chatStyle,
  chatUserFlexStyle,
  chatUserIconStyle,
  chatUserStyle,
  chatWrapperPositionStyle,
  chatWrapperStyle,
  dayStyle,
  formStyle,
  inputStyle,
  timeStyle,
  userStyle,
} from "./styles/chatStyle";
import { formatDateTime, formatDateTime2 } from "./logics/getDay";
import { Link, useParams } from "react-router-dom";
import { UserIdProfile } from "./types/userProfileType";
import { Post } from "./types/postType";
import { CommentType, CommentWithUserInfo } from "./types/commentType";
import { getStrTime } from "./logics/getChatData";

const postWrapperStyle = css`
  margin-bottom: 160px;
`;

const postInfoStyle = css`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
`;

const postDayStyle = css`
  margin-top: 10px;
  display: flex;
  gap: 6px;
  font-weight: bold;
  color: #3c75a7;
  font-size: 15px;
`;

const postStyle = css`
  display: grid;
  gap: 20px;
  padding: 20px;
  width: 100%;
  font-weight: bold;
`;

const postTitleStyle = css`
  color: #3c75a7;
`;

const postContentStyle = css`
  line-height: 2;
`;

const titleStyle = css`
  max-width: 350px;
  width: 60vw;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const replyTitleStyle = css`
  margin-bottom: 20px;
  font-weight: 400;
`;

const flexStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BoardDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [msg, setMsg] = useState("");
  const [comments, setComments] = useState<CommentWithUserInfo[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const loggedInUserId = firebase.auth().currentUser?.uid;
  const [userInformation, setUserInformation] = useState<UserIdProfile | null>(
    null,
  );

  // コメント送信機能
  const submitMsg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg.length === 0 || !loggedInUserId || !postId) {
      return;
    }
    if (loggedInUserId && postId) {
      const messagesRef = db
        .collection("posts")
        .doc(postId)
        .collection("comments");

      await messagesRef.add({
        msg: msg,
        date: new Date().getTime(),
        senderId: loggedInUserId,
      });
      setMsg("");
    }
  };

  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      const snapshot = await db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("date", "asc")
        .get();
      const commentsWithUserInfo: CommentWithUserInfo[] = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data();
          const userSnapshot = await db
            .collection("users")
            .doc(data.senderId)
            .get();
          const userData = userSnapshot.data();

          return {
            id: doc.id,
            senderId: data.senderId,
            msg: data.msg,
            date: new Date(data.date),
            userName: userData?.name,
            userImage: userData?.image,
          };
        }),
      );

      setComments(commentsWithUserInfo);
    };

    fetchComments();
  }, [postId]);

  // 投稿用の参照を生成（postIdに基づいて動的に変更）
  const [, setPostRef] =
    useState<firebase.firestore.CollectionReference | null>(null);

  useEffect(() => {
    (async () => {
      if (loggedInUserId && postId) {
        const newPostRef = db.collection("posts");
        setPostRef(newPostRef);
      }
    })();
  }, [loggedInUserId, postId]);

  // ユーザープロフィール情報を取得
  useEffect(() => {
    const fetchPostAndUser = async () => {
      if (postId) {
        // postIdを使用して投稿を取得
        const postDoc = await db.collection("posts").doc(postId).get();
        if (postDoc.exists) {
          const postData = postDoc.data();
          // 投稿からuserIdを取得
          const userId = postData ? postData.userId : null;
          // userIdを使用してユーザープロフィール情報を取得
          if (userId) {
            const userDoc = await db.collection("users").doc(userId).get();
            if (userDoc.exists) {
              const userData = userDoc.data();
              if (userData) {
                setUserInformation({
                  id: userDoc.id,
                  name: userData.name,
                  image: userData.image,
                  comment: userData.comment,
                });
              }
            }
          }
        }
      }
    };
    fetchPostAndUser();
  }, [postId, db]);

  // 投稿の取得
  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        const doc = await firebase
          .firestore()
          .collection("posts")
          .doc(postId)
          .get();
        if (doc.exists) {
          const postData = doc.data();
          if (postData) {
            const postDetail: Post = {
              postId: doc.id,
              senderName: postData.senderName,
              title: postData.title,
              content: postData.content,
              senderImageURL: postData.senderImageURL,
              date: new Date(postData.date),
              userId: postData.userId,
            };
            setPost(postDetail); // 単一のオブジェクトをセット
          }
        }
      }
    };

    fetchPost();
  }, [postId]);

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

  // getStrTime関数の結果をメモ化
  const memoizedTimeStamps = useMemo(() => {
    return comments.map((message) => {
      return getStrTime(message, comments, message.senderId);
    });
  }, [comments]);

  return (
    <div css={chatWrapperPositionStyle}>
      <div css={chatUserStyle}>
        <Link to="/contact/board">
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
          <h2 css={titleStyle}>{post?.title}</h2>
        </div>
        <img src={searchIcon}></img>
      </div>

      {/* 投稿 */}
      <div css={chatWrapperStyle}>
        <div css={postWrapperStyle}>
          {post && (
            <React.Fragment>
              <div css={postInfoStyle}>
                <div css={postDayStyle}>
                  <img src={clockIcon} alt="" width={16} height={16} />
                  {formatDateTime2(post.date)}
                </div>
                <div css={postDayStyle}>
                  <img src={penIcon} alt="" width={16} height={16} />
                  {userInformation?.name}
                </div>
              </div>
              <div
                css={[
                  balloonStyle,
                  post.userId !== loggedInUserId && balloonLeftStyle,
                ]}
              >
                <div
                  css={[
                    chatFlexStyle,
                    post.userId !== loggedInUserId && chatFlexLeftStyle,
                  ]}
                >
                  <div css={chatUserFlexStyle}>
                    {post.userId !== loggedInUserId && (
                      <img
                        src={
                          userInformation ? userInformation?.image : undefined
                        }
                        alt={userInformation?.name}
                        width={40}
                        height={40}
                        css={chatUserIconStyle}
                      />
                    )}
                    <div
                      css={[
                        chatStyle,
                        chatFukidashiStyle,
                        post.userId !== loggedInUserId && chatLeftStyle,
                        postStyle,
                      ]}
                    >
                      <h3 css={postTitleStyle}>{post.title}</h3>
                      <p css={postContentStyle}>{post.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
        {/* 返信 */}
        {comments.length > 0 && (
          <div>
            <h3 css={replyTitleStyle}>返信 ({comments.length})</h3>
            <div css={flexStyle}>
              {comments.map((item, index) => {
                const isOwnMessage = item.senderId === loggedInUserId;

                return (
                  <React.Fragment key={item.senderId}>
                    <div
                      css={[balloonStyle, !isOwnMessage && balloonLeftStyle]}
                    >
                      <div
                        css={[
                          chatFlexStyle,
                          !isOwnMessage && chatFlexLeftStyle,
                        ]}
                      >
                        <div css={chatUserFlexStyle}>
                          {!isOwnMessage && (
                            <img
                              src={item.userImage || undefined}
                              alt={item.userName || "Unknown"}
                              width={40}
                              height={40}
                              css={chatUserIconStyle}
                            />
                          )}
                          <p
                            css={[
                              chatStyle,
                              chatFukidashiStyle,
                              !isOwnMessage && chatLeftStyle,
                            ]}
                          >
                            {item.msg}
                          </p>
                        </div>
                        <span css={timeStyle}>{memoizedTimeStamps[index]}</span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 返信入力 */}
      <form onSubmit={submitMsg} css={formStyle}>
        <textarea
          value={msg}
          ref={textareaRef}
          onChange={(e) => setMsg(e.target.value)}
          css={inputStyle}
          placeholder={"返信を入力"}
        />
        <input type="image" src={sendIcon} alt="" width={32} height={32} />
      </form>
    </div>
  );
};

export default BoardDetail;
