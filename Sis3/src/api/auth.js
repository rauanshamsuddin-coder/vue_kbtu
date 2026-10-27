import api from './axios'

export const login = (username, password) => api.post('/auth/login', { username, password, expiresInMins: 60 })
export const getMe = () => api.get('/auth/me')
