const useBot = () => {
  const answer = async (question) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_PYTHON_URL}/chatbot`,
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
  return { answer };
};
export default useBot;
