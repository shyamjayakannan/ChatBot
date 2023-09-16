"use client";
import React, { useState, useEffect } from "react";
import ChatBot from "../../../components/chatBot/ChatBot";
import { useParams } from "next/navigation";
import { useLocationLocalStorage } from "../../../hook/LocationLocalStorage";

const ChatPages = () => {
  const [chat, setChat] = useState([]);
  const router = useParams();
  const { id } = router;
  const { fetchPersonalDetails } = useLocationLocalStorage();
  const user = fetchPersonalDetails();

  useEffect(() => {
    const fetchUserChatById = async () => {
      const authToken = user.token;
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
