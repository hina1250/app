import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useParams } from "react-router-dom";
import { Post } from "./types/postType";

const PostDetail = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { postId } = useParams<{ postId: string }>();

  useEffect(() => {
    const docRef = firebase.firestore().collection("posts").doc(postId);

    const unsubscribe = docRef.onSnapshot(
      async (doc) => {
        if (doc.exists) {
          const docData = doc.data();
          if (!docData) {
            console.log("Document data is undefined");
            return;
          }

          const userId = docData.userId;

          // ユーザー情報を取得
          const userRef = firebase.firestore().collection("users").doc(userId);
          const userDoc = await userRef.get();

          if (userDoc.exists) {
            const userData = userDoc.data();

            setPost({
              postId: doc.id,
              title: docData.title,
              content: docData.content,
              date: new Date(docData.date),
              userId: userId,
              senderName: userData?.name, // ユーザー名
              senderImageURL: userData?.image, // ユーザーの画像URL
            });
          } else {
            console.log("User not found");
          }
        } else {
          console.log("No such document!");
        }
      },
      (error) => {
        console.error("Error fetching post: ", error);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
