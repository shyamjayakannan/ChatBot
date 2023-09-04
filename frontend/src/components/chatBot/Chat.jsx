import React from "react";
import ChatItem from "./ChatItem";

const Chat = ({ chat }) => {
  return (
    <>
      {chat.map((item, index) => (
        <ChatItem data={item} key={index} />
      ))}
    </>
  );
};

export default Chat;
