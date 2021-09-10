import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';

import { router as competencyRouter } from './routes/competency';
import { router as authRouter } from './routes/auth';
import fileUpload from 'express-fileupload';

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

console.log('__public', path.join(__dirname, 'public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.use('/api/competency', competencyRouter);
app.use('/api/auth', authRouter);

export default app