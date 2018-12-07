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

    public fetchData = (startTime: number = -Infinity, endTime: number = new Date().getTime(), callback?: TCallback) => {
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

    private parseData = (data: any[], startTime: number, endTime: number, callback: TCallback) => {
        const outputData = [];
        data.forEach((row: any, index: number) => {
            const usage = parseInt(row.usage);
            if((usage >= startTime) && (usage <= endTime)) {
                outputData.push(row);
            }
    
            if(index === data.length - 1) {
                callback(outputData);
            }
        });
    }
}

export default new API();
