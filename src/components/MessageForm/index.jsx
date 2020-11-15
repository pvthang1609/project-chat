import React, { useContext } from "react";
import { FastField, Form, Formik } from "formik";

import InputField from "./InputField";
import { FirebaseContext } from "../Context";
import "firebase/firestore";
import "firebase/storage";

import "./messageForm.scss";
import FileField from "./FileField";

export default function MessageForm({ user }) {
  const firebase = useContext(FirebaseContext);
  const fireStore = firebase.firestore();
  const messagesRef = fireStore.collection("messages");
  const storage = firebase.storage();
  const storageRef = storage.ref();

  const initValues = {
    content: "",
    photoURL: user.photoURL,
    timeInit: "", //firebase.firestore() != firebase.firestore
    uid: user.uid,
    file: null, // if file null => submit normally, if file is value => upload file to storage, sell URL fireStore
  };
  const handleSubmit = (value, actions) => {
    if (value.content !== "" && value.file === null) {
      value.timeInit = new Date();
      messagesRef
        .add({
          content: value.content,
          photoURL: user.photoURL,
          timeInit: value.timeInit,
          uid: user.uid,
        })
        .then(() => {
          actions.resetForm();
        })
        .catch((error) => console.error(error));
    }
    if (value.file) {
      const file = value.file;
      const metadata = {
        contentType: "image/png",
      };
      const uploadTask = storageRef
        .child("images/" + file.name)
        .put(file, metadata);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // eslint-disable-next-line
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // eslint-disable-next-line
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            value.timeInit = new Date();
            messagesRef
              .add({
                ...value,
                file: downloadURL,
              })
              .then(() => {
                actions.resetForm();
              })
              .catch((error) => console.error(error));
          });
        }
      );
    }
  };
  return (
    <Formik initialValues={initValues} onSubmit={handleSubmit}>
      {(formikProps) => {
        return (
          <Form className="form-message">
            <FastField name="content" component={InputField} />
            <FastField name="file" type="file" component={FileField} />
            <button className="submit-btn" type="submit">
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
