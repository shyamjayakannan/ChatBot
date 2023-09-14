"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import classes from "../../../styles/ChatBot.module.css";
import ChatBot from "../../../components/chatBot/ChatBot";

const ChatPages = () => {
  const router = useParams();
  const { id } = router;
  return (
    <div className={classes.container}>
      <ChatBot id={id} />
    </div>
  );
};

export default ChatPages;
