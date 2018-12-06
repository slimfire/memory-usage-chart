import MemoryUsage from '../models/memoryUsage';

type TCallback = (...args) => any;

const addMemoryUsageToDB = (usage: number, callback: TCallback) => {
    new MemoryUsage({
        timestamp: new Date().getTime(),
        usage,
    }).save((err: any, data: any) => {
        if(err) {
            console.log(`Error: ${err}`);
            callback(null);
        } else {
            callback(data);
        }
    });
}