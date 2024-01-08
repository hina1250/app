/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import iwamahinaImage from "../assets/images/manager/iwamahina.jpg";
import EditModal from "../components/EditModal";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import db from "../firebaseConfig";
import { handleLogin } from "./logics/getChatData";
import settingIcon from "../assets/images/icon/setting.svg";
import notificationIcon from "../assets/images/icon/notification.svg";
import { useParams } from "react-router-dom";
import { UserProfile } from "./types/userProfileType";
import Modal from "../components/Modal";
import LoginForm from "../components/LoginForm";

const wrapperStyle = css`
  max-width: 600px;
  margin: 0 auto;
  padding-top: 30px;
  padding-left: 18px;
  padding-right: 18px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  min-height: 100vh;
  position: relative;
`;

const titleStyle = css`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  padding: 10px;
  color: #333;
`;

const titleIconsStyle = css`
  display: flex;
  gap: 14px;
`;

const titleIconStyle = css``;

const titleWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > button {
    padding-right: 18px;
  }
`;

const profileStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const profileIconStyle = css`
  width: 56px;
  height: 56px;
  border-radius: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const profileNameStyle = css`
  font-size: 18px;
  margin-bottom: 2px;
`;

const profileCommentStyle = css`
  font-size: 14px;
  color: #666666;
`;

firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
  if (user) {
    // ユーザーがログインしている場合
    console.log("ログインユーザー:", user);
  } else {
    // ユーザーがログアウトしている場合
  }
});

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // ローディング状態の追加
  const userId = firebase.auth().currentUser?.uid;
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // 編集モーダルの表示・非表示
  const handleEditClick = () => {
    setIsEditing(true);
    if (isEditing) {
      setIsEditing(false);
    }
  };

  // ユーザープロフィールの更新と保存
  const handleSave = async (updatedProfile: UserProfile) => {
    // Firestoreに保存するロジック
    try {
      if (userId) {
        await db
          .collection("users")
          .doc(userId)
          .set(updatedProfile, { merge: true });
        console.log("プロフィールを更新しました");
      }
    } catch (error) {
      console.error("プロフィールの更新に失敗しました", error);
    }

    // ローカルの状態を更新
    setUserProfile(updatedProfile);
    setIsEditing(false);
  };

  // 画像の変更
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0] && userId) {
      const file = event.target.files[0];
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`images/${userId}/${file.name}`);

      try {
        await fileRef.put(file); // 画像をFirebase Storageにアップロード
        const imageUrl = await fileRef.getDownloadURL(); // アップロードされた画像のURLを取得

        const updatedProfile = { ...userProfile, image: imageUrl }; // ユーザープロフィールを更新
        await db
          .collection("users")
          .doc(userId)
          .set(updatedProfile, { merge: true }); // Firestoreに保存
        setUserProfile((prev) => {
          if (prev) {
            return { ...prev, image: imageUrl };
          }
          return null;
        });
      } catch (error) {
        console.error("画像のアップロードに失敗しました", error);
      }
    }
  };
  const handleImageEditClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      setIsLoading(true);
      if (user) {
        setIsLoggedIn(true);
        try {
          const doc = await db.collection("users").doc(user.uid).get();
          if (doc.exists) {
            setUserProfile(doc.data() as UserProfile);
          } else {
            console.log("初回ログイン: デフォルトプロフィールを設定");
            // デフォルトのプロフィールを設定
            const defaultProfile = {
              name: "新規ユーザー",
              comment: "コメント未設定",
              image: iwamahinaImage, // または他のデフォルト画像
            };
            setUserProfile(defaultProfile);
            // Firestoreに保存
            await db.collection("users").doc(user.uid).set(defaultProfile);
          }
        } catch (error) {
          console.error("プロフィールの読み込みに失敗しました", error);
        }
      } else {
        setIsLoggedIn(false);
        setUserProfile(null);
      }

      setIsLoading(false); // ローディング終了
    });

    return () => unsubscribe();
  }, []);

// ログインエラーの状態
  const [loginError, setLoginError] = useState("");
  const handleLogin = async (email: string, password: string) => {
    try {
      // ログイン試行
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // 成功した場合、エラーをクリア
      setLoginError("");
    } catch (error) {
      // ログイン失敗
      setLoginError("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
      console.error(error);
    }
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      // ログアウト後の処理（必要に応じて）
      console.log("ログアウトしました");
      setIsLogoutModalOpen(false); // モーダルを閉じる
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました", error);
    }
  };

  if (isLoading) {
    return <div css={wrapperStyle}></div>;
  }

  // ユーザーがログインしていない場合はログインフォームを表示
  if (!isLoggedIn) {
    return (
      <div css={wrapperStyle}>
        <LoginForm onLogin={handleLogin} loginError={loginError} />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div css={wrapperStyle}>
        <div css={titleWrapperStyle}>
          <h1 css={titleStyle}>ホーム</h1>
          <div css={titleIconsStyle}>
            <button css={titleIconStyle}>
              <img src={notificationIcon} alt="通知" width={18} height={24} />
            </button>
            <button css={titleIconStyle}>
              <img src={settingIcon} alt="設定" width={25} height={25} />
            </button>
          </div>
          <LoginForm onLogin={handleLogin} loginError={loginError} />
        </div>
      </div>
    );
  }

  return (
    <div css={wrapperStyle}>
      <div css={titleWrapperStyle}>
        <h1 css={titleStyle}>ホーム</h1>
        <div css={titleIconsStyle}>
          <button
            onClick={() => {
              setIsLogoutModalOpen(!isLogoutModalOpen);
            }}
          >
            ログアウト
          </button>
          {isLogoutModalOpen && (
            <Modal
              modalTitle={"ログアウトしますか？"}
              onClick={handleLogout}
              onCancel={() => {
                setIsLogoutModalOpen(false);
              }}
              buttonText={"ログアウト"}
            />
          )}
          <button css={titleIconStyle}>
            <img src={notificationIcon} alt="通知" width={18} height={24} />
          </button>
          <button css={titleIconStyle} onClick={handleEditClick}>
            <img src={settingIcon} alt="設定" width={25} height={25} />
          </button>
        </div>
      </div>
      <div css={profileStyle}>
        <button onClick={handleImageEditClick}>
          <img
            css={profileIconStyle}
            src={userProfile.image}
            alt={userProfile.name}
            width={56}
            height={56}
          />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <div>
          <p css={profileNameStyle}>{userProfile.name}</p>
          <p css={profileCommentStyle}>{userProfile.comment}</p>
        </div>
      </div>

      {isEditing && <EditModal userProfile={userProfile} onSave={handleSave} />}
    </div>
  );
};

export default Home;
