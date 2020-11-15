import React from "react";

export default function ReviewImg({ url }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 150,
        overflow: "hidden",
        borderRadius: 10,
        top: "67%",
        left: "85%",
        boxShadow: "0 0 5px black",
        background: "#e1ecfe",
        padding: 5
      }}
    >
      <img
        src={url}
        alt="none"
        style={{ maxWidth: "100%", display: "block" }}
      />
    </div>
  );
}
