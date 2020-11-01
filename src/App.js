import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseContext } from "./components/Context";

import { firebaseConfig } from "./components/Firebase/configFirebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import SignIn from "./components/SignIn";
import ChatRoom from "./components/ChatRoom";
import SignOut from "./components/SignOut";

import "./app.scss";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  //provider include Google, Facebook, ..AuthProvider
  auth.signInWithPopup(provider);
};
const logout = () => {
  auth.signOut();
};

function App() {
  const [user] = useAuthState(auth);
  //include user, loading, error
  //user include displayName, email, photoURL, emailVerified, uid
  return (
    <div className="container">
      <FirebaseContext.Provider value={firebase}>
        {user ? <ChatRoom user={user} /> : <SignIn login={login} />}
        {auth.currentUser && <SignOut logout={logout} />}
      </FirebaseContext.Provider>
    </div>
  );
}
export default App;
