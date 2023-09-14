const useFileUpload = () => {
  const fileUpload = async (question, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("question", question);
    try {
      const response = await fetch("http://localhost:8501/chatbotimage", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return { fileUpload };
};
export default useFileUpload;
