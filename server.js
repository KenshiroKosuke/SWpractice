import { config } from 'dotenv';
import express from 'express';
import { router as hospitals } from './routes/hospitals.js';

//Load env vars
config({path:'./config/config.env'});

const app=express();

app.get('/', (req, res) => {
    res.send(`<h1>Hello from express</h1>`);
    //res.status(200).json({success:true, data:{id:1}})
});

app.use('/api/v1/hospitals',hospitals);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
