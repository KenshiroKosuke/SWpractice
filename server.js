import { config } from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import { router as hospitals } from './routes/hospitals.js';

//Load env vars
config({path:'./config/config.env'});

// connect to database
connectDB();

const app=express();

// Body parser
app.use(express.json())

// Route files
app.use('/api/v1/hospitals',hospitals);

app.get('/', (req, res) => {
    res.send(`<h1>Hello from express</h1>`);
    //res.status(200).json({success:true, data:{id:1}})
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

// Handle unhandled promise rejection
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    // Close server and exit process
    server.close(()=>process.exit(1));
})