const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');
// Router files
const bootcamps = require('./routes/bootcamps');
const logger = require('./middlewares/logger');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();
const app = express();

// Body parser

app.use(express.json());

// Dev logging middlewares
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('API is running');
})

const PORT = process.env.PORT || 5500; 

const server = app.listen(PORT, () =>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

// app.listen(PORT, () =>{
//     console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
// });

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
})