/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import searchImg from "../assets/images/icon/search.svg";
import { getTime } from "./logics/getChatData";
import firebase from "firebase/compat/app";
import { Post } from "./types/postType";

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
  display: grid;
  grid-template-columns: 56px 1fr 70px;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 15px 18px;
  border-top: 1px solid #333;
  transition: background-color 0.2s ease;
  & > img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: 50%;
  }
  &:last-child {
    border-bottom: 1px solid #333;
  }
  @media (max-width: 500px) {
    grid-template-columns: 56px 1fr 50px;
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
  color: #999;
`;

const messageDateStyle = css`
  white-space: nowrap;
  justify-self: flex-end;
  color: #999;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
const Board = () => {
  const [post, setPost] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsSnapshot = await firebase
        .firestore()
        .collection("posts")
        .orderBy("date", "desc")
        .get();

      const postsWithUserDetails = await Promise.all(
        postsSnapshot.docs.map(async (doc) => {
          const postData = doc.data() as Post;
          const userId = postData.userId;
          const userRef = firebase.firestore().collection("users").doc(userId);
          const userDoc = await userRef.get();
          const userData = userDoc.data();

          return {
            ...postData,
            id: doc.id,
            postId: doc.id,
            date: new Date(postData.date),
            senderImageURL: userData?.image,
            senderName: userData?.name,
          };
        }),
      );

      setPost(postsWithUserDetails);
    };

    fetchPosts();
  }, []);

  return (
    <>
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
          {post
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map((post, index) => (
              <li key={index}>
                <Link to={`/contact/board/${post.postId}`} css={messageStyle}>
                  <img
                    src={post.senderImageURL || undefined}
                    alt={post.senderName}
                    width={56}
                    height={56}
                  />
                  <div css={messageTextAreaStyle}>
                    <p css={messageUserStyle}>{post.title}</p>
                    <p css={messageTextStyle}>{post.content}</p>
                  </div>
                  <span css={messageDateStyle}>{getTime(post.date)}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Board;
