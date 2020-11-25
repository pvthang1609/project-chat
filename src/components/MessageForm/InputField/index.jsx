import React, { useContext, useEffect, useState } from "react";
import "./inputField.scss";
import typingIcon from "../../../img/typing.gif";
import useUsersTyping from "../../CustomHooks/UseUsersTyping/useUsersTyping";
import { FirebaseContext } from "../../Context";
import defaultAvatar from "../../../img/defaultAvatar.svg";

export default function InputField(props) {
  const { field } = props;
  const inputRef = React.createRef();

  const { usersTyping } = useUsersTyping();

  const firebase = useContext(FirebaseContext);
  const user = firebase.auth().currentUser;
  const database = firebase.database();

  const isTypingForDatabase = {
    urlAvt: user.photoURL,
    status: "typing",
    uid: user.uid,
  };
  const isTypedForDatabase = {
    urlAvt: user.photoURL,
    status: "typed",
    uid: user.uid,
  };

  const setTyping = (objectStatus) => {
    if (user) {
      database.ref(`usersTyping/${user.uid}`).set(objectStatus);
    }
  };

  const [isTyping, setIsTyping] = useState(false);

  var timeOut;

  const typing = () => {
    if (isTyping === false) {
      setIsTyping(true);
      setTyping(isTypingForDatabase);
    }
    timeOut = setTimeout(() => {
      if (isTyping === true) {
        setIsTyping(false);
        setTyping(isTypedForDatabase);
      }
    }, 1000);
  };

  const clearTyping = () => {
    clearTimeout(timeOut);
  };

  useEffect(() => {
    inputRef.current.focus();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {usersTyping.length !== 0 || usersTyping === null ? (
        <div
          style={{
            position: "absolute",
            top: 475,
            left: 95,
            maxHeight: 20,
            display: "flex",
            alignItems: "center",
          }}
        >
          {usersTyping.map((user) => {
            return (
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: 3,
                }}
              >
                <img
                  src={user.urlAvt ? user.urlAvt : defaultAvatar}
                  alt="none"
                />
              </div>
            );
          })}
          <p>typing...</p>
          <div style={{ width: "50px" }}>
            <img style={{ width: "100%" }} src={typingIcon} alt="icon-typing" />
          </div>
        </div>
      ) : null}
      <input
        {...field}
        style={{ width: "100%" }}
        type="text"
        placeholder="Enter message in here..!!"
        name={field.name}
        className="inputMessage"
        ref={inputRef}
        onKeyUp={typing}
        onKeyDown={clearTyping}
        autoComplete="off"
      />
    </div>
  );
}
