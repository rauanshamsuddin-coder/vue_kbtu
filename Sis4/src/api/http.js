import axios from 'axios'

const http = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Something went wrong. Try again.'
    if (error.code === 'ECONNABORTED') {
      message = 'The server took too long to respond.'
    } else if (!error.response) {
      message = 'No connection. Check your network.'
    } else if (error.response.status === 404) {
      message = 'The requested data was not found.'
    } else if (error.response.status >= 500) {
      message = 'The server failed. Try again later.'
    }
    error.userMessage = message
    return Promise.reject(error)
  }
)

export default http
