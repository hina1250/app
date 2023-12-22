/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { FC } from "react";
import { RecordItemType, userList, UserRecord } from "./userListData";
import { iconList } from "./iconList";
import { formatTime } from "./logic/date";
import { departmentListItem, roomListItem } from "./departmentListItem";

const wrapperStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 30px;
  @media (max-width: 420px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const itemWrapStyle = css`
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  position: relative;
`;

const itemStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-width: 180px;
  width: 100%;
  padding: 30px 20px;
  border: 1.6px solid #333;
  position: relative;
  z-index: 1;
  border-radius: 10px;
  background-color: #fff;
`;

const itemShadowStyle = css`
  position: absolute;
  top: 6px;
  left: 0;
  background-color: #3c75a7;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1.6px solid #333;
  box-sizing: border-box;
`;

const labelStyle = css`
  position: absolute;
  top: -18px;
  left: 50%;
  padding: 8px 24px;
  font-size: 14px;
  white-space: nowrap;
  transform: translateX(-50%);
  background-color: #3c75a7;
  border-radius: 40px;
  border: 1.6px solid #333;
  color: #fff;
`;

const nameWrapStyle = css`
  display: flex;
  gap: 4px;
  font-size: 14px;
  align-items: flex-end;
  justify-content: center;
`;

const nameStyle = css`
  font-size: 24px;
`;

const recordDetailStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const recordDetailIconsStyle = css`
  position: relative;
`;
const recordDetailIconStyle = css`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  border: 1.6px solid #333;
`;
const recordDetailManagerIconStyle = css`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 35%;
  left: 45%;
`;

const dateStyle = css`
  font-size: 14px;
  position: relative;
  display: flex;
  font-weight: bold;
  gap: 8px;
  &::before {
    content: "【";
  }
  &::after {
    content: "】";
  }
`;

type Props = {
  /** 選択された部署 */
  selectedDepartment?: string;
  /** 選択されたユニット */
  selectedRoom?: string;
  /** 選択されたアイテム */
  selectedItem?: RecordItemType;
};

const UserList: FC<Props> = ({
  selectedDepartment,
  selectedRoom,
  selectedItem,
}) => {
  // user.recordsの中で、選択されたアイテムに一致するレコードがあるかどうかを確認する関数
  const hasMatchingRecord = (
    records: UserRecord,
    selectedItem: RecordItemType,
  ) => {
    return (
      selectedItem !== undefined &&
      records &&
      Object.values(records).some(
        (subRecord) => subRecord && subRecord.value === selectedItem,
      )
    );
  };

  return (
    <div css={wrapperStyle}>
      {userList
        .filter(
          (user) =>
            (!selectedDepartment || user.department === selectedDepartment) &&
            (!selectedRoom || user.room === selectedRoom) &&
            (!selectedItem ||
              (user.records && hasMatchingRecord(user.records, selectedItem))),
        )
        .map((user, index) => (
          <div key={index} css={itemWrapStyle}>
            <div css={itemStyle}>
              <span
                css={[
                  labelStyle,
                  user.department &&
                    departmentListItem.map(
                      (item) =>
                        user.department === item.value &&
                        css`
                          background-color: ${item.color};
                        `,
                    ),
                  user.room &&
                    roomListItem.map(
                      (item) =>
                        user.room === item.value &&
                        css`
                          background-color: ${item.color};
                        `,
                    ),
                ]}
              >
                {user.department}
                {user.room}
              </span>

              <p css={nameWrapStyle}>
                <span css={nameStyle}>{user.name}</span>様
              </p>
              {user.records &&
                selectedItem &&
                iconList.find((item) => item.value === selectedItem) && (
                  <div css={recordDetailStyle}>
                    <div css={recordDetailIconsStyle}>
                      <span
                        css={[
                          recordDetailIconStyle,
                          css`
                            background-color: ${iconList.find(
                              (item) => item.value === selectedItem,
                            )?.color};
                          `,
                        ]}
                      >
                        <img
                          alt={selectedItem}
                          src={
                            iconList.find((item) => item.value === selectedItem)
                              ?.selectedIcon
                          }
                          width={22}
                          height={22}
                        />
                      </span>
                      {/* アイコン画像 */}
                      {selectedItem && user.records && (
                        <img
                          src={require(
                            `../../assets/images/manager/${user.records[
                              iconList.find(
                                (item) => item.value === selectedItem,
                              )?.label as keyof typeof user.records
                            ]?.managerThumbnail}.jpg`,
                          )}
                          alt={`最終記録者：${user.records[
                            iconList.find((item) => item.value === selectedItem)
                              ?.label as keyof typeof user.records
                          ]?.manager}`}
                          css={recordDetailManagerIconStyle}
                        />
                      )}
                    </div>
                    <div>
                      {/* 時間 */}
                      {selectedItem && user.records && (
                        <>
                          <p css={dateStyle}>
                            {formatTime(
                              user.records[
                                iconList.find(
                                  (item) => item.value === selectedItem,
                                )?.label as keyof typeof user.records
                              ]?.time || "",
                            )}
                          </p>
                          <p css={dateStyle}>
                            {user.records[
                              iconList.find(
                                (item) => item.value === selectedItem,
                              )?.label as keyof typeof user.records
                            ]?.detail || ""}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}
            </div>
            {/* 影 */}
            <div
              css={[
                itemShadowStyle,
                user.department &&
                  departmentListItem.map(
                    (item) =>
                      user.department === item.value &&
                      css`
                        background-color: ${item.color};
                      `,
                  ),
                user.room &&
                  roomListItem.map(
                    (item) =>
                      user.room === item.value &&
                      css`
                        background-color: ${item.color};
                      `,
                  ),
              ]}
            ></div>
          </div>
        ))}
    </div>
  );
};

export default UserList;
