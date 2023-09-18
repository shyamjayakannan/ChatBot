"use client";
import ChatBot from "../components/chatBot/ChatBot";
import { useState } from "react";

export default function Home() {
  const [chat, setChat] = useState([]);

  return <ChatBot id="" chat={chat} setChat={setChat} />;
}
