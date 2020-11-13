import React, { useEffect } from "react";
import "./inputField.scss";

export default function InputField(props) {
  const { field } = props;
  const { name, value, onChange, onBlur } = field;
  const inputRef = React.createRef();

  useEffect(() => {
    inputRef.current.focus();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter message in here..!!"
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className="inputMessage"
        ref={inputRef}
      />
    </div>
  );
}
