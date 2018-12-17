import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { memoryUsageReducer } from './reducers';

// Create Redux Store
export const store = createStore(memoryUsageReducer, applyMiddleware(thunk));