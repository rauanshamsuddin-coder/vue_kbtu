import axios from 'axios'

const api = axios.create({ baseURL: 'https://dummyjson.com', timeout: 10000 })

// attach the token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// turn any axios error into a readable message
api.interceptors.response.use(
  (res) => res,
  (err) => {
    err.userMessage = err.response?.data?.message || (err.code === 'ECONNABORTED' ? 'The request timed out.' : err.message)
    return Promise.reject(err)
  },
)

export default api
