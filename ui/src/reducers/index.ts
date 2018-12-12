import { ACTION_TYPES } from '../actions';
import { IStore, IAction, IMemoryUsage } from '../interfaces';

const defaultState: IStore = {
    data: [],
};

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
                data: [
                    ...storeData,
                    ...newData,
                ]
            }
        }

        default:{
            return state;
        }
    }
}
