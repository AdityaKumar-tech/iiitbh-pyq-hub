import api from "./axios";

/**
 * Signup
 */
export const signup = async (payload) => {
  const { data } = await api.post("/auth/signup", payload);
  return data;
};

/**
 * Login
 */
export const login = async (payload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

/**
 * Logout
 */
export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

/**
 * Send OTP
 */
export const sendOTP = async (email) => {
  const { data } = await api.post("/auth/sendotp", {
    email,
  });

  return data;
};

/**
 * Change Password
 */
export const changePassword = async (oldPassword, newPassword) => {
  const { data } = await api.post("/auth/change-password", {
    oldPassword,
    newPassword,
  });

  return data;
};

/**
 * Promote Admin
 */
export const promoteAdmin = async (email, adminSecret) => {
  const { data } = await api.post("/auth/promote-admin", {
    email,
    adminSecret,
  });

  return data;
};