import { Express, Request, Response } from 'express-serve-static-core';
import API from './api';

export const fetchMemoryUsage = (req: Request, res: Response) => {
    const {
        body: { startTime, endTime },
    } = req;
    API.fetchData(startTime, endTime, (data) => {
        console.log({ req,  startTime, endTime, data });
        res.json(data ? data : []);
    });
}
