"use client";
import React, { useState } from "react";
import useBot from "../../hook/useBot";
import classes from "../../styles/ChatBot.module.css";
import Chat from "./Chat";
import Image from "next/image";
import FileUpload from "../upload/Upload";
import useFileUpload from "../../hook/useFileUpload";
import Header from "../header/Header";

const ChatContainer = ({ chat, setChat, id }) => {
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
          text: [question, selectedImage],
          isUser: "true",
          isimage: "true",
        },
      ]);
      response = await fileUpload(question, file);
    } else {
      setChat((prev) => [
        ...prev,
        { text: question, isUser: "true", isimage: "false" },
      ]);
      response = await answer(question);
    }

    setQuestion("");
    setSelectedImage(null);
    setFile(null);
    console.log(response);
    if (response?.length > 0) {
      setChat((prev) => [
        ...prev,
        {
          text: response[0].text,
          isUser: "false",
          isimage: "false",
        },
      ]);
    }

    setIsLoading(false);
  };
  return (
    <>
      <Header id={id} />
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
