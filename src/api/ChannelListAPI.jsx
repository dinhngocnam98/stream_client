import axiosClient from "./axiosClient";

const ChannelListAPI = {
    getChannel: (channel) => {
        const url = "/getStream";
        return axiosClient.post(url, channel);
    },
    getChannelList: () => {
        const url = "/list";
        return axiosClient.get(url);
    },
    addChannel: (newChannel) => {
        const url = "/addStream";
        return axiosClient.post(url, newChannel);
    },
    updateChannel: (channel) => {
        const url = "/update";
        return axiosClient.put(url, channel);
    },
    deleteChannel: (id) => {
        const url = `/delete/${id}`;
        return axiosClient.delete(url);
    },
    liveStream: (channel) => {
        const url = `/live`;
        return axiosClient.post(url, channel);
    },
    getNews: () => {
        const url = "/news";
        return axiosClient.get(url);
    },
};

export default ChannelListAPI;
