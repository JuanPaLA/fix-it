var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');
const passport = require("passport");
const cookieParser = require("cookie-parser");
var app = express();

const db = require('./config/keys').mongoURI;

/* --------- SCOKET SETTING -----------*/
const socketio = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = socketio(server)

/* --------- sockets methods -----------*/
io.on('connection', (socket) => {
  //JOIN EMIT METHOD
  socket.on('user', ({id}, callback) => { //use cb for handling others function at the momento the join emite function is hited
    const userModel = require('./model/users');
    userModel.findById({'_id': id})
    .exec((err, doc) =>{
      var aux = doc
      console.log("user " + aux.email)
      return doc
    })
  })

  socket.on('input', ({message, emiter, chatId}) => {
    //creo objeto mensaje para guardar luego en db
    const messageModel = require('./model/messages');
    const chatModel = require('./model/chat');
    const data = new messageModel ({
      chatId: chatId,
      emiter: emiter,
      message: message
    })
    messageModel.create(data)
    chatModel.findOneAndUpdate({_id: chatId}, {$addToSet: {messages:{$each: [data]}}}, {new: true})
    .exec((err, doc) => {
      console.log("from linea 44" , doc)
      return io.emit('output', ({doc}))
    })
    
    
    //traigo todos los mensajes a través del chatId MODEL
    // const chatModel = require('./model/chat')
    // chatModel.find({'_id': chatId})
    // .exec((err, doc) => {
    //   console.log("from linea 46" , doc)
    //   return io.emit('output', ({doc}))
    // })
  })

  socket.on('job', ({id})=> {
    // Bring chat by jobid
    const chatModel = require('./model/chat')
    chatModel.find({'jobId': id})
    .exec((err, doc) =>{
      console.log(doc)
      return doc
    })
  })
  
  socket.on('disconnect', () => {
    console.log('one user had left')
  })
})



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
// Passport config
app.use(passport.initialize());
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
const chats = require('./routes/api/chats');
const messages = require('./routes/api/messages');
const socket = require('./routes/api/socket');

app.use('/api', quotes);
app.use('/api', services);
app.use('/api', budgets);
app.use('/api', jobs);
app.use('/api', users);
app.use('/api', chats);
app.use('/api', messages);
app.use('/api', socket);

const port = process.env.PORT || 5000;

server.listen(port, () => {
console.log("Server is running on " + port + "port");
});