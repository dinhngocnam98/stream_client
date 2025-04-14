import channelListAPI from "../../api/ChannelListAPI";

export const FETCH_CHANNELS = 'FETCH_CHANNELS';
export const FETCH_NEWS = "FETCH_NEWS";
export const ADD_CHANNEL = 'ADD_CHANNEL';
export const GET_CHANNEL = 'GET_CHANNEL';
export const UPDATE_CHANNEL = 'UPDATE_CHANNEL';
export const DELETE_CHANNEL = 'DELETE_CHANNEL';
export const LIVE_STREAM = 'LIVE_STREAM';
export const CHANNEL_ERROR = 'CHANNEL_ERROR';

export const fetchChannels = () => {
  return async dispatch => {
    try {
      const response = await channelListAPI.getChannelList();
      dispatch({type: FETCH_CHANNELS, payload: response.data});
    } catch (error) {
      dispatch({type: CHANNEL_ERROR, payload: error.response.data.message}); // Gửi action lỗi
    }
  };
};

export const addChannel = (channel) => {
  return async dispatch => {
    try {
      const response = await channelListAPI.addChannel(channel);
      dispatch({type: ADD_CHANNEL, payload: response.data});
    } catch (error) {
      dispatch({type: CHANNEL_ERROR, payload: error.response.data.message});
    }
  };
};

export const getChannel = (channel) => {
  return async dispatch => {
    try {
      const response = await channelListAPI.getChannel(channel);
      dispatch({type: GET_CHANNEL, payload: response.data});
    } catch (error) {
      dispatch({type: CHANNEL_ERROR, payload: error.response.data.message});
    }
  };
};

export const updateChannel = (channel) => {
  return async dispatch => {
    try {
      const response = await channelListAPI.updateChannel(channel);
      dispatch({type: UPDATE_CHANNEL, payload: response.data, oldChannel: channel});
    } catch (error) {
      dispatch({type: CHANNEL_ERROR, payload: error.response.data.message});
    }
  };
};

export const deleteChannel = (id) => {
  return async dispatch => {
    try {
      await channelListAPI.deleteChannel(id); // Thêm gọi API để xóa channel
      dispatch({type: DELETE_CHANNEL, payload: id});
    } catch (error) {
      dispatch({type: CHANNEL_ERROR, payload: error.response.data.message}); // Gửi action lỗi
    }
  };
};

export const liveStream = (channel) => {
  return async dispatch => {
    try {
      const response = await channelListAPI.liveStream(channel); // Thêm gọi API để xóa channel
      dispatch({type: LIVE_STREAM, payload: response.data});
    } catch (error) {
      dispatch({type: CHANNEL_ERROR, payload: error.response.data.message}); // Gửi action lỗi
    }
  };
};
export const fetchNews = () => async (dispatch) => {
  try {
    const response = await channelListAPI.getNews();
    dispatch({type: FETCH_NEWS, payload: response.data});
  } catch (error) {
    dispatch({type: CHANNEL_ERROR, payload: error.message});
  }
};
