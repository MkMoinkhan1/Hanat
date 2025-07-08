import api from "../lib/axios"

export const login = async (email, password, isRemembered) => {
  const response = await api.post('/auth/log-in', {
    email,
    password,
    isRemembered
  })
    return response.data
}
export const logout = async () => {
  try {
    const response = await api.post('/auth/log-out');
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    return null;
  }
}

export const checkEmail = async (email) => {
  const response = await api.post('/auth/send-reset-link', { email });
  return response.data;
}

export const resetPassword = async ( password , token ) => {
  const response = await api.post(`/auth/reset-password?token=${token}`, { password });
  return response.data;
}