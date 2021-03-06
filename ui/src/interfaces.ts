import { ACTION_TYPES } from './actions';

export interface IAction {
    type: ACTION_TYPES,
    payload?: any;
}

export interface IMemoryUsage {
    _id: number;
    usage: string;
    timestamp: string;
}

export interface IOSSpec {
    memory: number;
    speed: number;
    model: string;
    arch: string;
    CPUs: number;
}

export interface IStore {
    data?: IMemoryUsage[];
    OSSpec?: IOSSpec;
}