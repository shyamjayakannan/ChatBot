"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ChatBot from "../../../components/chatBot/ChatBot";

const ChatPages = () => {
  const router = useParams();
  const { id } = router;
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const fetchUserChatById = async () => {
      const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;
      const conversationId = id;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations/${conversationId}`;
      const headers = new Headers({
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      });
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const data = await response.json();
      setChat(data.conversation);
    };
    fetchUserChatById();
  }, []);

  return <ChatBot id={id} chat={chat} setChat={setChat} />;
};

export default ChatPages;
