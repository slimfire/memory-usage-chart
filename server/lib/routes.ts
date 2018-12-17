import { Express, Request, Response } from 'express-serve-static-core';
import API from './api';

/**
 * Handles fetching and responding with memoryusage data
 * @param req Express Request object
 * @param res Express Response Object
 */
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

/**
 * Handles fetching OS Spec
 * @param req Express Request object
 * @param res Express Response Object
 */
export const getOSSpec = (req: Request, res: Response) => {
    API.getOSSpec((spec) => {
        res.json(spec);
    });
}