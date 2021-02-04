import http from '../../helpers/http'
import qs from 'qs'
import { default as axios } from 'axios'

// const { REACT_APP_API_URL } = process.env
// console.log("cek",REACT_APP_API_URL);
export default {
    login: (data) => ({
        type: 'LOGIN',
        payload: axios.post(`http://18.139.50.74:8080/login`, qs.stringify(data)),
    }),
    register: (data) => ({
        type: 'SIGNUP',
        payload: axios.post(`/register`, qs.stringify(data)),
    }),
    logout: () => ({
        type: 'LOGOUT',
    }),
    setToken: (payload) => ({
        type: 'SET_TOKEN',
        payload,
    })
}; 