import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from './components/Firebase/configFirebase';
import SignIn from './components/SignIn';
import ChatRoom from './components/ChatRoom';

const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
};
const logout = () => {
  firebase.auth().signOut();
};

function App() {
  const [user, loading, error] = useAuthState(firebase.auth())
  return (
    <div className="App">
      <header className="App-header">
      </header>
      { user ? <ChatRoom logout={logout}/> : <SignIn login={login} />}
    </div>
  );
}

export default App;