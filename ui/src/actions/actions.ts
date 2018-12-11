import { ACTION_TYPES } from './action-types';

export const fetchData = (startTime: number | string, endTime: number | string) => {
    return {
        type: ACTION_TYPES.FETCH_DATA,
        payload: {
            startTime, endTime,
        }
    }
}
