import http from './http'

export const getUsers = () => http.get('/users')
export const createUser = (payload) => http.post('/users', payload)
export const removeUser = (id) => http.delete(`/users/${id}`)

export const getCourses = () => http.get('/posts', { params: { _limit: 30 } })

export const getAssignments = () => http.get('/todos', { params: { _limit: 40 } })
export const updateAssignment = (id, completed) =>
  http.patch(`/todos/${id}`, { completed })
