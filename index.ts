import express from 'express';
import BodyParser from 'body-parser';

const app = express();

app.use(BodyParser.json());
app.get('*', (req, res) => {
    res.json('Hello World');
});

app.listen(3000, () => {
    console.log('Server running on 3000');
});
