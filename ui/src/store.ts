import { createStore } from 'redux';
import { memoryUsageReducer } from './reducers';

export const store = createStore(memoryUsageReducer);