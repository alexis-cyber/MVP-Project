import express from 'express';
import connectDB from './config/database';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const app = express();

connectDB();

import indexRouter from './controllers/UrlController.js';
import urlsRouter from './Routers/UrlRouter.js';

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/api', urlsRouter);

// Server Setup
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});