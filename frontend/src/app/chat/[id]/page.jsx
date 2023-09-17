"use client";
import React from "react";
import ChatBot from "../../../components/chatBot/ChatBot";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import { useParams } from "next/navigation";
import { useFetchUserChatById } from "../../../hook/useFetchUserChatById";

const ChatPages = () => {
  const router = useParams();
  const { id: conversationId } = router;

  const {
    isLoading,
    data: chat,
    setData: setChat,
  } = useFetchUserChatById(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations/${conversationId}`,
    []
  );

  if (isLoading)
    return (
      <LoadingSpinner
        minHeight={"100vh"}
        width={"64px"}
        height={"64px"}
        border={"6"}
      />
    );

  return <ChatBot id={conversationId} chat={chat} setChat={setChat} />;
};

export default ChatPages;
