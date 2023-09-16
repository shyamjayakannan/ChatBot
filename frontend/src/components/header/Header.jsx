"use client";
import React, { useContext, useEffect, useState } from "react";
import ChatLogo from "../chatBot/ChatLogo";
import classes from "../../styles/ChatBot.module.css";
import AuthenticationContext from "../../store/authentication/Authentication-context";
import Svgsign from "../../ui/Svgsign";
import { useLocationLocalStorage } from "../../hook/LocationLocalStorage";

const Header = ({ id }) => {
  const authenticationContextCtx = useContext(AuthenticationContext);
  const { fetchPersonalDetails, removePersonalDetails } =
    useLocationLocalStorage();

  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(fetchPersonalDetails());
  }, [authenticationContextCtx.details.phone]);

  return (
    <div className={classes.header}>
      <ChatLogo dimL={"50px"} dim={30} />
      <div className={classes.title}>
        <h3>Chating Bot {id}</h3>
        <div
          className={classes.right_part}
          onClick={() => {
            if (user == null || user == undefined)
              authenticationContextCtx.onShow("LogInOpen");
            else {
              removePersonalDetails();
              setUser(null);
            }
          }}
        >
          <div className={classes.right_image}>
            <Svgsign />
          </div>
          <div className={`${classes.right_text}`}>
            {user?.token ? "Log out" : "Sign In"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
