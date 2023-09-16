"use client";
import classes from "../../styles/newChat.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

const NewChat = () => {
  const [prevchat, setPrevchat] = useState([]);
  useEffect(() => {
    const fetchUserPrevChat = async () => {
      const uid = process.env.NEXT_PUBLIC_UID;
      const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${uid}/conversations`;
      const headers = new Headers({
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      });
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const data = await response.json();
      setPrevchat(data);
    };
    fetchUserPrevChat();
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.items}>
        <div className={classes.item}>
          <Link href={`/`}>New</Link>
        </div>
        {prevchat.map((item, index) => (
          <div key={index} className={classes.item}>
            <Link href={`/chat/${item.id}`}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewChat;
