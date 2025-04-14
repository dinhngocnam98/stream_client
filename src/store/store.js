import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

const StoreProvider = ({children}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
