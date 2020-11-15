import React from "react";
import defaultAvatar from "../../img/defaultAvatar.svg";
import "./message.scss";

let classNames = require("classnames");

export default function Message({
  content,
  photoURL,
  timeInit,
  uidUser,
  uid,
  file,
}) {
  const milliseconds = timeInit.toMillis();
  const millisecondsNow = Date.now();
  const agoSec = Math.round((millisecondsNow - milliseconds) / 1000);
  const agoMinute = Math.round(agoSec / 60);
  const agoHour = Math.round(agoMinute / 60);
  const agoDay = Math.round(agoHour / 24);

  const timeToNow = () => {
    if (agoDay >= 1) {
      return `${agoDay} day`;
    } else if (agoHour >= 1) {
      return `${agoHour} hour`;
    } else if (agoMinute >= 1) {
      return `${agoMinute} minute`;
    } else if (agoSec >= 1) {
      return `${agoSec} seconds`;
    } else {
      return `0 seconds`;
    }
  };
  return (
    <div
      className={classNames("container-message", {
        "container-message-otherUser": uidUser !== uid,
      })}
    >
      <div className="timeInit">
        {agoDay < 7 ? `about ${timeToNow()} ago` : ""}
      </div>
      <div
        className={classNames("content-message", {
          "content-message-otherUser": uidUser !== uid,
        })}
      >
        {file && (
          <div
            style={{ borderRadius: 10, overflow: "hidden", marginBottom: 10 }}
          >
            <img src={file} alt="none" />
          </div>
        )}
        <div>{content}</div>
      </div>
      <div className="avatar-message">
        <img src={photoURL ? photoURL : defaultAvatar} alt="avatar" />
      </div>
    </div>
  );
}
