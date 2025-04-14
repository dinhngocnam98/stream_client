import {combineReducers} from 'redux';
import channelReducer from './channelReducer'; // Import reducer của bạn

const rootReducer = combineReducers({
  channels: channelReducer, // Kết hợp reducer
});

export default rootReducer;
