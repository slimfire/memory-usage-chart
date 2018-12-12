import { ThunkDispatch } from 'redux-thunk';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { fetchDataSuccess, fetchDataError } from '../actions/actions';
import { IStore, IAction } from '../interfaces';

const BASE_URL = 'http://localhost:9000';

export const fetchDataThunkAction = (startTime: number | string, endTime: number | string) => {
    return (dispatch: ThunkDispatch<IStore, IAction, any>) => {
        return axios.post(`${BASE_URL}/fetchMemoryUsage`, {
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
