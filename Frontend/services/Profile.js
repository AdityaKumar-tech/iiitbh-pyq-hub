import api from "./axios";

// Update profile details
export const updateProfile = async (payload) => {
  const { data } = await api.put("/profile/updateProfile", payload);
  return data;
};

// Get logged-in user's details
export const getUserDetails = async () => {
  const { data } = await api.get("/profile/getUserDetails");
  return data;
};

// Update display picture — must be sent as FormData, not JSON,
export const updateDisplayPicture = async (file) => {
  const formData = new FormData();
  formData.append("displayPicture", file);

  const { data } = await api.put("/profile/updateDisplayPicture", formData);
  return data;
};