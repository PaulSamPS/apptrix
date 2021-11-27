import axios from "axios";

export const API_URL_DB = 'https://demo-apptrix.myjetbrains.com/youtrack/api'

const $apiDb = axios.create({
    baseURL: API_URL_DB
})

$apiDb.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL`
    return config
})

export default $apiDb