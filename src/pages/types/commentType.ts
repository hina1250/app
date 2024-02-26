/* チャットデータの型定義 */
export type CommentType = {
  id: string;
  senderId: string;
  msg: string;
  date: Date;
};

/* CommentTypeを拡張して、userNameとuserImageを含む新しい型を定義 */
export type CommentWithUserInfo = CommentType & {
  userName?: string;
  userImage?: string;
};
