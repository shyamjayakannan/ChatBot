"use client";
import React, { useState, useContext } from "react";
import classes from "../../styles/Auth.module.css";
import Svgcross from "../../ui/Svgcross";
import AuthenticationContext from "../../store/authentication/Authentication-context";
import useAuth from "../../hook/useAuth";
import Image from "next/image";

const SignUP = () => {
  const { Auth } = useAuth();
  const AuthenticationCtx = useContext(AuthenticationContext);
  const open = AuthenticationCtx.open;
  const [values, setValues] = useState({
    phone: "",
    name: "",
    email: "",
    referralCode: "",
    open: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const CONTINUE_submit = async (e) => {
    e.preventDefault();
    AuthenticationCtx.setDetails(
      values.phone,
      values.name,
      values.email,
      values.referralCode
    );
    const response = await Auth(
      { number: values.phone, name: values.name, email: values.email },
      "signup"
    );
    if (response == "true") {
      setValues({ phone: "", name: "", email: "", error: "", open: true });
      AuthenticationCtx.onShow("LogInOpen");
    }
  };

  const hideHandler = () => {
    AuthenticationCtx.onHide("signupOpen");
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div
          className={classes.close}
          onClick={() => {
            hideHandler();
          }}
        >
          <Svgcross />
        </div>
        <div className={classes.part1}>
          <div className={classes.part1_left}>
            <h1>Sign up</h1>
            <p
              onClick={() => {
                AuthenticationCtx.onShow("LogInOpen");
              }}
            >
              <span>or</span>login to your account
            </p>
            <div className={classes.underline}> </div>
          </div>
          <div className={classes.part1_right}>
            <Image src={"/logo.jpg"} width={75} height={75} alt="logo" />
          </div>
        </div>
        <div className={classes.form}>
          <input
            type="number"
            placeholder="Phone number"
            value={values.phone}
            onChange={handleChange("phone")}
          />
          <input
            type="text"
            placeholder="Name"
            value={values.name}
            onChange={handleChange("name")}
          />
          <input
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange("email")}
          />
        </div>
        <div
          className={classes.continue}
          onClick={(e) => {
            CONTINUE_submit(e);
          }}
        >
          <a>CONTINUE</a>
        </div>
        <div className={classes.privacy_policy}>
          By creating an account, I accept the Terms & Conditions & Privacy
          Policy
        </div>
      </div>
    </div>
  );
};

export default SignUP;
