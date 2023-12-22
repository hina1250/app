/* メッセージ内容の型定義 */
export type Message = {
  sessionId: string;
  id: string;
  name: string;
  msg: string;
  imageURL: string;
  date: Date;
};
