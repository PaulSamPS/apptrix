import axios from "axios";

export const API_URL_TASKS = 'https://demo-apptrix.myjetbrains.com/youtrack/api'

const $apiProjects = axios.create({
    baseURL: API_URL_TASKS
})

$apiProjects.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL`
    return config
})

export default $apiProjects