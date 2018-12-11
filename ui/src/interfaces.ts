import { ACTION_TYPES } from './actions';

export interface IAction {
    type: ACTION_TYPES,
    payload?: any;
}

export interface IMemoryUsage {
    usage: string;
    timestamp: string;
}

export interface IStore {
    data?: IMemoryUsage[];
}