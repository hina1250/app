/* ユーザープロフィールの型定義（IDあり） */
export type UserIdProfile = {
  id: string;
  name: string;
  image: string;
  comment: string;
};

/* ユーザープロフィールの型定義 */
export type UserProfile = {
  name: string;
  image: string;
  comment: string;
};
