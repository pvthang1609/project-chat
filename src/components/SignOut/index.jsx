import React from "react";
import "./signout.scss";

export default function SignOut({ logout }) {
  return (
    <button className="signout-btn" onClick={logout}>
      <i className="fa fa-sign-out" aria-hidden="true"></i>
    </button>
  );
}
