"use client";
import ChatBot from "../components/chatBot/ChatBot";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [chat, setChat] = useState([]);
  const [routerVar, setRouterVar] = useState(null);

  useEffect(() => {
    if (routerVar !== null) {
      router.push(`/chat/${routerVar}`);
    }
  }, [routerVar]);

  return (
    <ChatBot id="" chat={chat} setChat={setChat} setRouterVar={setRouterVar} />
  );
}
