import { useLocalStorage } from "./useLocalStorage";

export const useSendUserChatById = async (conversationId, chat) => {
  const { fetchPersonalDetails } = useLocalStorage();
  const user = fetchPersonalDetails();
  const userId = user.data.id;
  const authToken = user.token;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations/${conversationId}/${userId}`;

  const headers = new Headers({
    Authorization: `${authToken}`,
    "Content-Type": "application/json",
  });

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ text: chat[chat.length - 1] }),
  });

  const data = await response.json();
  return data;
};
