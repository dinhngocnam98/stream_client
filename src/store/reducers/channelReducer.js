import {
    FETCH_CHANNELS,
    ADD_CHANNEL,
    UPDATE_CHANNEL,
    DELETE_CHANNEL,
    CHANNEL_ERROR,
    LIVE_STREAM,
    FETCH_NEWS, GET_CHANNEL
} from '../actions/channelActions';
import {toast} from "react-toastify";

const initialState = {
    currentChannel: null,
    channels: [],
    news: []
};

const channelReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHANNELS:
            return {...state, channels: action.payload};
        case FETCH_NEWS:
            return {...state, news: action.payload};
        case GET_CHANNEL:
            return {...state, currentChannel: action.payload};
        case ADD_CHANNEL:
            toast.success("Add stream successfully.");
            return {...state, channels: [...state.channels, action.payload]};
        case UPDATE_CHANNEL:
            toast.success("Update stream successfully.");
            return {
                ...state,
                channels: state.channels.map(channel =>
                    channel.id === action.oldChannel.id ? action.payload : channel
                ),
            };
        case DELETE_CHANNEL:
            toast.success("Delete stream successfully.");
            return {
                ...state,
                channels: state.channels.filter(channel => channel.id !== action.payload),
            };
        case LIVE_STREAM:
            toast.success(action.payload.isLive ? "Turn on stream successfully." : "Turn off stream successfully.");
            return {
                ...state,
                channels: state.channels.map(channel =>
                    channel.id === action.payload.id ? action.payload : channel
                ),
            };
        case CHANNEL_ERROR: // Xử lý lỗi
            toast.error("Error: " + action.payload);
            return {...state, error: action.payload};
        default:
            return state;
    }
};

export default channelReducer;
