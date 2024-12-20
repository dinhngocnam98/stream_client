import axios from "axios";
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api",
    // baseURL: "https://sexy68.com/api",
    headers:{
		"content-type": "application/json",
	},
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) =>{
    return config;
})
axiosClient.interceptors.response.use(
    (response) => {
        if(response && response.data){
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    }
)
export default axiosClient;
