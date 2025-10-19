import express from 'express';
import apiRouter from './src/routes/index.js';
import { API_PORT } from './src/config.js';

const app = express();

app.use(express.json());

app.use('/api', apiRouter);



app.listen(API_PORT, () => {
    console.log(`Server is running on port ${API_PORT}`);
});
