import React from "react";
import "./message.scss";

export default function Message({ content, photoURL, timeInit }) {
  const milliseconds = timeInit.toMillis();
  const millisecondsNow = Date.now();
  const agoSec = Math.round((millisecondsNow - milliseconds) / 1000);
  const agoMinute = Math.round(agoSec / 60);
  const agoHour = Math.round(agoMinute / 60);
  const agoDay = Math.round(agoHour / 24);

  const timeToNow = () => {
    if (agoDay > 1) {
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
    <div className="container-message">
      <div className="timeInit">
        {agoDay < 7 ? `about ${timeToNow()} ago` : ""}
      </div>
      <div className="content-message">{content}</div>
      <div className="avatar-message">
        <img src={photoURL} alt="avatar" />
      </div>
    </div>
  );
}
