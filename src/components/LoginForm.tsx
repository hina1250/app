/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import Modal from "./Modal";

const loginFormStyle = css`
  display: grid;
  gap: 30px;
  & > label {
    display: grid;
    gap: 10px;
    & > input {
      width: 100%;
      border-radius: 10px;
      border: 1.5px solid #333;
      padding: 12px 20px;
    }
  }
`;

const errorTextStyle = css`
  margin: 20px 0 0;
  font-size: 14px;
  font-weight: bold;
  color: #ce0c0c;
`;

type Props = {
  /* ログイン処理 */
  onLogin: (email: string, password: string) => void;
  /* ログインエラー */
  loginError: string;
};

const LoginForm: React.FC<Props> = ({ onLogin, loginError }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleModalSubmit = () => {
    onLogin(email, password);
  };

  return (
    <Modal buttonText={"ログイン"} onClick={handleModalSubmit}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        css={loginFormStyle}
      >
        {/* メールアドレス入力フィールド */}
        <label htmlFor="email">
          メールアドレス
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレス"
          />
        </label>

        {/* パスワード入力フィールド */}
        <label htmlFor="password">
          パスワード
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
          />
        </label>
      </form>
      {loginError &&
        <p css={errorTextStyle}>{loginError}</p>
      }
    </Modal>
  );
};

export default LoginForm;
