const express = require('express')
const router = express.Router()
var cors = require('cors');
router.use(cors())

const chatModel = require('../../model/chat');
const messageModel = require('../../model/messages');
const jobModel = require('../../model/jobs')

router.post('/messages/add', (req, res) => {
    const newMessage = new messageModel({
        chatId: req.body.chatId,
        emiter: req.body.emiter,
        message: req.body.message,
    })

    newMessage.save()
    .then(message => 
      chatModel.findOneAndUpdate
      (
        {_id: req.body.chatId},
        {$addToSet: {messages: 
            {$each : [message]}}}, {new: true},
            (err, newAux) => {
              if(err){
                res.status(500).send(err)
              }else{
                res.status(200).send({messages: newAux.message})}}
        ))            
    .catch(err => {
        res.status(500).send("Server error on post budgets")
    })
})

router.post('/messages/addtojob', (req, res) => {
  const newMessage = new messageModel({
      chatId: req.body.chatId,
      jobId: req.body.chatId,
      emiter: req.body.emiter,
      message: req.body.message,
  })

  newMessage.save()
  .then(message => 
    jobModel.findOneAndUpdate
    (
      {_id: req.body.jobId},
      {$addToSet: {messages: 
          {$each : [message]}}}, {new: true},
          (err, newAux) => {
            if(err){
              res.status(500).send(err)
            }else{
              res.status(200).send({messages: newAux.message})}}
      ))            
  .catch(err => {
      res.status(500).send("Server error on post budgets")
  })
})
module.exports = router;