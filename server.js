const dotenv = require('dotenv');
const express = require('express');

//Load env vars
dotenv.config({path:'./config/config.env'});

const app=express();

app.get('/', (req, res) => {
    res.send(`<h1>Hello from express</h1>`);
    //res.status(200).json({success:true, data:{id:1}})
});

app.get('/api/v1/hospitals', (req, res) => {
    res.status(200).json({success:true,msg:'Show all hospital'});
});

app.get('/api/v1/hospitals/:id', (req, res) => {
    res.status(200).json({succes:true, msg:`Show hospital ${req.params.id}`})
});

app.post('/api/v1/hospitals', (req, res) => {
    res.status(200).json({success:true, msg:'Create new hospitals'})
});

app.put('/api/v1/hospitals/:id', (req, res) => {
    res.status(200).json({success:true, msg:`Update hosital id: ${req.params.id}`})
});

app.delete('/api/v1/hospitals/:id', (req, res) => {
    res.status(200).json({success:true, msg:`Delete hosital id: ${req.params.id}`})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
