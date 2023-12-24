// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import menu from './menu';
import modal from './modal';
import auth from './auth';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, modal, auth });

const persistConfig = {
  key: 'root',
  storage,
  version: 1
};

const persistedReucer = persistReducer(persistConfig, reducers);

export default persistedReucer;
