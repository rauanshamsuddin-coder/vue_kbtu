import api from './axios'

export const getProducts = (params) => api.get('/products', { params })
export const searchProducts = (q, params) => api.get('/products/search', { params: { q, ...params } })
export const getProduct = (id) => api.get(`/products/${id}`)
export const getCategories = () => api.get('/products/category-list')
export const getByCategory = (cat, params) => api.get(`/products/category/${cat}`, { params })
export const createProduct = (data) => api.post('/products/add', data)
export const updateProduct = (id, data) => api.put(`/products/${id}`, data)
export const deleteProduct = (id) => api.delete(`/products/${id}`)
