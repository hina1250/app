import { css } from "@emotion/react";
import chatIcon from "../../assets/images/chat.svg";
import chatWhiteIcon from "../../assets/images/chat-white.svg";

export const chatWrapperPositionStyle = css`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  max-width: 600px;
  width: 100%;
  height: 100dvh;
  background-color: #eee;
  overflow: hidden;
`;
export const chatWrapperStyle = css`
  width: 100%;
  bottom: 60px;
  overflow-y: scroll;
  position: absolute;
  padding: 160px 30px 30px;
  height: 100vh;
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
  position: fixed;
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
    margin-top: 100px;
  }
`;
export const balloonStyle = css`
  margin: 20px 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
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
  gap: 4px;
  flex-direction: column;
  align-items: flex-end;
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
export const timeStyle = css`
  color: #8a8a8a;
  font-size: 12px;
`;
export const formStyle = css`
  display: flex;
  padding: 40px 20px;
  gap: 20px;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  left: 50%;
  bottom: 0;
  max-width: 600px;
  width: 100%;
  height: 80px;
  background-color: #fff;
  border-top: 2px solid #333;
  transform: translateX(-50%);
`;
export const inputStyle = css`
  border-radius: 100px;
  border: 2px solid #333;
  padding: 15px 20px;
  width: 100%;
  position: relative;
  z-index: 1;
  font-size: 15px;
`;
