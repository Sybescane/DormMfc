import axios from "axios";

export const axiosRequest = axios.create({
    baseURL: 'http://dormitorymisis.ru:4200/'
})