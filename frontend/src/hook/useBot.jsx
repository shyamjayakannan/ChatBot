const useBot = () => {
  const check = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_BOT}`,
          },
          body: JSON.stringify({}),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const answer = async (question) => {
    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      const response = await fetch(
        "http://localhost:8501/chatbot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: question }),
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return { check, answer };
};
export default useBot;
