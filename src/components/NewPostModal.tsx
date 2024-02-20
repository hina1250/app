/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { FC, ReactNode } from "react";
import closeIcon from "../assets/images/icon/close-black.svg";
import firebase from "firebase/compat/app";
import db from "../firebaseConfig";
import Modal from "./Modal";

const closeButtonStyle = css`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const formStyle = css`
  display: grid;
  width: 100%;
  gap: 30px;
  & > label {
    display: grid;
    gap: 10px;
    & > input {
      width: 100%;
      border-radius: 10px;
      border: 1.5px solid #333;
      padding: 12px 20px;
    }
    &:last-of-type > input {
      height: 250px;
    }
  }
`;

const buttonStyle = css`
  border: 2px solid #333;
  border-radius: 100px;
  padding: 15px 32px;
  background-color: #333333;
  color: #fff;
  margin-right: auto;
  margin-left: auto;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

type Props = {
  /** 閉じる処理 */
  onClose: () => void;
  /** 投稿タイトル */
  newPostTitle: string;
  /** 投稿 */
  newPost: string;
  /** 投稿タイトルの入力 */
  onNewPostTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 投稿の入力 */
  onNewPostChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const NewPostModal: FC<Props> = ({
  onClose,
  newPost,
  newPostTitle,
  onNewPostTitleChange,
  onNewPostChange,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPost.trim()) return; // 空の投稿を防ぐ

    try {
      // 投稿をデータベースに追加
      await db.collection("posts").add({
        title: newPostTitle,
        content: newPost,
        date: new Date().getTime(), // 投稿日時
        userId: firebase.auth().currentUser?.uid, // ユーザーID
      });

      onClose(); // モーダルを閉じる
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  return (
    <Modal buttonText={"投稿する"}>
      <button css={closeButtonStyle} onClick={onClose}>
        <img src={closeIcon} alt="閉じる" width={40} height={40} />
      </button>
      <div>
        <form onSubmit={handleSubmit} css={formStyle}>
          <label>
            ▼ タイトル
            <input
              type="text"
              value={newPostTitle}
              onChange={onNewPostTitleChange}
              placeholder="タイトルを入力"
            />
          </label>
          <label>
            ▼ 本文
            <input
              type="text"
              value={newPost}
              onChange={onNewPostChange}
              placeholder="投稿内容を入力"
            />
          </label>
          <input type="submit" value={"投稿"} css={buttonStyle}></input>
        </form>
      </div>
    </Modal>
  );
};

export default NewPostModal;
