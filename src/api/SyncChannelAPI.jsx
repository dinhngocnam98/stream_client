import axiosClient from "./axiosClient";

const SyncChannelAPI = {
    syncChannel: () => {
        const url = "/syncChannel";
        return axiosClient.get(url);
    }
}

export default SyncChannelAPI;