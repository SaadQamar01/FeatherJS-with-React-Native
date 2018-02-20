import React from 'react';
import { createStore } from 'redux';
import {combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducerAuthentication from './reducers/reducerAuthentication.js';


const middleware = applyMiddleware(thunk);
var combineReducer=combineReducers({reducerAuthentication})
let store = createStore(combineReducer,middleware);
// store.subscribe(() =>
  // console.log(store.getState())
// )
export default store;