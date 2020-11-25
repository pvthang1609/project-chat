import React, { useContext, useState } from "react";
import { FastField, Form, Formik } from "formik";
import InputField from "./InputField";
import * as Yup from "yup";

import "./signUp.scss";
import { FirebaseContext } from "../Context";

const initValue = {
  email: "",
  password: "",
  reEnterPassword: "",
  isAgreeTerms: false,
};

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("It's not email").required("Email is required..!"),
  password: Yup.string()
    .min(8, "Too short.!!")
    .required("Email is required..!"),
  reEnterPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Password confirmation is incorrect"
  ),
  isAgreeTerms: Yup.boolean().oneOf([true], "You should agree to the terms"),
});

export default function SignUp({ onClick }) {
  const firebase = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false);

  const signUp = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false);
        alert(`You have created an account: ${email}`);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(
          `There was an error in the account creation process. Error Code: ${errorCode} - ${errorMessage}`
        );
        // ...
      });
  };

  return (
    <div className="signUp">
      <div className="signUp__heading">
        <p>Sign up</p>
        <p>Create your account</p>
      </div>
      <Formik
        initialValues={initValue}
        onSubmit={(value) => {
          signUp(value.email, value.password);
          setIsLoading(true);
        }}
        validationSchema={SignupSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <FastField
                name="email"
                label="email"
                type="text"
                component={InputField}
                icon={<i className="fa fa-envelope" aria-hidden="true"></i>}
                placeholder="johndoe@gmail.com"
              />
              <FastField
                name="password"
                label="password"
                type="password"
                component={InputField}
                icon={<i className="fa fa-unlock-alt" aria-hidden="true"></i>}
                placeholder="********"
              />
              <FastField
                name="reEnterPassword"
                label="confirm password"
                type="password"
                component={InputField}
                icon={<i className="fa fa-unlock-alt" aria-hidden="true"></i>}
                placeholder="********"
              />
              <label className="checkboxTerms">
                <FastField type="checkbox" name="isAgreeTerms" />
                To register with us please tick to agree to our Terms and
                Conditions.
              </label>
              <button className="signUp-btn" type="submit">
                Submit
                {isLoading && (
                  <i className="fa fa-spinner" aria-hidden="true"></i>
                )}
              </button>
            </Form>
          );
        }}
      </Formik>
      <p className="changeSign-pharagraph" onClick={onClick}>
        Already have an account? Sign In
      </p>
    </div>
  );
}
