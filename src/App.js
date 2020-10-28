import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "./components/Firebase/configFirebase";
import SignIn from "./components/SignIn";
import ChatRoom from "./components/ChatRoom";
import SignOut from "./components/SignOut";

const auth = firebase.auth();
const fireStore = firebase.firestore();

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
    <div>
      {user ? (
        <ChatRoom logout={logout} userName={user.displayName} />
      ) : (
        <SignIn login={login} />
      )}
      {auth.currentUser && <SignOut logout={logout} />}
    </div>
  );
}

export default App;
