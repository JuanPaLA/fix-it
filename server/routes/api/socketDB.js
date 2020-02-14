const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const db = require('../../config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected mother fucker'))
  .catch(err => console.log(err));

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var cors = require('cors');
router.use(cors())

const jobModel = require('../../model/jobs');
const budgetModel = require('../../model/budgets');

const getJobsByUser = (id, req, res) => {
    // var jobs= [];    
    jobModel.findById(mongoose.Types.ObjectId(id))
        .then(job => 
            res.json(job))
        // return jobs
}

module.exports= {getJobsByUser};