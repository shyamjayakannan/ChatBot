"use client";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NewChat from "../../components/newChat/NewChat";
import { useFetchUserChatById } from "../../hook/useFetchUserChatById";
import LoadingSpinner from "../../ui/LoadingSpinner";
import ChatBot from "../../components/chatBot/ChatBot";
import { useRouterPush } from "../../hook/useRouterPush";

const ChatPages = () => {
  const { routerPushChange } = useRouterPush();
  const searchParams = useSearchParams();

  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const currentURL = current.toString().substring(9);

  const [conversationId, setConversationId] = useState(
    currentURL == "" ? "new" + v4() : currentURL
  );
  const [initialRender, setInitialRender] = useState(true);

  const onSelect = (event) => {
    routerPushChange(event);
  };

  const {
    isLoading,
    data: chat,
    setData: setChat,
  } = useFetchUserChatById(conversationId, []);

  useEffect(() => {
    setInitialRender(true);
    onSelect(conversationId);
  }, [conversationId]);

  if (isLoading)
    return (
      <LoadingSpinner
        minHeight={"100vh"}
        width={"64px"}
        height={"64px"}
        border={"6"}
      />
    );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ flex: "1" }}>
        <NewChat
          setConversationId={setConversationId}
          conversationId={conversationId}
          setInitialRender={setInitialRender}
        />
      </div>
      <div style={{ flex: "4" }}>
        <ChatBot
          id={conversationId}
          chat={chat}
          setChat={setChat}
          initialRender={initialRender}
          setInitialRender={setInitialRender}
          setConversationId={setConversationId}
        />
      </div>
    </div>
  );
};

export default ChatPages;
