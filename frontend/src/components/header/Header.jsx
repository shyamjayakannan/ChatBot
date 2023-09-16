"use client";
import React, { useContext } from "react";
import ChatLogo from "../chatBot/ChatLogo";
import classes from "../../styles/ChatBot.module.css";
import AuthenticationContext from "../../store/authentication/Authentication-context";
import Svgsign from "../../ui/Svgsign";

const Header = ({ id }) => {
  const authenticationContextCtx = useContext(AuthenticationContext);
  return (
    <div className={classes.header}>
      <ChatLogo dimL={"50px"} dim={30} />
      <div className={classes.title}>
        <h3>Chating Bot {id}</h3>
        <div
          className={classes.right_part}
          onClick={() => {
            authenticationContextCtx.onShow("LogInOpen");
          }}
        >
          <div className={classes.right_image}>
            <Svgsign />
          </div>
          <div className={`${classes.right_text}`}>
            {process.env.NEXT_PUBLIC_BACKEND_PYTHON_URL ? "Sign In" : "Log out"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
