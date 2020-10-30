import { useAuthState } from "react-firebase-hooks/auth";
import {useCollectionData} from 'react-firebase-hooks/firestore';

import firebase from "./components/Firebase/configFirebase";
import SignIn from "./components/SignIn";
import ChatRoom from "./components/ChatRoom";
import SignOut from "./components/SignOut";
import Loading from "./components/Loading";

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
  const messagesRef = fireStore.collection('messages') // chỉ là tham chiếu của collection messages
  const query = messagesRef.orderBy('timeInit').limit(25)
  const [ value, loading, error ] = useCollectionData(query , {
    idField: "id",
  })

  
  return (
    <div>
      {console.log(loading ? 'loading' : 'isNot')}
      {user ? (
        <ChatRoom userName={user.displayName} values={value} />
      ) : (
        <SignIn login={login} />
      )}
      {auth.currentUser && <SignOut logout={logout} />}
      {value ? value.map((message, index) => {
        return <p key={index}>{message.content}</p>
      }) : <Loading/>}
      <Loading/>
    </div>
  );
}

export default App;
