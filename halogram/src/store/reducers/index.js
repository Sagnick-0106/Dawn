import { combineReducers } from 'redux'

import user from './user';
import circle from './circle';

export default combineReducers({
  user,
  circle
});
