import { ACTION_TYPES } from '../actions';
import { IStore, IAction, IMemoryUsage } from '../interfaces';

const defaultState: IStore = {
    data: [],
};


/**
 * Reduces state data given an action
 * @param state store state
 * @param action dispatched action
 */
export const memoryUsageReducer = (state: IStore = defaultState, action: IAction) => {
    switch(action.type) {
        case ACTION_TYPES.FETCH_DATA_SUCCESS: {
            const { data } = action.payload;
            const storeData = state.data ? state.data : [];
            const newData = data.filter((row: IMemoryUsage) => {
                const inStore = storeData.some(
                    (_row: IMemoryUsage) => _row.timestamp == row.timestamp
                );

                return inStore ? false : true;
            });

            return {
                ...state,
                data: [
                    ...storeData,
                    ...newData,
                ]
            }
        }

        case ACTION_TYPES.FETCH_OS_SPEC_SUCCESS:
            const { OSSpec } = action.payload;
            return {
                ...state,
                OSSpec,
            };

        default:{
            return state;
        }
    }
}
