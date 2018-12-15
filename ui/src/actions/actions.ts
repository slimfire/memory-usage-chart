import { ACTION_TYPES } from './action-types';
import { IMemoryUsage, IOSSpec } from '../interfaces';

export const fetchData = (startTime: number | string, endTime: number | string) => {
    return {
        type: ACTION_TYPES.FETCH_DATA,
        payload: {
            startTime, endTime,
        }
    }
}

export const fetchOSSpec = () => {
    return {
        type: ACTION_TYPES.FETCH_OS_SPEC,
    };
}

export const fetchOSSpecSuccess = (OSSpec: IOSSpec) => {
    return {
        type: ACTION_TYPES.FETCH_OS_SPEC_SUCCESS,
        payload: {
            OSSpec,
        },
    };
}

export const fetchOSSpecError = (error?: string) => {
    return {
        type: ACTION_TYPES.FETCH_OS_SPEC_SUCCESS,
        payload: {
            error,
        },
    };
}

export const fetchDataSuccess = (data: IMemoryUsage[]) => {
    return {
        type: ACTION_TYPES.FETCH_DATA_SUCCESS,
        payload: {
            data,
        },
    };
}

export const fetchDataError = (error?: string) => {
    return {
        type: ACTION_TYPES.FETCH_DATA_ERROR,
        payload: {
            error
        }
    }
}