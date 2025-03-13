import axiosClient from "./axiosClient";

const HeaderAPI = {
    geConfig: () => {
        const url = "/config";
        return axiosClient.get(url);
    }
}

export default HeaderAPI;