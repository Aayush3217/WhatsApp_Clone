import axios from 'axios';


const apiUrl = `${process.env.REACT_APP_API_URL}/api`;

const axiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true // check token is present or not only check middleware ha to 
})

export default axiosInstance;