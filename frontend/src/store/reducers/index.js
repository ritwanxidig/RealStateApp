// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import modal from './modal';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, modal });

export default reducers;
