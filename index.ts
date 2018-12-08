import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express-serve-static-core';
import { fetchMemoryUsage } from './controllers';
import { PORT } from './config';
import serveStatic from 'serve-static';

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(__dirname + '/public'));

server.post('/fetchMemoryUsage', fetchMemoryUsage);

server.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
