import React from "react";
import classes from "../../styles/ChatBot.module.css";
import ChatLogo from "./ChatLogo";
import Image from "next/image";

const ChatItem = ({ data }) => {
  return (
    <>
      {data.isUser == "true" ? (
        <>
          {data.isimage == "true" ? (
            <div className={classes.right}>
              <p>You</p>
              <Image src={data.text[1]} width={100} height={50} alt="upload" />
              <div className={classes["chat-right"]}>{data.text[0]}</div>
            </div>
          ) : (
            <div className={classes.right}>
              <p>You</p>
              <div className={classes["chat-right"]}>{data.text}</div>
            </div>
          )}
        </>
      ) : (
        <div className={classes.left}>
          <div className={classes.avatar}>
            <ChatLogo dimL={"20px"} dim={13} />
            <p>Chating Bot</p>
          </div>
          <div className={classes["chat-left"]}>{data.text}</div>
        </div>
      )}
    </>
  );
};

export default ChatItem;
