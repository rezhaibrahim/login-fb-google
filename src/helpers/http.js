import { default as axios } from 'axios'
// const {API_URL} = 'http://localhost:8080/'
const { REACT_APP_API_URL } = process.env
console.log(process.env);
const http = (token = false) => {
    return axios.create({
        baseURL: REACT_APP_API_URL,
        headers: {
            'Authorization': token ? `Bearer ${token}` : undefined
        }
    })
}
export default http
