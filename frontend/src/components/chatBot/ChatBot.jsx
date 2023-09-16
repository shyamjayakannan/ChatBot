"use client";
import classes from "../../styles/ChatBot.module.css";
import { useState, useEffect } from "react";
import ChatContainer from "./ChatContainer";
import usecreateConversation from "../../hook/usecreateConversation";

const ChatBot = ({ id, chat, setChat }) => {
  const { create } = usecreateConversation();
  const [notRunFirstTime, setNotRunFirstTime] = useState(2);
  const [ids, setIds] = useState(id == "" ? "" : id);

  useEffect(() => {
    const functioning = async () => {
      if (ids == "" && chat.length == 2) {
        const name = chat[1].text.substr(0, 25);
        const newId = await create(name, chat);
        setIds(newId);
      }
    };
    functioning();
  }, [ids == "" && chat.length == 2]);

  useEffect(() => {
    const sendUserChatById = async () => {
      const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;
      const userId = process.env.NEXT_PUBLIC_UID;
      const conversationId = ids;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations/${conversationId}/${userId}`;
      const headers = new Headers({
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      });
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ text: chat[chat.length - 1] }),
      });
      const data = await response.json();
      console.log(data);
    };
    if (notRunFirstTime <= 0 && ids != "") sendUserChatById();
    else setNotRunFirstTime(notRunFirstTime - 1);
  }, [chat]);

  return (
    <div className={classes.containerchatbot}>
      <ChatContainer setChat={setChat} chat={chat} id={id} />
    </div>
  );
};

export default ChatBot;
