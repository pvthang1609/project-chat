import React from "react";
import "./reviewImg.scss";

export default function ReviewImg({ url }) {
  return (
    <div className="block-reviewImg">
      <img
        src={url}
        alt="none"
        style={{ maxWidth: "100%", display: "block" }}
      />
      <button className="close-btn">
        <i className="fa fa-times" aria-hidden="true"></i>
      </button>
    </div>
  );
}
