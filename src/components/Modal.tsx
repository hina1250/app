/** @jsxImportSource @emotion/react */
// ユーザープロフィールの型定義
import { useState } from "react";
import { css } from "@emotion/react";
import { UserProfile } from "../pages/types/userProfileType";

const modalWrapperStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  z-index: 30;
  background-color: #fff;
  height: auto;
  max-width: 500px;
  width: auto;
  border: 2px solid #333;
  border-radius: 10px;
  padding: 40px 60px;
  display: flex;
  gap: 40px;
  flex-direction: column;
  justify-content: space-between;
`;

const buttonsStyle = css`
  display: flex;
  gap: 20px;
`;

const buttonStyle = css`
  border: 2px solid #333;
  border-radius: 100px;
  padding: 10px 30px;
  background-color: #333333;
  color: #fff;
  margin-right: auto;
  margin-left: auto;
`;

const cancelButtonStyle = css`
  background-color: #fff;
  color: #333;
`;

// 編集モーダルコンポーネント
type ModalProps = {
  /* テキスト */
  text: string;
  /* ボタンのテキスト */
  buttonText: string;
  /* キャンセル処理 */
  onCancel: () => void;
  /* クリック処理 */
  onClick: () => void;
};

// 編集モーダルコンポーネント
const Modal: React.FC<ModalProps> = ({
  text,
  onCancel,
  onClick,
  buttonText,
}) => {
  return (
    <div css={modalWrapperStyle}>
      <p>{text}</p>
      <div css={buttonsStyle}>
        <button css={[buttonStyle, cancelButtonStyle]} onClick={onCancel}>
          キャンセル
        </button>
        <button css={[buttonStyle]} onClick={onClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
