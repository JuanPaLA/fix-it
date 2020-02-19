var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');
const passport = require("passport");
var app = express();

const db = require('./config/keys').mongoURI;

/* --------- SCOKET SETTING -----------*/
const socketio = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = socketio(server)

/* --------- sockets methods -----------*/
io.on('connection', (socket) => {
  console.log('new user connected')
  //SECOND TRAY FROM WORKER-CHAT
  socket.on('mandar', (data) => {
    socket.join(data.jobId)
    const messageModel2 = require('./model/messages');
    const mensaje = new messageModel2 ({
      jobId: data.jobId,
      emiter: data.emiter,
      message: data.message
    })
    messageModel2.create(mensaje)

    // modifico el chatId para que contenga el nuevo mensaje
    const jobModel = require('./model/jobs');
    jobModel.findOneAndUpdate({_id: mensaje.jobId}, 
      {$addToSet: 
        {messages:{$each: [mensaje]}}}, {new: true})
    .exec((true))
    return socket.broadcast.to(mensaje.jobId).emit('salida', (mensaje))    
  })


  //FIRST TRAY
  socket.on("input", (message, emiter, job) => {
    //creo un canal-room 
    socket.join(message.job)

    //CREO objeto mensaje para guardar luego en dbs
      const messageModel = require('./model/messages');
      const mensaje = new messageModel ({
        jobId: message.job,
        emiter: message.emiter,
        message: message.message
      })
      messageModel.create(mensaje)
      console.log("from linea 29" , mensaje.message)
      
      // modifico el chatId para que contenga el nuevo mensaje
      const jobModel = require('./model/jobs');
      jobModel.findOneAndUpdate({_id: mensaje.jobId}, 
        {$addToSet: 
          {messages:{$each: [mensaje]}}}, {new: true})
      .exec((true))

      return socket.broadcast.to(mensaje.jobId).emit('output', (mensaje))
      
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