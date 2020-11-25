import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseContext } from "./components/Context";

import { firebaseConfig } from "./components/Firebase/configFirebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ChatRoom from "./components/ChatRoom";

import "./app.scss";
import UserStatus from "./components/UserStatus";
import { useState } from "react";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function App() {
  const [display, setDisplay] = useState("signIn");
  const [user] = useAuthState(auth);
  //include user, loading, error
  //user include displayName, email, photoURL, emailVerified, uid

  const changeDisplay = (name) => {
    setDisplay(name);
  };

  return (
    <div className="container">
      <FirebaseContext.Provider value={firebase}>
        {user ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "stretch",
            }}
          >
            <UserStatus />
            <ChatRoom user={user} />
          </div>
        ) : display === "signIn" ? (
          <SignIn onClick={() => changeDisplay("signUp")} />
        ) : display === "signUp" ? (
          <SignUp onClick={() => changeDisplay("signIn")} />
        ) : null}
      </FirebaseContext.Provider>
    </div>
  );
}
export default App;
