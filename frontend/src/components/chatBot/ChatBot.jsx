"use client";
import classes from "../../styles/ChatBot.module.css";
import { useState } from "react";
import ChatContainer from "./ChatContainer";
const ChatBot = () => {
  const [chat, setChat] = useState([
    {
      message: "Hello!",
      isUser: "false",
      isimage: "false",
    },
  ]);

  return (
    <div className={classes.containerchatbot}>
      <ChatContainer setChat={setChat} chat={chat} />
    </div>
  );
};

export default ChatBot;
