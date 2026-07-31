import api from "./axios";

// Upload a resource — likely a file upload given express-fileupload is in your middleware stack
export const uploadResource = async (payload) => {
  const { data } = await api.post("/resources/upload", payload);
  return data;
};

// Increment download count for a resource
export const incrementDownload = async (payload) => {
  const { data } = await api.post("/resources/increment-download", payload);
  return data;
};

// Search resources
export const searchResources = async (payload) => {
  const { data } = await api.post("/resources/search", payload);
  return data;
};

// Delete a resource
export const deleteResource = async (payload) => {
  const { data } = await api.delete("/resources/delete", { data: payload });
  return data;
};