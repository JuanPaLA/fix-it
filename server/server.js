var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');
var app = express();


const db = require('./config/keys').mongoURI;

/*-------MIDLEWARES-----------*/
app.use(bodyParser());
app.use(cors());

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected mother fucker'))
  .catch(err => console.log(err));

const services = require('./routes/api/services');
const quotes = require('./routes/api/quotes');

app.use('/api', quotes);
app.use('/api', services);



const port = process.env.PORT || 5000;

app.listen(port, () => {
console.log("Server is running on " + port + "port");
});