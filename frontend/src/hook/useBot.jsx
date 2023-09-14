const useBot = () => {
  const answer = async (question) => {
    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      const response = await fetch("http://localhost:8501/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question }),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return { answer };
};
export default useBot;
