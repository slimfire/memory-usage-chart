import express from 'express';
import bodyParser from 'body-parser';
import { fetchMemoryUsage, API, getOSSpec } from './controllers';
import { PORT } from './config';
import cors from 'cors';

const server = express();

server.use(cors({}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.post('/memory-usage', fetchMemoryUsage);
server.get('/os-spec', getOSSpec);

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
