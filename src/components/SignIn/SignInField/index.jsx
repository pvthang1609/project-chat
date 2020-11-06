import React from "react";
import { CSSTransition } from "react-transition-group";

import "./signInField.scss";

export default function SignInField(props) {
  const { label, type, icon, placeholder, field, form } = props;
  const { name } = field;
  const { errors, touched } = form;
  const prop = (errors[name] && touched[name]) ? true : false

  return (
    <div className="signInField">
      <div className="signInField__label">
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
      <div className="signInField__input">
        {icon}
        <input {...field} type={type} placeholder={placeholder} />
      </div>
    </div>
  );
}
