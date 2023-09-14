"use client";
import classes from "../../styles/ChatBot.module.css";
import { useState } from "react";
import ChatContainer from "./ChatContainer";
const ChatBot = ({ id }) => {
  const [chat, setChat] = useState([
    {
      message: "Hello ask me anything!",
      isUser: "false",
      isimage: "false",
    },
  ]);

  return (
    <div className={classes.containerchatbot}>
      <ChatContainer setChat={setChat} chat={chat} id={id} />
    </div>
  );
};

export default ChatBot;
