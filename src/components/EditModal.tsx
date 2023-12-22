/** @jsxImportSource @emotion/react */
// ユーザープロフィールの型定義
import { useState } from "react";
import { css } from "@emotion/react";

const modalWrapperStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  z-index: 30;
  background-color: #fff;
  height: 40vh;
  max-width: 500px;
  width: 80vw;
  border: 2px solid #333;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const modalStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const flexStyle = css`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  & > label {
    white-space: nowrap;
  }
  & > input {
    width: 100%;
    max-width: 300px;
    border-radius: 10px;
    border: 1.5px solid #333;
    padding: 12px 20px;
  }
`;

const saveButtonStyle = css`
  border: 2px solid #333;
  border-radius: 100px;
  width: 40%;
  padding: 10px;
  background-color: #333333;
  color: #fff;
  margin-right: auto;
  margin-left: auto;
`;

type UserProfile = {
  name: string;
  comment: string;
  image: string;
};

// 編集モーダルコンポーネント
type EditModalProps = {
  userProfile: UserProfile;
  onSave: (profile: UserProfile) => void;
};

// 編集モーダルコンポーネント
const EditModal: React.FC<EditModalProps> = ({ userProfile, onSave }) => {
  const [editedProfile, setEditedProfile] = useState(userProfile);

  // 画像の変更
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newImage = URL.createObjectURL(event.target.files[0]);
      setEditedProfile({ ...editedProfile, image: newImage });
    }
  };

  // 名前の変更
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProfile({ ...editedProfile, name: event.target.value });
  };

  // コメントの変更
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProfile({ ...editedProfile, comment: event.target.value });
  };

  // 保存処理
  const handleSaveClick = () => {
    onSave(editedProfile);
  };

  return (
    <div css={modalWrapperStyle}>
      <div css={modalStyle}>
        <div css={flexStyle}>
          <label htmlFor="name-input">名前:</label>
          <input
            type="text"
            id="name-input"
            value={editedProfile.name}
            onChange={handleNameChange}
          />
        </div>
        <div css={flexStyle}>
          <label htmlFor="comment-input">コメント:</label>
          <input
            type="text"
            id="comment-input"
            value={editedProfile.comment}
            onChange={handleCommentChange}
          />
        </div>
      </div>

      <button css={saveButtonStyle} onClick={handleSaveClick}>
        保存
      </button>
    </div>
  );
};

export default EditModal;
