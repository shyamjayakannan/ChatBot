"use client";
import classes from "../../styles/newChat.module.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useLocationLocalStorage } from "../../hook/LocationLocalStorage";
import AuthenticationContext from "../../store/authentication/Authentication-context";

const NewChat = () => {
  const [prevchat, setPrevchat] = useState([]);
  const authenticationContextCtx = useContext(AuthenticationContext);
  const { fetchPersonalDetails } = useLocationLocalStorage();
  const user = fetchPersonalDetails();

  useEffect(() => {
    const fetchUserPrevChat = async () => {
      const uid = user.data.id;
      const authToken = user.token;
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
    if (user != null || user != undefined) fetchUserPrevChat();
  }, [authenticationContextCtx.details.phone]);

  return (
    <div className={classes.container}>
      <div className={classes.items}>
        <div className={classes.item}>
          <Link href={`/`}>New</Link>
        </div>
        {prevchat.map((item, index) => (
          <Link href={`/chat/${item.id}`} key={index}>
            <div key={index} className={classes.item}>
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewChat;
