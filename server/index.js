import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index.js';
import errorMiddleware from './middlewares/error-middleware.js';

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.listen(PORT, () => {
            console.log('server started on port ' + PORT);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
