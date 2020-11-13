import React from "react";
import { CSSTransition } from "react-transition-group";

import "./inputField.scss";

export default function InputField(props) {
  const { label, type, icon, placeholder, field, form } = props;
  const { name } = field;
  const { errors, touched } = form;
  const prop = (errors[name] && touched[name]) ? true : false

  return (
    <div className="inputField">
      <div className="inputField__label">
        <p>{label}</p>
          <CSSTransition
            in={prop}
            timeout={300}
            mountOnEnter
            unmountOnExit
            classNames="text"
          >
            <p className="text-error">
              {errors[name]}
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            </p>
          </CSSTransition>
        {/* ) : null} */}
      </div>
      <div className="inputField__input">
        {icon}
        <input {...field} type={type} placeholder={placeholder} />
      </div>
    </div>
  );
}
