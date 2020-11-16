import React from "react";
import "./reviewImg.scss";

export default function ReviewImg({ url, onClickCloseBtn }) {
  return (
    <div className="block-reviewImg">
      <img
        className="img-reviewImg"
        src={url}
        alt="none"
        style={{ maxWidth: "100%", display: "block" }}
      />
      <button className="close-btn">
        <i className="fa fa-times" aria-hidden="true" onClick={onClickCloseBtn}></i>
      </button>
    </div>
  );
}
