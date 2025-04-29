import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://localhost:8000/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
export default instance
