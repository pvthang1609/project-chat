import React from "react";

import "./signInField.scss";

export default function signInField(props) {
  const { label, type, icon, placeholder, field, form } = props;
  const { name } = field;
  const { errors, touched } = form;
  return (
    <div className="signInField">
      <div className="signInField__label">
        <p>{label}</p>
        {errors[name] && touched[name] ? (
          <p className="text-error">
            {errors[name]}
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
          </p>
        ) : null}
      </div>
      <div className="signInField__input">
        {icon}
        <input {...field} type={type} placeholder={placeholder} />
      </div>
    </div>
  );
}
