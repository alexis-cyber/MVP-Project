const express = require('express');
const connectDB = require ('./config/database');
//const indexRouter = require('./controllers/UrlController');
const urlsRouter = require('./Routers/UrlRouter');
const dotenv= require ('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
connectDB();





//app.use('/', indexRouter);
app.use('/api', urlsRouter);

// Server Setup
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});