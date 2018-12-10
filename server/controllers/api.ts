import MemoryUsage from '../models/memoryUsage';

type TCallback = (...args) => any;

class API {
    public addMemoryUsageToDB = (usage: number, callback: TCallback) => {
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
