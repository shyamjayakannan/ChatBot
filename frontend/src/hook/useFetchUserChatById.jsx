import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useFetchUserChatById = (conversationId, defaultValue) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(defaultValue);
  const [messageHistory, setMessageHistory] = useState("");

  useEffect(() => {
    const loadResources = async () => {
      const { fetchPersonalDetails } = useLocalStorage();
      const user = fetchPersonalDetails();

      if (user == null || user == undefined) {
        setData(defaultValue);
        setIsLoading(false);
        return;
      }

      if (conversationId.substr(0, 3) == "new") {
        setData(defaultValue);
        setIsLoading(false);
        return;
      }

      const userId = user.data.id;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/getconversations/${conversationId}/${userId}`;

      const authToken = user.token;
      const headers = new Headers({
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      });

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();
      setData(data.conversation);
      setMessageHistory(data.messageHistory);
      setIsLoading(false);
    };
    loadResources();
  }, [conversationId]);

  return { isLoading, data, setData, messageHistory, setMessageHistory };
};
