/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { FC, ReactNode } from "react";
import closeIcon from "../assets/images/icon/close-black.svg";

const wrapperStyle = css`
  /* モーダルのスタイル */
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 30;
  background-color: #fff;
  height: 70vh;
  max-width: 540px;
  width: 85vw;
  border: 2px solid #333;
  border-radius: 10px;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
`;

const closeButtonStyle = css`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const usersStyle = css`
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

type Props = {
  /** 閉じる処理 */
  onClose: () => void;
  /** 子要素 */
  children: ReactNode;
};

const ChatUserModal: FC<Props> = ({ onClose, children }) => {
  return (
    <div css={wrapperStyle}>
      <button css={closeButtonStyle} onClick={onClose}>
        <img src={closeIcon} alt="閉じる" width={40} height={40} />
      </button>
      {
        children && <div css={usersStyle}>{children}</div>
      }
    </div>
  );
};

export default ChatUserModal;
