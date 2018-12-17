import express from 'express';
import bodyParser from 'body-parser';
import { fetchMemoryUsage, getOSSpec } from './lib';
import { PORT } from './config';
import cors from 'cors';

const server = express();

// Setup middlewares
server.use(cors({}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Setup routes
server.post('/memory-usage', fetchMemoryUsage);
server.get('/os-spec', getOSSpec);

// Setup server
server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
