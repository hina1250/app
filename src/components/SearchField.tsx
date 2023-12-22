/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { FC } from "react";
import searchImg from "../assets/images/icon/search.svg";
import {
  departmentListItem,
  roomListItem,
} from "./searched/departmentListItem";
import closeIcon from "../assets/images/icon/close.svg";
import { iconList } from "./searched/iconList";

const wrapperStyle = css`
  display: flex;
  position: relative;
`;

const inputStyle = css`
  border-radius: 100px;
  border: 1px solid #333;
  padding: 15px 20px;
  width: 100%;
  position: relative;
  z-index: 1;
  font-size: 15px;
`;

const disabledStyle = css`
  background-color: #eee;
`;

const inputShadowStyle = css`
  position: absolute;
  z-index: 0;
  top: 6px;
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

const selectedButtonListStyle = css`
  position: absolute;
  z-index: 1;
  top: 50%;
  right: 60px;
  transform: translateY(-50%);
  display: flex;
  gap: 4px;
`;

const selectedButtonStyle = css`
  width: auto;
  font-size: 12px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 5px 16px 5px 10px;
  border-radius: 100px;
  border: 1px solid #333;
  transition: background-color 0.2s ease;
  // 閉じるアイコン
  &::before {
    content: "";
    width: 16px;
    height: 16px;
    background-image: url(${closeIcon});
    background-size: 16px;
    font-family: "Zen Maru Gothic", serif;
  }
`;

type Props = {
  /** 検索欄が非活性か？ */
  isDisabled?: boolean;
  /** 選んだ部署 */
  selectedDepartment: string;
  /** 選んだ部屋 */
  selectedRoom: string;
  /** 選んだアイテム */
  selectedItem: string;
  /** 部署のボタンがクリックされたときの処理 */
  onDepartmentClick: (value: string) => void;
  /** 部屋のボタンがクリックされたときの処理 */
  onRoomClick: (value: string) => void;
  /** 部屋のボタンがクリックされたときの処理 */
  onItemClick: (value: string) => void;
};

const SearchField: FC<Props> = ({
  isDisabled,
  selectedDepartment,
  selectedRoom,
  selectedItem,
  onDepartmentClick,
  onRoomClick,
  onItemClick,
}) => {
  return (
    <div css={wrapperStyle}>
      <input
        css={[inputStyle, isDisabled && disabledStyle]}
        type={"text"}
        placeholder={"検索する"}
        disabled={isDisabled}
      ></input>
      <span css={inputShadowStyle}></span>
      <button css={buttonStyle} type="submit">
        <img src={searchImg} alt="検索する" width={22} height={22} />
      </button>
      <div css={[selectedButtonListStyle]}>
        {/* 選択された部署 */}
        {selectedDepartment && (
          <button
            css={[
              selectedButtonStyle,
              css`
                background-color: ${departmentListItem.find(
                  (item) => item.value === selectedDepartment,
                )?.color};
              `,
            ]}
            onClick={() => {
              onDepartmentClick(selectedDepartment);
            }}
          >
            {selectedDepartment}
          </button>
        )}
        {/* 選択された部屋 */}
        {selectedRoom && (
          <button
            css={[
              selectedButtonStyle,
              css`
                background-color: ${roomListItem.find(
                  (item) => item.value === selectedRoom,
                )?.color};
              `,
            ]}
            onClick={() => {
              onRoomClick(selectedRoom);
            }}
          >
            {selectedRoom}
          </button>
        )}
        {/* 選択されたアイテム */}
        {selectedItem && (
          <button
            css={[
              selectedButtonStyle,
              css`
                background-color: ${iconList.find(
                  (item) => item.value === selectedItem,
                )?.color};
              `,
            ]}
            onClick={() => {
              onItemClick(selectedItem);
            }}
          >
            {selectedItem}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchField;
