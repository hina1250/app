/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Record from "./pages/Record";
import { Tab } from "@headlessui/react";
import HomeSelectedIcon from "./assets/images/icon/home-active.svg";
import HomeIcon from "./assets/images/icon/home.svg";
import RecordSelectedIcon from "./assets/images/icon/pen-active.svg";
import RecordIcon from "./assets/images/icon/pen.svg";
import mailSelectedIcon from "./assets/images/icon/mail-active.svg";
import mailIcon from "./assets/images/icon/mail.svg";
import ChatDetail from "./pages/ChatDetail";
import Board from "./pages/Board";
import Chat from "./pages/Chat";
import PostDetail from "./pages/PostDetail";

const wrapperStyle = css`
  background-color: #333;
  height: auto;
`;

const tabsStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  max-width: 600px;
  width: 100%;
  height: 85px;
  background-color: #333;
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 10;
  transform: translateX(-50%);
  &::after {
    position: absolute;
    left: 0;
    z-index: -1;
    content: "";
    width: 120px;
    height: 120px;
    background-color: #333;
    border-radius: 50%;
    transition: left 0.3s ease-in-out;
  }
`;
const homeSelectedBgStyle = css`
  &::after {
    position: absolute;
    left: calc(calc(100% / 6) - 60px);
    z-index: -1;
    content: "";
    width: 120px;
    height: 120px;
    background-color: #333;
    border-radius: 50%;
    transform: translateY(-30px);
  }
`;
const recordSelectedBgStyle = css`
  &::after {
    position: absolute;
    left: calc(calc(100% / 2) - 60px);
    z-index: -1;
    content: "";
    width: 120px;
    height: 120px;
    background-color: #333;
    border-radius: 50%;
    transform: translateY(-30px);
  }
`;
const contactSelectedBgStyle = css`
  &::after {
    position: absolute;
    left: calc(calc(100% / calc(6 / 5)) - 60px);
    z-index: -1;
    content: "";
    width: 120px;
    height: 120px;
    background-color: #333;
    border-radius: 50%;
    transform: translateY(-30px);
  }
`;

const buttonStyle = css`
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-in-out;
  border-radius: 50%;
  color: #fff;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
`;

const selectedButtonStyle = css`
  width: 90px;
  height: 90px;
  background-color: #fff;
  transform: translateY(-30px);
  border: 1px solid #333;
  color: #333;
`;

const App = () => {
  const location = useLocation();
  const [isTabListHidden, setIsTabListHidden] = useState(false);

  useEffect(() => {
    // ChatDetail ページにいるときはタブメニューを非表示にする
    setIsTabListHidden(location.pathname.includes("/contact/chat/"));
  }, [location]);

  // パスに基づいて選択されたタブのインデックスを設定
  const getSelectedIndex = (path: string) => {
    if (path === "/") {
      return 0;
    } else if (path.startsWith("/record")) {
      return 1;
    } else if (path.startsWith("/contact")) {
      return 2;
    }
    return 0; // デフォルトはホームタブ
  };

  const selectedIndex = getSelectedIndex(location.pathname);

  return (
    <div css={wrapperStyle}>
      <Tab.Group defaultIndex={1} selectedIndex={selectedIndex}>
        {!isTabListHidden && (
          <Tab.List
            css={[
              tabsStyle,
              selectedIndex === 0 && homeSelectedBgStyle,
              selectedIndex === 1 && recordSelectedBgStyle,
              selectedIndex === 2 && contactSelectedBgStyle,
            ]}
          >
            {/* ホーム */}
            <Tab>
              {({ selected }) => (
                <Link
                  to="/"
                  css={[buttonStyle, selected && selectedButtonStyle]}
                >
                  <img
                    alt={"ホーム"}
                    src={selected ? HomeSelectedIcon : HomeIcon}
                  />
                  <span>ホーム</span>
                </Link>
              )}
            </Tab>

            {/* 記録 */}
            <Tab>
              {({ selected }) => (
                <Link
                  to="record"
                  css={[buttonStyle, selected && selectedButtonStyle]}
                >
                  <img
                    alt={"記録"}
                    src={selected ? RecordSelectedIcon : RecordIcon}
                  ></img>
                  <span>記録</span>
                </Link>
              )}
            </Tab>

            {/* 連絡 */}
            <Tab>
              {({ selected }) => (
                <Link
                  to="contact"
                  css={[buttonStyle, selected && selectedButtonStyle]}
                >
                  <img
                    alt={"連絡"}
                    src={selected ? mailSelectedIcon : mailIcon}
                  ></img>
                  <span>連絡</span>
                </Link>
              )}
            </Tab>
          </Tab.List>
        )}
      </Tab.Group>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/record" element={<Record />} />
        <Route path="/contact" element={<Contact />}>
          <Route index element={<Chat />} />
          <Route path="chat" element={<Chat />} />
          <Route path="board" element={<Board />} />
        </Route>

        <Route path="/contact/chat/:chatId" element={<ChatDetail />} />
        <Route path="/contact/board/:postId" element={<PostDetail />} />
      </Routes>
    </div>
  );
};

export default App;
