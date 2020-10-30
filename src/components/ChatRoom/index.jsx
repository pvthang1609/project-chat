import React from "react";
import Loading from "../Loading";
import Message from "../Message";
import './chatRoom.scss'

export default function ChatRoom({ user, values }) {
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
        {values ? (
          values.map((message, index) => {
            return (
              <Message
                key={index}
                content={message.content}
                photoURL={message.photoURL}
                timeInit={message.timeInit}
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
