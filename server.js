const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { createServer } = require("http");
const socket = require('./core/socket');
const createRouter = require('./routers/index');
const errorCatcher = require('./middleware/errorCatcher');

const PORT = process.env.PORT || 3002;

const app = express();
const httpServer = createServer(app);
const io = socket(httpServer);

app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true
}));
app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

//api
const router = createRouter(io);

app.use('/api', router);
app.use(errorCatcher);

//
const start = async () => {
   try {
      await mongoose.connect(
         process.env.DB_URL,
         { autoIndex: false }
      );

      httpServer.listen(PORT, async () => console.log('SERVER', PORT))
   } catch (err) {
      console.log(err)
   }
}

start();