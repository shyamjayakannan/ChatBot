import { useLocalStorage } from "./useLocalStorage";

const usecreateConversation = () => {
  const { fetchPersonalDetails } = useLocalStorage();
  const create = async (name, chat) => {
    const userId = fetchPersonalDetails().data.id;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: name, userId: userId, chat: chat }),
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return { create };
};
export default usecreateConversation;
