import React, { useContext } from "react";
import { FastField, Form, Formik } from "formik";

import InputField from "./InputField";
import { FirebaseContext } from "../Context";
import "firebase/firestore";

import "./messageForm.scss";

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
    if (value.content !== "") {
      value.timeInit = new Date();
      messagesRef.add({ ...value }).catch((error) => console.error(error));
    }
    value.content = "";
    document.querySelector(".inputMessage").value = ""
  };
  return (
    <Formik initialValues={initValues} onSubmit={handleSubmit}>
      {(formikProps) => {
        return (
          <Form className="form-message">
            <FastField name="content" component={InputField} />
            <button className="submit-btn" type="submit">
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
