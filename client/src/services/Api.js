import axios from 'axios' // connection service

export default () => {
  return axios.create({
    baseURL: `http://localhost:8081/`
  })
}
