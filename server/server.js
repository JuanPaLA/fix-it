var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');
const passport = require("passport");
var app = express();

const db = require('./config/keys').mongoURI;

/*-------MIDLEWARES-----------*/
app.use(bodyParser());

// Bodyparser Middleware
app.use(express.json());
app.use(cors());

// This is the way in wich is implemented by tutorial
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./routes/validation/passport")(passport);

mongoose

  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected mother fucker'))
  .catch(err => console.log(err));

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

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