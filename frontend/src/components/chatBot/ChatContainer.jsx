"use client";
import React, { useState } from "react";
import useBot from "../../hook/useBot";
import classes from "../../styles/ChatBot.module.css";
import Chat from "./Chat";
import ChatLogo from "./ChatLogo";
import Image from "next/image";
import FileUpload from "../upload/Upload";
import useFileUpload from "../../hook/useFileUpload";

const ChatContainer = ({ chat, setChat }) => {
  const { answer } = useBot();
  const { fileUpload } = useFileUpload();
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const callBot = async () => {
    if (question.trim().length == 0) return;

    setIsLoading(true);

    var response = "";

    if (selectedImage != null) {
      setChat((prev) => [
        ...prev,
        {
          message: [question, selectedImage],
          isUser: "true",
          isimage: "true",
        },
      ]);
      response = await fileUpload(question, file);
    } else {
      setChat((prev) => [
        ...prev,
        { message: question, isUser: "true", isimage: "false" },
      ]);
      response = await answer(question);
    }

    setQuestion("");
    setSelectedImage(null);
    setFile(null);

    if (response?.length > 0) {
      setChat((prev) => [
        ...prev,
        { message: response[0].text, isUser: "false", isimage: "false" },
      ]);
    }

    setIsLoading(false);
  };
  return (
    <>
      <div className={classes.header}>
        <ChatLogo dimL={"50px"} dim={30} />
        <div className={classes.title}>
          <h3>Chating Bot</h3>
        </div>
      </div>
      <div className={classes.chatBotChat}>
        <Chat chat={chat} />
      </div>
      <div className={classes["input-container"]}>
        <FileUpload
          setFile={setFile}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <input
          type="text"
          name="chat"
          id="chat"
          placeholder="Ask something"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") callBot();
          }}
        />
        {isLoading ? (
          <div className={classes.spinner}></div>
        ) : (
          <div onClick={() => callBot()} className={classes.sending}>
            <Image src="/send.svg" width={24} height={24} alt="location" />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatContainer;
