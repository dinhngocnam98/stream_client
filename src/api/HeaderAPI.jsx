import axiosClient from "../config/axiosClient";

const HeaderAPI = {
  geConfig: () => {
    const url = "/config";
    return axiosClient.get(url);
  }
}

export default HeaderAPI;