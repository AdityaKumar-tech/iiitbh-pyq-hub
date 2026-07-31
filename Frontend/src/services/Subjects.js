import api from "./axios";

// Get all subject details
export const getSubjectDetails = async (payload) => {
  const { data } = await api.post("/subjects/details", payload);
  return data;
};

//Create Subject
export const createSubject = async (payload) => {
  const { data } = await api.post("/subjects/create", payload);
  return data;
};

//Update Subject
export const updateSubject = async (payload) => {
  const { data } = await api.put("/subjects/update", payload);
  return data;
};

//Delete Subject
export const deleteSubject = async (payload) => {
  const { data } = await api.delete("/subjects/delete", { data: payload });
  return data;
};