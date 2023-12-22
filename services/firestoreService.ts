// Firestoreにチャットセッションを登録する関数
import db from "../src/firebaseConfig";

 // ChatSessionとMessageの型を定義
type Message = {
   id: string;
   message: string;
   timestamp: Date;
 };

 type ChatSession = {
   sessionId: string;
   user: string;
   imageURL: string;
   messages: Message[];
 };

 // Firestoreにチャットセッションを登録する関数
 export const addChatSessionToFirestore = async (session: ChatSession) => {
   try {
     const sessionRef = await db.collection("chatSessions").add({
       sessionId: session.sessionId,
       user: session.user,
       imageURL: session.imageURL
     });

     // 各メッセージをサブコレクションに登録
     session.messages.forEach(async (message) => {
       await sessionRef.collection("messages").add({
         id: message.id,
         message: message.message,
         timestamp: message.timestamp
       });
     });

     console.log("データの登録に成功しました");
   } catch (error) {
     console.error("データの登録に失敗しました", error);
   }
 };
