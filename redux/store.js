  
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import login from './login/reducer';
import fetchUserData from './fetch-user-data/reducer';
import fetchImages from './fetch-images/reducer';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
}

const combinedReducer = combineReducers({
  login,
  fetchUserData,
  fetchImages
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
}

const initStore = () => {
  const createStoreVar = createStore(reducer, bindMiddleware([thunkMiddleware]))
  return createStoreVar;
}

export const store = initStore();