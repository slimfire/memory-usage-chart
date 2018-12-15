import MemoryUsage from '../models/memoryUsage';
import os, { cpus } from 'os';
import { callbackify } from 'util';

type TCallback = (...args) => any;

class API {
    private interval: NodeJS.Timer;
    public startIntervalFetching = (interval: number) => {
        if(this.interval) {
            this.clearIntervalFetching();
        }

        this.interval = setInterval(() => {
            this.addMemoryUsageToDB(() => {});
        }, interval);
    }

    public clearIntervalFetching = () => {
        clearInterval(this.interval);
    }

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
