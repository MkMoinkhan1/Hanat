import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Add token if exists (optional for login)
    const token = typeof window !== 'undefined' ? cookieStore.get('auth-token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 (unauthorized) globally
      if (error.response.status === 401 || error.response.status === 403) {
        console.warn('Unauthorized. Redirecting to login...')
        
        cookieStore.delete('auth_token') // Optional
        if (typeof window !== 'undefined') {
          window.location.href = '/en/auth/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api
