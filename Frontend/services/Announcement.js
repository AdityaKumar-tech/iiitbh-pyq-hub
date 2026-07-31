import api from "./axios";

// Get all announcements
export const getAllAnnouncements = async () => {
  const { data } = await api.get("/announcements/");
  return data;
};

// Create an announcement — admin only
export const createAnnouncement = async (payload) => {
  const { data } = await api.post("/announcements/create", payload);
  return data;
};