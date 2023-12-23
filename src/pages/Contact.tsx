/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { FC, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import plusIcon from "../assets/images/icon/plus.svg";
import ChatUserModal from "../components/ChatUserModal";
import { UserIdProfile } from "./types/userProfileType";
import firebase from "firebase/compat/app";
import db from "../firebaseConfig";

const wrapperStyle = css`
  max-width: 600px;
  margin: 0 auto;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  min-height: 100vh;
  position: relative;
`;

const titleWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > button {
    padding-right: 18px;
  }
`;

const titleStyle = css`
  font-size: 20px;
  font-weight: bold;
  padding: 10px 26px;
  color: #333;
`;

const tabListStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 15px;
`;

const tabStyle = css`
  background-color: #eee;
  border-top: 1px solid #333;
  border-left: 1px solid #333;
  border-right: 1px solid #333;
  padding: 10px 60px 6px;
  position: relative;
  bottom: 0;
  border-radius: 6px 6px 0 0;
  z-index: 0;
`;

const selectedTabStyle = css`
  background-color: #fff;
  top: 4px;
  padding: 10px 60px;
  &::after {
    position: absolute;
    left: -2px;
    bottom: -7px;
    content: "";
    width: 120%;
    height: 10px;
    background-color: #fff;
  }
`;

const tabPanelStyle = css`
  background-color: #fff;
  border-top: 1px solid #333;
`;

const listStyle = css`
  display: grid;
  grid-template-columns: 56px 1fr;
  grid-template-rows: 56px;
  align-items: center;
  justify-items: flex-start;
  gap: 16px;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.2s;
  @media (any-hover: hover) {
    &:hover {
      background-color: #eee;
    }
  }
`;

const listTextStyle = css`
  text-align: left;
`;

const modalUserIconStyle = css`
  border-radius: 50%;
  width: 56px;
  height: 56px;
  object-fit: cover;
`;
const modalUserNameStyle = css`
  font-size: 16px;
  margin-bottom: 2px;
`;
const modalUserCommentStyle = css`
  font-size: 12px;
  color: #666666;
`;


const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<UserIdProfile[]>([]);
  const loggedInUserId = firebase.auth().currentUser?.uid;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await db.collection("users").get();
      const usersData = usersSnapshot.docs
        .filter((doc) => doc.id !== loggedInUserId) // ログインユーザーを除外
        .map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          image: doc.data().image,
          comment: doc.data().comment,
        }));
      setUsers(usersData);
    };

    fetchUsers();
  }, [loggedInUserId]);

  const handleUserSelect = (userId: string) => {
    // ユーザーを選択したときの処理
    navigate(`/contact/chat/${userId}`);
  };

  return (
    <div css={wrapperStyle}>
      <div css={titleWrapperStyle}>
        <h1 css={titleStyle}>連絡</h1>
        <button onClick={() => setIsModalOpen(true)}>
          <img src={plusIcon} alt="追加" />
        </button>
      </div>

      <Tab.Group>
        <Tab.List css={tabListStyle}>
          <Tab as={Link} to="chat">
            {({ selected }) => (
              <div css={[tabStyle, selected && selectedTabStyle]}>
                <p>メッセージ</p>
              </div>
            )}
          </Tab>
          <Tab as={Link} to="board">
            {({ selected }) => (
              <div css={[tabStyle, selected && selectedTabStyle]}>
                <p>掲示板</p>
              </div>
            )}
          </Tab>
        </Tab.List>
      </Tab.Group>
      <div css={tabPanelStyle}>
        <Outlet context={{ isModalOpen, setIsModalOpen, users }} />
        {isModalOpen && (
          <ChatUserModal onClose={() => setIsModalOpen(false)}>
            {users.map((user) => (
              <button
                css={listStyle}
                key={user.id}
                onClick={() => handleUserSelect(user.id)}
              >
                <img
                  src={user.image}
                  css={modalUserIconStyle}
                  alt=""
                  width={56}
                  height={56}
                />
                <div css={listTextStyle}>
                  <p css={modalUserNameStyle}>{user.name}</p>
                  <p css={modalUserCommentStyle}>{user.comment}</p>
                </div>
              </button>
            ))}
          </ChatUserModal>
        )}
      </div>
    </div>
  );
};

export default Contact;
