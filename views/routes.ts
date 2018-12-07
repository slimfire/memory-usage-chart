import React from 'react';
import { Express, Request, Response } from 'express-serve-static-core'
import { renderIndexHTML, MemoryUsageChart } from './'
import { renderToString } from 'react-dom/server';

const reactApp: JSX.Element = React.createElement(MemoryUsageChart);
const reactRootView: string = renderIndexHTML(renderToString(reactApp));

const registerUIRoutes = (server: Express) => {
    server.get('/', (req: Request, res: Response) => {
        res.send(reactRootView)
    });
};

export default registerUIRoutes;
