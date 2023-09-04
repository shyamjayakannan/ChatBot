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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_BOT}`,
          },
          body: JSON.stringify({ question: question }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return { check, answer };
};
export default useBot;
