import React from "react";
import classes from "../../styles/ChatBot.module.css";
import ChatLogo from "./ChatLogo";

const ChatItem = ({ data }) => {
  return (
    <>
      {data.isUser == "true" ? (
        <div className={classes.right}>
          <p>You</p>
          <div className={classes["chat-right"]}>{data.message}</div>
        </div>
      ) : (
        <div className={classes.left}>
          <div className={classes.avatar}>
            <ChatLogo dimL={"20px"} dim={13} />
            <p>Chating Bot</p>
          </div>
          <div className={classes["chat-left"]}>{data.message}</div>
        </div>
      )}
    </>
  );
};

export default ChatItem;
