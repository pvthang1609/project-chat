import React from "react";

import "./message.scss";

let classNames = require("classnames");

export default function Message({ content, photoURL, timeInit, uidUser, uid }) {
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
        {content}
      </div>
      <div className="avatar-message">
        <img src={photoURL} alt="avatar" />
      </div>
    </div>
  );
}
