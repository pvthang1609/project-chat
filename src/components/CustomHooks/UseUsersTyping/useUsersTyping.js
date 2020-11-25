import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../Context";

export default function useUsersTyping() {
  const firebase = useContext(FirebaseContext);

  const [usersTyping, setUsersTyping] = useState([]);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const database = firebase.database();
    if (user) {
      database.ref("usersTyping")
        ? database.ref("usersTyping").on("value", (snapshot) => {
            const arr = Object.values(snapshot.val());
            const result = arr.filter(
              (e) => e.status === "typing" && e.uid !== user.uid
            );
            setUsersTyping(result);
          })
        : console.log("not REF");
    }
    return () => {
      database.ref("usersTyping").off();
    };
    // eslint-disable-next-line
  }, []);

  return { usersTyping };
}
