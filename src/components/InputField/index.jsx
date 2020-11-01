import React from "react";

export default function InputField(props) {
  const { field} = props;
  const { name, value, onChange, onBlur } = field;
  return (
    <input
      type="text"
      placeholder="Enter message in here..!!"
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
  );
}
