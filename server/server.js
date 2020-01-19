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
const budgets = require('./routes/api/budgets');
const jobs = require('./routes/api/jobs');
const users = require('./routes/api/users');

app.use('/api', quotes);
app.use('/api', services);
app.use('/api', budgets);
app.use('/api', jobs);
app.use('/api', users);


const port = process.env.PORT || 5000;

app.listen(port, () => {
console.log("Server is running on " + port + "port");
});