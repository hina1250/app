import { css } from "@emotion/react";

export const wrapperStyle = css`
  display: grid;
  gap: 12px;
`;

export const flexStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const buttonStyle = css`
  display: flex;
  position: relative;
  z-index: 1;
  font-weight: bold;
  border-radius: 100px;
  cursor: pointer;
  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 4px;
    border-radius: 100px;
    width: 100%;
    height: 100%;
    border: 1px solid #333;
  }
`;

// クリック時のボタン
export const buttonSelectedStyle = css`
  color: #fff;
`;

export const labelStyle = css`
  background-color: #fff;
  padding: 8px 20px;
  border-radius: 100px;
  border: 1px solid #333;
  transition: background-color 0.2s ease;
`;
export const labelSmallStyle = css`
  padding: 4px 20px;
  font-size: 14px;
`;
