import { combineReducers } from 'redux';

import error from './error'
import isAuthReducer from '../../Authorization/Login/reducer'
import loadingReducer from './loading'
import username from '../../Authorization/Accounts/reducer'
import galleries from '../../Components/Galleries/reducer'

const rootReducer = combineReducers({
  error,
  galleries,
  isAuth: isAuthReducer,
  loading: loadingReducer,
  username,
});

export default rootReducer;

