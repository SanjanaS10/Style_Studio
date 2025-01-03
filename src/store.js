// src/store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // Replace with your reducer

const store = createStore(rootReducer);

export default store;
