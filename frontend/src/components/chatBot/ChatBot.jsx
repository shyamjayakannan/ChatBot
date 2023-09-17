"use client";
import { useState, useEffect, useContext } from "react";
import classes from "../../styles/ChatBot.module.css";
import ChatContainer from "./ChatContainer";
import usecreateConversation from "../../hook/usecreateConversation";
import AuthenticationContext from "../../store/authentication/Authentication-context";
import { useSendUserChatById } from "../../hook/useSendUserChatById";

const ChatBot = ({ id, chat, setChat, setRouterVar }) => {
  const AuthenticationCtx = useContext(AuthenticationContext);
  const [notRunFirstTime, setNotRunFirstTime] = useState(1);
  const [ids, setIds] = useState(id == "" ? "" : id);
  const { create } = usecreateConversation();

  useEffect(() => {
    const functioning = async () => {
      if (ids == "" && chat.length == 2) {
        var name = chat[1].text.substr(0, 25);
        if (chat[1].text.length > 25) name = name + "..";
        const newId = await create(name, chat);
        setIds(newId);
        setRouterVar(newId);
        AuthenticationCtx.setDetails(newId, "", "");
      }
    };
    functioning();
  }, [ids == "" && chat.length == 2]);

  useEffect(() => {
    const sendUserChatById = async () => {
      const response = await useSendUserChatById(ids, chat);
      console.log(response);
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
