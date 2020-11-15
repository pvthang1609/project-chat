import React from "react";
import defaultAvatar from "../../img/defaultAvatar.svg";
import "./message.scss";

import { saveAs } from "file-saver";

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

  const downloadImage = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      var blob = xhr.response;
      console.log(blob);
      saveAs(blob);
    };
    xhr.open("GET", url);
    xhr.send();
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
            style={{
              borderRadius: 10,
              overflow: "hidden",
              marginBottom: 10,
              position: "relative",
            }}
          >
            <img src={file} alt="none" />
            <button
              style={{
                position: "absolute",
                bottom: "5px",
                right: "5px",
                borderRadius: "50%",
                border: "none",
                width: 30,
                height: 30,
                background: "#233b5d",
                cursor: "pointer"
              }}
              type="button"
              onClick={() => downloadImage(file)}
            >
              <i style={{color: "#fff",}} className="fa fa-cloud-download" aria-hidden="true"></i>
            </button>
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
