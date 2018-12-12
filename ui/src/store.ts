import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { memoryUsageReducer } from './reducers';

export const store = createStore(memoryUsageReducer, applyMiddleware(thunk));