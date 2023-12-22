/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Record from "../pages/Record";
import Home from "../pages/Home";
import HomeIcon from "../assets/images/icon/home.svg";
import HomeSelectedIcon from "../assets/images/icon/home-active.svg";
import RecordIcon from "../assets/images/icon/pen.svg";
import RecordSelectedIcon from "../assets/images/icon/pen-active.svg";
import mailIcon from "../assets/images/icon/mail.svg";
import mailSelectedIcon from "../assets/images/icon/mail-active.svg";
import Contact from "../pages/Contact";

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
`;

const selectedButtonStyle = css`
  width: 90px;
  height: 90px;
  background-color: #fff;
  transform: translateY(-30px);
  border: 1px solid #333;
  color: #333;
`;

const GlobalMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTabListHidden, setIsTabListHidden] = useState(false);

  return (
    <Tab.Group
      defaultIndex={1}
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
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
              <button css={[buttonStyle, selected && selectedButtonStyle]}>
                <img
                  alt={"ホーム"}
                  src={selected ? HomeSelectedIcon : HomeIcon}
                />
                <span>ホーム</span>
              </button>
            )}
          </Tab>

          {/* 記録 */}
          <Tab>
            {({ selected }) => (
              <button css={[buttonStyle, selected && selectedButtonStyle]}>
                <img
                  alt={"記録"}
                  src={selected ? RecordSelectedIcon : RecordIcon}
                ></img>
                <span>記録</span>
              </button>
            )}
          </Tab>

          {/* 連絡 */}
          <Tab>
            {({ selected }) => (
              <button css={[buttonStyle, selected && selectedButtonStyle]}>
                <img
                  alt={"連絡"}
                  src={selected ? mailSelectedIcon : mailIcon}
                ></img>
                <span>連絡</span>
              </button>
            )}
          </Tab>
        </Tab.List>
      )}
      <Tab.Panels css={wrapperStyle}>
        {/* ホーム */}
        <Tab.Panel>
          <Home />
        </Tab.Panel>

        {/* 記録 */}
        <Tab.Panel>
          <Record />
        </Tab.Panel>

        {/* 連絡 */}
        <Tab.Panel>
          <Contact />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default GlobalMenu;
