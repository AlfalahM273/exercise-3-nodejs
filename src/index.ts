import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { router as competencyRouter } from './routes/competency';
import { router as authRouter } from './routes/auth';


const app = express();
const port = process.env.PORT || 8080; // default port to listen

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.use('/api/competency', competencyRouter);
app.use('/api/auth', authRouter);


// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});