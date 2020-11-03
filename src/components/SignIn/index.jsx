import { FastField, Form, Formik } from "formik";
import React, { useContext } from "react";
import { FirebaseContext } from "../Context";
import './signin.scss';
import signInField from "./SignInField";

import Logo from '../../img/logo.svg';

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

  return (
    <div className="signIn">
      <div className="signIn__logo">
        <div className="signIn__logo--img">
          <img src={Logo} alt="logo" />
        </div>
        <p className="signIn__logo--text">ChatRoom</p>
      </div>
      <div className="signIn__heading">
        <p>Wellcome</p>
        <p>Sign in to continue</p>
      </div>
      <Formik>
        {formikProps => {
          return (
            <Form>
              <FastField
                name="userName"
                label="email"
                type="text"
                component={signInField}
                icon={<i class="fa fa-envelope" aria-hidden="true"></i>}
                placeholder="johndoe@gmail.com"
              />
              <FastField
                name="password"
                label="password"
                type="password"
                component={signInField}
                icon={<i class="fa fa-unlock-alt" aria-hidden="true"></i>}
                placeholder="********"
              />
              <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <button className="signIn__btn signIn__btn--withEmail" type="submit">Login</button>
              </div>
            </Form>
          )
        }}
      </Formik>
      <p style={{textAlign: "center", fontWeight: 700, margin: "5px 0"}}>or</p>
      <div className="signIn__groupBtn">
        <button className="signIn__btn signIn__btn--withGoogle" onClick={loginWithGoogle}><i class="fa fa-google" aria-hidden="true"></i>Sign In with Google</button>
        <button className="signIn__btn signIn__btn--withFacebook" onClick={loginWithFacebook}><i class="fa fa-facebook-official" aria-hidden="true"></i>Sign In with Facebook</button>
      </div>
      <p style={{textAlign: "center", margin: "15px 0 0 0", fontSize: 12}}>Do not have an account, create now..!</p>
    </div>
  );
}
