import MemoryUsage from '../models/memoryUsage';
import os, { cpus } from 'os';
import { callbackify } from 'util';

type TCallback = (...args) => any;
/*
 * Note:
 * * Server doesn't know how to handle high volume traffic, "cough",
 *   from a variety of end points and so when it gets one, it crashs. 
 *   As a result, critical and time sensitive requests end up getting 
 *   interrupted leading to a failure.
 * Todo:
 * * How does one handle such high volume traffic?
*/

class API {
    private interval: NodeJS.Timer;

    /**
     * Fetches and store memory usage at a given interval
     * @param interval interval for fetching and storing memory usage
     */
    public startIntervalFetching = (interval: number) => {
        if(this.interval) {
            this.clearIntervalFetching();
        }

        this.interval = setInterval(() => {
            this.addMemoryUsageToDB(() => {});
        }, interval);
    }

    /**
     * Removes interval function
     */
    public clearIntervalFetching = () => {
        clearInterval(this.interval);
    }

    /**
     * Fetches and Stores memory usage to db
     * @param callback callback function with list of data
     */
    public addMemoryUsageToDB = (callback: TCallback) => {
        const date = new Date();
        const usage = os.totalmem() - os.freemem();
        const timestamp = date.getTime();
        new MemoryUsage({ timestamp, usage })
            .save((err: any, data: any) => {
                if(err) {
                    console.log(`Error: ${err}`);
                    callback(null);
                } else {
                    console.log({
                        usage,
                        timestamp: date.toLocaleString(),
                    });
                    callback(data);
                }
            });
    }

    /**
     * fetches memory usage data
     * @param startTime timestamp in milliseconds
     * @param endTime timestamp in millisecond
     * @param callback callback function with list of data
     */
    public fetchData = (startTime: number, endTime: number, callback?: TCallback) => {
        const condition = {
            usage: {
                $lte: endTime,
            },
        };
    
        if(startTime) {
            condition.usage['$gte'] = startTime;
        }
    
        MemoryUsage.find({}, (err, data) => {
            if(err) {
                console.log(err);
                callback([]);
            }
    
            this.parseData(data, startTime, endTime, (outputData) => {
                callback(outputData);
            });
        });
    }

    /**
     * Fetches OS sepc
     * @param callback callback function with os spec
     */
    public getOSSpec = (callback: TCallback) => {
        const memory = os.totalmem();
        const CPUs = os.cpus();
        const CPUsCount = CPUs.length;
        const arch = os.arch();
        const model = CPUs.length > 1 ? CPUs[0].model : '';
        const speed = CPUs.length > 1 ? (CPUs[0].speed/1000).toFixed(1) : '';

        callback({
            CPUs: CPUsCount,
            arch,
            model,
            speed,
            memory,
        })
    }
    

    /**
     * parses data within the range of starttime and endtime
     * @param data list of memoryusage - timestamp data
     * @param startTime timestamp in milliseconds
     * @param endTime timestamp in milliseconds
     * @param callback callback function with data between startTime and endTime
     */
    public parseData = (data: any[], startTime: number, endTime: number, callback: TCallback) => {
        const outputData = [];
        for(let i = 0; i < data.length; i++) {
            const row = data[i];
            const timestamp = parseInt(row.timestamp);
            if((timestamp >= startTime) && (timestamp <= endTime)) {
                outputData.push(row);
            }
    
            if(i === data.length - 1) {
                callback(outputData);
            }
        };
    }
}

export default new API();
