import express from 'express';
import bodyParser from 'body-parser';
import registerUIRoutes from './views/routes';
import { fetchMemoryUsage } from './controller';
import { PORT } from './config';

const server = express();

registerUIRoutes(server);

server.post('/fetchMemoryUsage', fetchMemoryUsage);

server.use(bodyParser.json());

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
