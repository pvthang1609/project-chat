import React from "react";
import defaultAvatar from "../../img/defaultAvatar.svg";
import "./message.scss";

import { saveAs } from "file-saver";
import useCalcTime from "../CustomHooks/useCalcTime";

let classNames = require("classnames");

export default function Message({
  content,
  photoURL,
  timeInit,
  uidUser,
  uid,
  file,
}) {
  const time = useCalcTime(timeInit);

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
      <div className="timeInit">{time}</div>
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
                top: 0,
                left: 0,
                borderRadius: "50%",
                border: "none",
                width: 30,
                height: 30,
                background: "#233b5d",
                cursor: "pointer",
              }}
              type="button"
              onClick={() => downloadImage(file)}
            >
              <i
                style={{ color: "#fff" }}
                className="fa fa-cloud-download"
                aria-hidden="true"
              ></i>
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
