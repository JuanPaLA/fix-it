var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(cors());

// mongoose
//     .connect(db)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
console.log("Server is running on " + port + "port");
});