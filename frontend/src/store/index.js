// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';
import { persistStore } from 'redux-persist';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers
});

export const persistor = persistStore(store);

const { dispatch } = store;

export { store, dispatch };
