import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3042',
  //baseURL: 'http://api.localhost'
})

request.interceptors.request.use(
  request => {
    /*
    const token = localStorage.getItem('token')
    if (token) {
      request.headers.Authorization = token
    }
      */
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

export default request