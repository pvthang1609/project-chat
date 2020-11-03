import React, { useContext } from "react";
import { FirebaseContext } from "../Context";

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

  return(
      <div>
          <button onClick={loginWithGoogle}>SignInWithGoogle</button>
          <button onClick={loginWithFacebook}>SignInWithFacebook</button>
      </div>
  );
}
