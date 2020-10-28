import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from './components/Firebase/configFirebase';
import SignIn from './components/SignIn';
import ChatRoom from './components/ChatRoom';

function App() {
  const { initialising, user } = useAuthState(firebase.auth())
  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then( result => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      console.log(`user: ${user}`)
    })
  };
  return (
    <div className="App">
      <header className="App-header">
      </header>
      { user ? <ChatRoom /> : <SignIn login={login} />}
    </div>
  );
}

export default App;