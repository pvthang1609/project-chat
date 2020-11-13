import { FastField, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../Context";
import * as Yup from "yup";
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import "./signIn.scss";

import InputField from "../SignUp/InputField";
import Logo from "../../img/logo.svg";
import { CSSTransition } from "react-transition-group";

export default function SignIn() {
  const firebase = useContext(FirebaseContext);
  const auth = firebase.auth();

  const login = (provider) => {
    auth.signInWithPopup(provider);
  };

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    //provider include Google, Facebook, ..AuthProvider
    login(provider);
  };
  const loginWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    //provider include Google, Facebook, ..AuthProvider
    login(provider);
  };

  //initialValues Formik
  const initValue = {
    userName: "",
    password: "",
  };

  const handleSubmit = (value) => {
    auth
      .signInWithEmailAndPassword(value.userName, value.password)
      .catch((error) => alert(error.message));
  };

  //Yup validation

  const signInSchema = Yup.object().shape({
    userName: Yup.string()
      .email("It's not email")
      .required("Email is required..!"),
    password: Yup.string().required("Password is required..!"),
  });

  const [prop, setProp] = useState(false);

  const [isMessage, setIsMessage] = useState(0);

  const showHeading = () => {
    setProp(true);
  };

  useEffect(() => {
    window.addEventListener("load", showHeading);
    const interval = setInterval(() => {
      setIsMessage((isMessage) => isMessage + 1);
    }, 3000);
    return () => clearInterval(interval);
    // window.removeEventListener("load", showHeading);
  }, []);

  return (
    <div className="signIn">
      <div className="signIn__logo">
        <div className="signIn__logo--img">
          <img src={Logo} alt="logo" />
        </div>
        <p className="signIn__logo--text">ChatRoom</p>
      </div>
      <div className="signIn__heading">
        <CSSTransition
          in={prop}
          timeout={500}
          mountOnEnter
          classNames="heading"
        >
          <p>Wellcome ..!</p>
        </CSSTransition>
        <CSSTransition
          in={isMessage % 2 === 1}
          timeout={1000}
          mountOnEnter
          unmountOnExit
          classNames="message"
        >
          <p>You need to login to continue</p>
        </CSSTransition>
      </div>
      <Formik
        initialValues={initValue}
        validationSchema={signInSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          return (
            <Form>
              <FastField
                name="userName"
                label="email"
                type="text"
                component={InputField}
                icon={<i className="fa fa-envelope" aria-hidden="true"></i>}
                placeholder="johndoe@gmail.com"
              />
              <FastField
                name="password"
                label="password"
                type="password"
                component={InputField}
                icon={<i className="fa fa-unlock-alt" aria-hidden="true"></i>}
                placeholder="********"
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  className="signIn__btn signIn__btn--withEmail"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <p style={{ textAlign: "center", fontWeight: 700, margin: "5px 0" }}>
        or
      </p>
      <div className="signIn__groupBtn">
        <button
          className="signIn__btn signIn__btn--withGoogle"
          onClick={loginWithGoogle}
        >
          <i className="fa fa-google" aria-hidden="true"></i>Sign In with Google
        </button>
        <button
          className="signIn__btn signIn__btn--withFacebook"
          onClick={loginWithFacebook}
        >
          <i className="fa fa-facebook-official" aria-hidden="true"></i>Sign In
          with Facebook
        </button>
      </div>
      <p style={{ textAlign: "center", margin: "15px 0 0 0", fontSize: 12 }}>
        Do not have an account, create now..!
      </p>
    </div>
  );
}
