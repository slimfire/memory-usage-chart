import { ACTION_TYPES } from '../actions';
import { IStore, IAction } from '../interfaces';

export const memoryUsageReducer = (state: IStore, action: IAction) => {
    switch(action.type) {
        case ACTION_TYPES.FETCH_DATA: {
           const data = action.payload;

           return {
               ...state.data,
               ...data,
           }
        }
        default:{
            return state;
        }
    }
}