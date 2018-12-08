import { Express, Request, Response } from 'express-serve-static-core';
import API from './api';

export const fetchMemoryUsage = (req: Request, res: Response) => {
    let {
        body: { startTime, endTime },
    } = req;

    startTime = startTime ? startTime : -Infinity;
    endTime = endTime ? endTime : new Date().getTime();

    API.fetchData(startTime, endTime, (data) => {
        res.json(data ? data : []);
    });
}
