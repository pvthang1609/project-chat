import React, { useContext, useEffect } from "react";
import { FirebaseContext } from "../Context";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Loading from "../Loading";
import Message from "../Message";
import defaultAvatar from "../../img/defaultAvatar.svg";

import "./chatRoom.scss";
import MessageForm from "../MessageForm";
import SignOut from "../SignOut";

export default function ChatRoom({ user }) {
  const firebase = useContext(FirebaseContext);
  const fireStore = firebase.firestore();
  const auth = firebase.auth();
  const messagesRef = fireStore.collection("messages");
  const query = messagesRef.orderBy("timeInit").limit(25);
  const [value] = useCollectionData(query, {
    //include value, loading, error
    idField: "id",
  });

  const logout = () => {
    auth.signOut();
  };

  useEffect(() => {
    const contentChatRoom = document.querySelector(".content-chatRoom");
    contentChatRoom.scrollTop = contentChatRoom.scrollHeight;
  });

  return (
    <div className="chatRoom">
      <div className="header">
        <div className="header__nameGroup">ChatRoom</div>
        <div className="header__infoUser">
          <div className="header__infoUser--nameUser">
            {user.displayName ? user.displayName : user.email}
          </div>
          <div className="header__infoUser--avatarUser">
            <img
              src={user.photoURL ? user.photoURL : defaultAvatar}
              alt={user.displayName ? user.displayName : user.email}
            />
          </div>
          <SignOut logout={logout} />
        </div>
      </div>
      <div className="content-chatRoom">
        {value ? (
          value.map((message, index) => {
            return (
              <Message
                key={index}
                content={message.content}
                photoURL={message.photoURL}
                timeInit={message.timeInit}
                uidUser={user.uid}
                uid={message.uid}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </div>
      <MessageForm user={user} />
    </div>
  );
}
