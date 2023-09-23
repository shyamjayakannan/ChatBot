import React from "react";
import Image from "next/image";
import classes from "../../styles/ChatBot.module.css";
import ChatLogo from "./ChatLogo";

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
              <div className={classes["chat-right"]}>
                <pre>
                  <code>
                    {data.text}
                  </code>
                </pre>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={classes.left}>
          <div className={classes.avatar}>
            <ChatLogo dimL={"22px"} dim={14} />
            <p>Chating Bot</p>
          </div>
          <div className={classes["chat-left"]}>
            <pre>
              <code>
                {data.text}
              </code>
            </pre>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatItem;
