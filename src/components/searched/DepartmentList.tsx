/** @jsxImportSource @emotion/react */
import React, { FC } from "react";
import { RadioGroup } from "@headlessui/react";
import {
  buttonSelectedStyle,
  buttonStyle,
  flexStyle,
  labelSmallStyle,
  labelStyle,
  wrapperStyle,
} from "./styles/departmentListStyle";
import { departmentListItem, roomListItem } from "./departmentListItem";
import { css } from "@emotion/react";

type Props = {
  /** 部署のボタンがクリックされたときの処理 */
  onDepartmentClick?: (value: string) => void;
  /** 部屋のボタンがクリックされたときの処理 */
  onRoomClick?: (value: string) => void;
  /** 選んだ部署 */
  selectedDepartment: string;
  /** 選んだ部屋 */
  selectedRoom: string;
};

const DepartmentList: FC<Props> = ({
  onDepartmentClick,
  onRoomClick,
  selectedDepartment,
  selectedRoom,
}) => {
  const handleSelectionChange = (value: string) => {
    onDepartmentClick && onDepartmentClick(value);
  };

  const handleSelectionRoomChange = (value: string) => {
    onRoomClick && onRoomClick(value);
  };

  return (
    <>
      <div css={wrapperStyle}>
        <RadioGroup
          css={flexStyle}
          value={selectedDepartment}
          onChange={handleSelectionChange}
        >
          {departmentListItem.map((item, index) => {
            if (!item) return null;
            return (
              <RadioGroup.Option value={item.value} key={index}>
                {({ checked }) => (
                  <div
                    css={[
                      buttonStyle,
                      css`
                        color: ${item.color};
                        &::after {
                          background-color: ${item.color};
                        }
                      `,
                      checked && buttonSelectedStyle,
                      checked &&
                        css`
                          background-color: ${item.color};
                        `,
                    ]}
                  >
                    <span
                      css={[
                        labelStyle,
                        checked && buttonSelectedStyle,
                        checked &&
                          css`
                            background-color: ${item.color};
                          `,
                      ]}
                    >
                      {item.value}
                    </span>
                  </div>
                )}
              </RadioGroup.Option>
            );
          })}
        </RadioGroup>

        {/* ユニットの部屋一覧 */}
        {selectedDepartment === "ユニット" && (
          <RadioGroup
            css={flexStyle}
            value={selectedRoom}
            onChange={handleSelectionRoomChange}
          >
            {roomListItem.map((item, index) => {
              if (!item) return null;
              return (
                <RadioGroup.Option value={item.value} key={index}>
                  {({ checked }) => (
                    <div
                      css={[
                        buttonStyle,
                        css`
                          color: ${item.color};
                          &::after {
                            background-color: ${item.color};
                          }
                        `,
                        checked && buttonSelectedStyle,
                        checked &&
                          css`
                            background-color: ${item.color};
                          `,
                      ]}
                    >
                      <span
                        css={[
                          labelStyle,
                          labelSmallStyle,
                          checked && buttonSelectedStyle,
                          checked &&
                            css`
                              background-color: ${item.color};
                            `,
                        ]}
                      >
                        {item.value}
                      </span>
                    </div>
                  )}
                </RadioGroup.Option>
              );
            })}
          </RadioGroup>
        )}
        {selectedDepartment === "従来" && <div></div>}
        {selectedDepartment === "デイサービス" && <div></div>}
      </div>
    </>
  );
};

export default DepartmentList;
