import React, { useContext } from "react";
import { FirebaseContext } from "../Context";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Loading from "../Loading";
import Message from "../Message";

import "./chatRoom.scss";

export default function ChatRoom({ user }) {
  const firebase = useContext(FirebaseContext);
  const fireStore = firebase.firestore();
  const messagesRef = fireStore.collection("messages");
  const query = messagesRef.orderBy("timeInit").limit(25);
  const [ value ] = useCollectionData(query, {    //include value, loading, error
    idField: "id",
  });
  console.log(user);
  return (
    <div className="chatRoom">
      <div className="header">
        <div className="header__nameGroup">ChatRoom</div>
        <div className="header__infoUser">
          <div className="header__infoUser--nameUser">{user.displayName}</div>
          <div className="header__infoUser--avatarUser">
            <img src={user.photoURL} alt={user.displayName} />
          </div>
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
    </div>
  );
}
