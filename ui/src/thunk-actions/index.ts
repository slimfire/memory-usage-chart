import { ThunkDispatch } from 'redux-thunk';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { fetchDataSuccess, fetchDataError, fetchOSSpecSuccess, fetchOSSpecError } from '../actions/actions';
import { IStore, IAction } from '../interfaces';

const BASE_URL = 'http://localhost:9000';

/**
 * Fetches data from service
 *  - if success, dispatches fetchDataSuccess with data or
 *  - if error, dispatches fetchDataError with error
 * @param startTime timestamp in milliseconds
 * @param endTime timestamp in milliseconds
 */
export const fetchDataThunkAction = (startTime: number | string, endTime: number | string) => {
    return (dispatch: ThunkDispatch<IStore, IAction, any>) => {
        return axios.post(`${BASE_URL}/memory-usage`, {
            startTime, endTime,
        })
        .then(({ data }: AxiosResponse) => {
            return dispatch(fetchDataSuccess(data ? data: []))
        })
        .catch(({ response }: AxiosError) => {
            return dispatch(fetchDataError(JSON.stringify(response)));
        });
    }
}

/**
 * Fetches OS Spec from service
 * - if success dispatches fetchOSSpecSuccess with OS Spec
 * - else dispatches fetchOSSpecError with error
 */
export const fetchOSSpecThunkAction = () => {
    return (dispatch: ThunkDispatch<IStore, IAction, any>) => {
        return axios.get(`${BASE_URL}/os-spec`)
            .then(({ data: OSSpec }: AxiosResponse) => {
                return dispatch(fetchOSSpecSuccess(OSSpec));
            })
            .catch(({ response }: AxiosError) => {
                return dispatch(fetchOSSpecError(JSON.stringify(response)));
            });
    }
}
