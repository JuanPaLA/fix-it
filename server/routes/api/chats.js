const express = require('express')
const router = express.Router()
var cors = require('cors');
router.use(cors())

const chatModel = require('../../model/chat');
const messageModel = require('../../model/messages');

//POST budget
router.post('/chats/add', (req, res) => {
    const newChat = new chatModel({
        jobId: req.body.jobId,
        userId: req.body.userId,
        workerId: req.body.workerId,
        messages: req.body.messages,
    })

    newChat.save()
    .then(chat => 
        res.json(chat)
    )
    .catch(err => {
        res.status(500).send("Server error on post budgets")
    })
})

//@GET CHATS BY JOBID
router.get('/chats/job/:jobId', (req, res) => {
    chatModel.find({ jobId: req.params.jobId })
    .then(chats => 
        res.json(chats))
    .catch(err => 
        console.log("error gettting chats by jobId"))
});

module.exports = router;