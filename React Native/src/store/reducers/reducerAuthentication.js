import React from 'react';
import ActionAuthentication from '../actions/actionAuthentication.js'


function reducerAuthentication(state = [], action) {
  switch (action.type) {
    case ActionAuthentication.SIGN_UP:
      return action.isSignin
    case ActionAuthentication.LOGIN:
      return action.isLogin
    default:
      return state
  }
}
export default reducerAuthentication;