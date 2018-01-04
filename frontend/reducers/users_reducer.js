import merge from 'lodash/merge';

import {
  RECEIVE_CURRENT_USER,
} from '../actions/session_actions';

import {
  RECEIVE_USER,
} from '../actions/user_actions';


const _nullUsers = Object.freeze({});

const usersReducer = (state = _nullUsers, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_USER:
      return merge({}, { [action.user.id]: action.user });
    case RECEIVE_CURRENT_USER:
      if (action.currentUser) {
        return merge({}, { [action.currentUser.id]: action.currentUser });
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default usersReducer;