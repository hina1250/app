/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";
import searchImg from "../assets/images/icon/search.svg";
import userIcon from "../assets/images/manager/yamadahanako.jpg";

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
  @media (any-hover: hover) {
    &:hover {
      background-color: #eee;
    }
  }
`;

const messageTextStyle = css`
  width: 100%;
  font-size: 13px;
  display: grid;
  gap: 3px;
`;
const messageUserStyle = css`
  font-size: 16px;
`;

const Board = () => {
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
          <li>
            <Link to="/contact/chat/chat-01" css={messageStyle}>
              <img src={userIcon} alt="" width={56} height={56} />
              <div css={messageTextStyle}>
                <p css={messageUserStyle}>原田 涼子</p>
                <p>連絡</p>
              </div>
              <div>
                <span>13:28</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/contact/chat/chat-01" css={messageStyle}>
              <img src={userIcon} alt="" width={56} height={56} />
              <div css={messageTextStyle}>
                <p css={messageUserStyle}>原田 涼子</p>
                <p>おはよう！</p>
              </div>
              <div>
                <span>13:28</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/contact/chat/chat-01" css={messageStyle}>
              <img src={userIcon} alt="" width={56} height={56} />
              <div css={messageTextStyle}>
                <p css={messageUserStyle}>原田 涼子</p>
                <p>おはよう！</p>
              </div>
              <div>
                <span>13:28</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/contact/chat/chat-01" css={messageStyle}>
              <img src={userIcon} alt="" width={56} height={56} />
              <div css={messageTextStyle}>
                <p css={messageUserStyle}>原田 涼子</p>
                <p>おはよう！</p>
              </div>
              <div>
                <span>13:28</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/contact/chat/chat-01" css={messageStyle}>
              <img src={userIcon} alt="" width={56} height={56} />
              <div css={messageTextStyle}>
                <p css={messageUserStyle}>原田 涼子</p>
                <p>おはよう！</p>
              </div>
              <div>
                <span>13:28</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/contact/chat/chat-01" css={messageStyle}>
              <img src={userIcon} alt="" width={56} height={56} />
              <div css={messageTextStyle}>
                <p css={messageUserStyle}>原田 涼子</p>
                <p>おはよう！</p>
              </div>
              <div>
                <span>13:28</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/contact/chat/chat-01" css={messageStyle}>
              <img src={userIcon} alt="" width={56} height={56} />
              <div css={messageTextStyle}>
                <p css={messageUserStyle}>原田 涼子</p>
                <p>おはよう！</p>
              </div>
              <div>
                <span>13:28</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Board;
