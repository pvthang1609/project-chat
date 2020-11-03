import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseContext } from "./components/Context";

import { firebaseConfig } from "./components/Firebase/configFirebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import SignIn from "./components/SignIn";
import ChatRoom from "./components/ChatRoom";

import "./app.scss";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  //include user, loading, error
  //user include displayName, email, photoURL, emailVerified, uid
  return (
    <div className="container">
      <FirebaseContext.Provider value={firebase}>
        {user ? <ChatRoom user={user} /> : <SignIn/>}
      </FirebaseContext.Provider>
    </div>
  );
}
export default App;
