import React from "react";
import "./fileField.scss";
import ReviewImg from "./ReviewImg/ReviewImg";

export default function FileField(props) {
  const { field, form, type } = props;
  const { value, name } = field;

  const handleClick = () => {
    document.getElementById("file").click();
  };

  const handleChange = (e) => {
    form.setFieldValue("file", e.currentTarget.files[0]);
  };

  return (
    <label>
      {value && <ReviewImg url={window.URL.createObjectURL(value)} />}
      <input
        id="file"
        name={name}
        type={type}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <button
        style={{
          height: "100%",
          marginRight: 2,
          width: 50,
          border: "none",
          outline: "none",
          backgroundColor: "#233b5d",
          cursor: "pointer",
        }}
        onClick={handleClick}
        type="button"
      >
        <i style={{color: "#fff", fontSize: 22}} className="fa fa-picture-o" aria-hidden="true"></i>
      </button>
    </label>
  );
}
