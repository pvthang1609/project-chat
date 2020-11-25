import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../Context";
import "firebase/auth";
import "firebase/database";
import classNames from "classnames";

import defaultAvatar from "../../img/defaultAvatar.svg";
import "./userStatus.scss";

export default function UserStatus() {
  const firebase = useContext(FirebaseContext);
  const [users, setUsers] = useState(null);

  const agoTime = (time) => {
    return Date.now() - time;
  };

  const convertTime = (time) => {
    const minute = Math.floor(time / 1000 / 60);
    return `${minute} phút`;
  };

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const database = firebase.database();
    if (user) {
      const isOfflineForDatabase = {
        name: user.displayName ? user.displayName : user.email,
        urlAvt: user.photoURL,
        uid: user.uid,
        status: "offline",
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      };
      const isOnlineForDatabase = {
        name: user.displayName ? user.displayName : user.email,
        urlAvt: user.photoURL,
        uid: user.uid,
        status: "online",
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      };
      const isTypedForDatabase = {
        urlAvt: user.photoURL,
        status: "typed",
        uid: user.uid,
      };

      database.ref(".info/connected").on("value", (snapshot) => {
        if (snapshot.val() === false) {
          return;
        }
        database
          .ref(`useStatus/${user.uid}`)
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(() => {
            database.ref(`usersTyping/${user.uid}`).set(isTypedForDatabase);
          })
          .then(() => {
            database.ref(`useStatus/${user.uid}`).set(isOnlineForDatabase);
          });
      });
      database.ref(`useStatus`).on("value", (snapshot) => {
        setUsers(snapshot.val());
      });
    }
    return () => {
      database.ref(".info/connected").off();
      database.ref(`useStatus`).off();
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className="userStatus">
      <div className="userStatus__heading">Users</div>
      {users
        ? Object.values(users).map((user) => {
            return (
              <div className="userStatus__user" title={user.name}>
                <img
                  className="userStatus__user-image"
                  src={user.urlAvt ? user.urlAvt : defaultAvatar}
                  alt={user.name}
                />
                <div
                  className={classNames(
                    "userStatus__user-icon",
                    {
                      "userStatus__user-icon-online": user.status === "online",
                    },
                    {
                      "userStatus__user-icon-justOffline":
                        user.status === "offline" &&
                        agoTime(user.last_changed) < 900000 &&
                        agoTime(user.last_changed) > 0,
                    }
                  )}
                >
                  {user.status === "offline" &&
                  agoTime(user.last_changed) < 900000 &&
                  agoTime(user.last_changed) > 0
                    ? convertTime(agoTime(user.last_changed))
                    : null}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}
