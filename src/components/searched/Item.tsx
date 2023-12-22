/** @jsxImportSource @emotion/react */
import React, { FC, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { css } from "@emotion/react";
import { iconList } from "./iconList";
import { RecordItemType } from "./userListData";

const flexStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

const buttonStyle = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const iconStyle = css`
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  border: 1.6px solid #333;
  transition: background-color 0.2s ease;
`;
const iconHoverStyle = css`
  @media (any-hover: hover) {
    &:hover {
      background-color: #ddd;
    }
  }
`;

const labelStyle = css`
  font-size: 11px;
  width: 100%;
  text-align: center;
  padding-top: 2px;
  padding-bottom: 2px;
  border: 1.6px solid #333;
  border-radius: 50px;
  color: #fff;
`;

type Props = {
  /** ボタンがクリックされたときの処理 */
  onClick: (item: RecordItemType) => void;
  /** 選んだアイテム */
  selectedItem: RecordItemType;
};

const DepartmentList: FC<Props> = ({ onClick, selectedItem }) => {
  const handleSelect = (item: RecordItemType) => {
    // 選択されたアイテムを設定
    if (selectedItem !== item) {
      onClick(item);
    }
  };

  return (
    <RadioGroup css={flexStyle} value={selectedItem} onChange={handleSelect}>
      {iconList.map((item, index) => {
        if (!item) return null;

        return (
          <RadioGroup.Option css={buttonStyle} value={item.value} key={index}>
            {({ checked }) => (
              <>
                <span
                  css={[
                    iconStyle,
                    !checked && iconHoverStyle,
                    checked &&
                      css`
                        background-color: ${item.color};
                      `,
                  ]}
                >
                  <img
                    alt={item.label}
                    src={checked ? item.selectedIcon : item.icon}
                  />
                </span>
                <span
                  css={[
                    labelStyle,
                    css`
                      background-color: ${item.color};
                    `,
                  ]}
                >
                  {item.value}
                </span>
              </>
            )}
          </RadioGroup.Option>
        );
      })}
    </RadioGroup>
  );
};

export default DepartmentList;
