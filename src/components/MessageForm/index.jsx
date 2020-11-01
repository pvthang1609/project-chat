import React, { useContext } from "react";
import { FastField, Form, Formik } from "formik";

import InputField from "../InputField";
import { FirebaseContext } from "../Context";
import "firebase/firestore";

export default function MessageForm({ user }) {
  const firebase = useContext(FirebaseContext);
  const fireStore = firebase.firestore();
  const messagesRef = fireStore.collection("messages");

  const initValues = {
    content: "",
    photoURL: user.photoURL,
    timeInit: "", //firebase.firestore() != firebase.firestore
    uid: user.uid,
  };
  const handleSubmit = (value) => {
    value.timeInit = new Date();
    messagesRef.add({ ...value }).catch((error) => console.error(error));
  };
  return (
    <Formik initialValues={initValues} onSubmit={handleSubmit}>
      {(formikProps) => {
        return (
          <Form>
            <FastField name="content" component={InputField} />
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}
