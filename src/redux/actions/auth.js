import http from '../../helpers/http'
import qs from 'qs'
import { default as axios } from 'axios'

const { REACT_APP_API_URL } = process.env
console.log("cek",REACT_APP_API_URL);
export default {
    login: (data) => ({
        type: 'LOGIN',
        payload: http().post(`${REACT_APP_API_URL}login`, data),
    }),
    register: (data) => ({
        type: 'SIGNUP',
        payload: http().post(`${REACT_APP_API_URL}register`,data),
    }),
    logout: () => ({
        type: 'LOGOUT',
    }),
    setToken: (payload) => ({
        type: 'SET_TOKEN',
        payload,
    })
}; 