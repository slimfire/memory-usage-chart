import express from 'express';
import bodyParser from 'body-parser';
import registerUIRoutes from './client/routes';
import { PORT } from './config';

const server = express();

registerUIRoutes(server);

server.use(bodyParser.json());

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
