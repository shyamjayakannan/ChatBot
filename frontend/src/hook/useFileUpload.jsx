const useFileUpload = () => {
  const fileUpload = async (question, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("question", question);
    console.log(formData);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      console.log("File uploaded:", response.data.fileUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return { fileUpload };
};
export default useFileUpload;
