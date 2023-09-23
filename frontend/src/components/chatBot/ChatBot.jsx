"use client";
import { useEffect, useContext } from "react";
import classes from "../../styles/ChatBot.module.css";
import ChatContainer from "./ChatContainer";
import usecreateConversation from "../../hook/usecreateConversation";
import AuthenticationContext from "../../store/authentication/Authentication-context";
import { useSendUserChatById } from "../../hook/useSendUserChatById";
import { useRouterPush } from "../../hook/useRouterPush";

const ChatBot = ({
  id,
  chat,
  setChat,
  initialRender,
  setInitialRender,
  setConversationId,
}) => {
  const AuthenticationCtx = useContext(AuthenticationContext);
  const { routerPushChange } = useRouterPush();
  const { create } = usecreateConversation();

  useEffect(() => {
    const functioning = async () => {
      if (
        id.substr(0, 3) == "new" &&
        chat.length == 2 &&
        initialRender == false
      ) {
        var name = chat[1].text.substr(0, 25);
        if (chat[1].text.length > 25) name = name + "..";
        const newId = await create(name, chat, id.substr(3));
        routerPushChange(newId);
        setConversationId(newId);
        AuthenticationCtx.setDetails(newId, "", "");
      }
    };
    functioning();
  }, [id.substr(0, 3) == "new" && chat.length == 2]);

  useEffect(() => {
    const sendUserChatById = async () => {
      if (initialRender) {
        setInitialRender(false);
        return;
      }

      const sendUserChatById = async () => {
        const response = await useSendUserChatById(id, chat);
        console.log(response);
      };
      sendUserChatById();
    };
    sendUserChatById();
  }, [chat]);

  return (
    <div className={classes.containerchatbot}>
      <ChatContainer setChat={setChat} chat={chat} id={id} />
    </div>
  );
};

export default ChatBot;
