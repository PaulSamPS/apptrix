import axios from "axios";

export const API_URL_AUTH = 'http://erp.apptrix.ru/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL_AUTH
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('AccessToken')}`
    return config
})

export default $api