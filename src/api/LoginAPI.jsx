import axiosClient from "./axiosClient";

const LoginAPI = {
    login: (user) => {
        const url = "/login";
        return axiosClient.post(url, user);
    }
}

export default LoginAPI;