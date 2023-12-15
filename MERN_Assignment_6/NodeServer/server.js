const express = require('express');
const cors = require('cors');
const DatafromProduct = require('./routes/products');
const config = require('config');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/product', DatafromProduct);



app.listen(config.get("port"),()=>{console.log('Server started at 5001')});