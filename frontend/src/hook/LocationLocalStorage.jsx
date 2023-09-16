export const useLocationLocalStorage = () => {
  const updatePersonalDetails = (data) => {
    localStorage.setItem("PersonalDetails", JSON.stringify(data));
  };
  const fetchPersonalDetails = () => {
    const Data = localStorage.getItem("PersonalDetails");
    const response = JSON.parse(Data);
    return response;
  };
  const removePersonalDetails = () => {
    localStorage?.removeItem("PersonalDetails");
  };

  return {
    updatePersonalDetails,
    fetchPersonalDetails,
    removePersonalDetails,
  };
};
