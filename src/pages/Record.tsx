/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import SearchField from "../components/SearchField";
import Item from "../components/searched/Item";
import UserList from "../components/searched/UserList";
import { RecordItemType } from "../components/searched/userListData";
import DepartmentList from "../components/searched/DepartmentList";
import plusIcon from "../assets/images/icon/plus.svg";

const wrapperStyle = css`
  max-width: 600px;
  margin: 0 auto;
  padding: 30px 18px 150px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  min-height: 100vh;
`;

const flexStyle = css`
  display: flex;
`;

const titleWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;
const titleStyle = css`
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  color: #333;
`;

const fieldStyle = css`
  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

const searchTitleStyle = css`
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
`;

const resultTitleStyle = css`
  margin-bottom: 18px;
`;

const Record = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedItem, setSelectedItem] = useState<RecordItemType | "">("");

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartment(department);
    setSelectedRoom("");
  };
  const handleRoomChange = (room: string) => {
    setSelectedRoom(room);
  };
  const handleItemChange = (item: RecordItemType | "") => {
    setSelectedItem(item);
  };

  // 部署の選択の解除
  const handleDepartmentSelectReset = () => {
    setSelectedDepartment("");
    setSelectedRoom("");
  };

  // ユニット：部屋の選択の解除
  const handleRoomSelectReset = () => {
    setSelectedRoom("");
  };

  // アイテムの選択の解除
  const handleItemSelectReset = () => {
    setSelectedItem("");
  };

  return (
    <div css={wrapperStyle}>
      <div css={titleWrapperStyle}>
        <h1 css={titleStyle}>記録</h1>
        <button>
          <img src={plusIcon} alt="追加" />
        </button>
      </div>
      {/* 検索 */}
      <div css={fieldStyle}>
        <SearchField
          selectedDepartment={selectedDepartment}
          selectedRoom={selectedRoom}
          selectedItem={selectedItem}
          onDepartmentClick={handleDepartmentSelectReset}
          onRoomClick={handleRoomSelectReset}
          onItemClick={handleItemSelectReset}
          isDisabled={!!selectedDepartment || !!selectedRoom || !!selectedItem}
        />
      </div>

      {/* 部署 */}
      <div css={fieldStyle}>
        <div css={flexStyle}>
          <h2 css={searchTitleStyle}>▼ 部署</h2>
          <button onClick={handleDepartmentSelectReset}>解除する</button>
        </div>
        <DepartmentList
          onDepartmentClick={handleDepartmentChange}
          onRoomClick={handleRoomChange}
          selectedDepartment={selectedDepartment}
          selectedRoom={selectedRoom}
        />
      </div>

      {/* 項目 */}
      <div css={fieldStyle}>
        <div css={flexStyle}>
          <h2 css={searchTitleStyle}>▼ 項目</h2>
          <button onClick={handleItemSelectReset}>解除する</button>
        </div>
        <Item onClick={handleItemChange} selectedItem={selectedItem} />
      </div>

      {/* 検索結果 */}
      <div css={fieldStyle}>
        <h2 css={[searchTitleStyle, resultTitleStyle]}>▼ 検索結果</h2>
        <UserList
          selectedDepartment={selectedDepartment}
          selectedRoom={selectedRoom}
          selectedItem={selectedItem}
        />
      </div>
    </div>
  );
};

export default Record;
