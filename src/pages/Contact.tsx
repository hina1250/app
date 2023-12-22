/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { FC, useEffect } from "react";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Tab } from "@headlessui/react";
import plusIcon from "../assets/images/icon/plus.svg";

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

const Contact = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // タブのインデックスをURLから決定する関数
  const getSelectedIndex = (path: string) => {
    if (path.endsWith("/contact/chat")) {
      return 0;
    } else if (path.endsWith("/contact/board")) {
      return 1;
    }
    return -1;
  };
  const selectedIndex = getSelectedIndex(location.pathname);

  // コンポーネントのマウント時にチャットタブに移動する
  useEffect(() => {
    if (selectedIndex === -1) {
      navigate("/contact/chat");
    }
  }, [navigate]);

  return (
    <div css={wrapperStyle}>
      <div css={titleWrapperStyle}>
        <h1 css={titleStyle}>連絡</h1>
        <button>
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
        <Outlet />
      </div>
    </div>
  );
};

export default Contact;
