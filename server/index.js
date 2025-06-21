const express = require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const LocationRoute = require('./route/locationRoute');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGO_URL).then(()=>{
    console.log('Mongo DB connected......');
}).catch(e=>{
    console.log(e);

});

app.use('/api/v1/location', LocationRoute);


app.listen(PORT,()=>{
    console.log(`server started and running on ${PORT}`);
})
