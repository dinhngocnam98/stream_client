import axiosClient from "../config/axiosClient";

const SyncChannelAPI = {
  syncChannel: () => {
    const url = "/syncChannel";
    return axiosClient.get(url);
  }
}

export default SyncChannelAPI;