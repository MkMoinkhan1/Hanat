import api from "../lib/axios"

export const login = async (email, password, isRemembered) => {
  const response = await api.post('/auth/log-in', {
    email,
    password,
    isRemembered
  })

  if (response.data?.token) {
    cookieStore.set('access_token', response.data.token)
  }

  return response.data
}