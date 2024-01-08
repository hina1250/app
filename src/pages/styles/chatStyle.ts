import { css } from "@emotion/react";
import chatIcon from "../../assets/images/chat.svg";
import chatWhiteIcon from "../../assets/images/chat-white.svg";

export const chatWrapperPositionStyle = css`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-rows: 88px 1fr auto;
  max-width: 600px;
  width: 100%;
  height: 100dvh;
  background-color: #eee;
  overflow: hidden;
`;
export const chatWrapperStyle = css`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px 20px;
`;
export const chatUserStyle = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding-top: 30px;
  padding-bottom: 16px;
  border-bottom: 2px solid #333;
  position: relative;
  top: 0;
  z-index: 20;
  & > a {
    position: relative;
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      content: "";
      width: 150%;
      height: 100%;
      padding: 10px;
      transform: translate(-50%, -50%);
    }
  }
`;
export const userStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  & > p {
    font-size: 20px;
  }
`;
export const dayStyle = css`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
  color: #3c75a7;
  font-size: 15px;
  &:not(:first-child) {
    margin-top: 80px;
  }
`;

export const balloonStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin: 2px 0;
`;

export const messageMarginStyle = css`
  margin: 2px 0 20px;
`;

export const balloonLeftStyle = css`
  justify-content: flex-start;
`;
export const chatStyle = css`
  max-width: 500px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 8px 14px;
  border-radius: 12px;
  background: #333333;
  box-sizing: border-box;
  line-height: 1.5;
  align-items: center;
  color: #fff;
  white-space: pre-wrap;
`;
export const chatFukidashiStyle = css`
  &::after {
    position: absolute;
    bottom: -8px;
    right: -30px;
    width: 30px;
    height: 30px;
    content: "";
    background-image: url(${chatIcon});
    background-repeat: no-repeat;
  }
`;

export const chatLeftStyle = css`
  background: #fff;
  border: 2px solid #333;
  color: #333;
  &::after {
    left: -14px;
    right: auto;
    background-image: url(${chatWhiteIcon});
  }
`;
export const chatFlexStyle = css`
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;
  align-items: flex-end;
`;
export const chatFlexLeftStyle = css`
  flex-direction: row;
`;

export const chatUserFlexStyle = css`
  display: flex;
  gap: 20px;
  align-items: flex-end;
`;
export const chatUserIconStyle = css`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
`;
export const chatUserNoIconStyle = css`
  margin-left: 60px;
`;
export const timeStyle = css`
  color: #8a8a8a;
  font-size: 12px;
  padding-bottom: 2px;
`;
export const formStyle = css`
  display: flex;
  padding: 10px 20px;
  gap: 20px;
  justify-content: space-around;
  align-items: center;
  position: relative;
  left: 50%;
  bottom: 0;
  max-width: 600px;
  width: 100%;
  height: min-content;
  background-color: #fff;
  border-top: 2px solid #333;
  transform: translateX(-50%);
`;
export const inputStyle = css`
  border-radius: 8px;
  min-height: 40px;
  border: 2px solid #333;
  padding: 4px 10px;
  width: 100%;
  position: relative;
  z-index: 1;
  font-size: 15px;
  line-height: 20px;
  overflow-y: hidden;
  resize: none;
`;
