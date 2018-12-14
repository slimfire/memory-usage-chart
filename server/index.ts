import express from 'express';
import bodyParser from 'body-parser';
import { fetchMemoryUsage } from './controllers';
import { PORT } from './config';
import cors from 'cors';

const server = express();

server.use(cors({}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.post('/fetchMemoryUsage', fetchMemoryUsage);

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
