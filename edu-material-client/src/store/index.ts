import { createStore } from "redux";
import rootReducer from "../reducers/index";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor }
}