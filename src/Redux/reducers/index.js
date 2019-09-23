import { combineReducers } from 'redux';
import { app } from './appReducer';
import { APP_STATE } from '../actions';

export default combineReducers({ [APP_STATE]: app });
