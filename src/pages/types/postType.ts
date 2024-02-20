/* 掲示板の投稿内容の型定義 */
export type Post = {
  postId: string;
  senderName: string;
  title: string;
  content: string;
  senderImageURL: string;
  date: Date;
  userId: string;
};
