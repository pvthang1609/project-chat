import { FastField, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { FirebaseContext } from "../Context";
import FileField from "./fileField";

import "firebase/storage";

const intValue = {
  files: null,
};

const metadata = {
  contentType: "image/png",
};

export default function UploadFile() {
  const [ progress, setProgress ] = useState(0)

  const firebase = useContext(FirebaseContext);
  const storageRef = firebase.storage().ref();

  const upload = (file, metadata) => {
    const uploadTask = storageRef
      .child("image/" + file.name)
      .put(file, metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress)
        setProgress(progress)
      }
      )
  };

  const handleSubmit = ({ files }) => {
    Object.values(files).forEach((file) => upload(file, metadata));
  };

  return (
    <Formik initialValues={intValue} onSubmit={handleSubmit}>
      {(propsFomirk) => {
        return (
          <div>
            <div className="percent" style={{height: 20, width: 100, background: "#ccc"}}>
        <div style={{height: "100%", width: progress, background: "blue"}}>{progress === 100 ? "Done" : `${progress}%`}</div>
            </div>
            <Form>
              <FastField component={FileField} />
              <button type="submit">Submit</button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
