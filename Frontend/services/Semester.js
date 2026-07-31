import api from "./axios";

// Get all semesters
export const getAllSemesters = async () => {
  const { data } = await api.get("/semesters/");
  return data;
};

// Create a semester
export const createSemester = async (payload) => {
  const { data } = await api.post("/semesters/create", payload);
  return data;
};

// Bulk-initialize semesters (e.g. seed semesters 1-8)
export const initializeSemesters = async (payload) => {
  const { data } = await api.post("/semesters/init", payload);
  return data;
};

// Update a semester
export const updateSemester = async (payload) => {
  const { data } = await api.put("/semesters/update", payload);
  return data;
};

// Delete a semester
export const deleteSemester = async (payload) => {
  const { data } = await api.delete("/semesters/delete", { data: payload });
  return data;
};