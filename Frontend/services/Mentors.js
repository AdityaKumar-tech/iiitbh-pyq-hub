import api from "./axios";

// Get all mentors
export const getAllMentors = async () => {
  const { data } = await api.get("/mentors/");
  return data;
};

// Create a mentor — admin only
export const createMentor = async (payload) => {
  const { data } = await api.post("/mentors/create", payload);
  return data;
};