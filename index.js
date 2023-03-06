const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const storage=require('node-sessionstorage')
const session = require("express-session");
const uuid=require('uuid')
app.use(session({
  genid: (req) => {
    return uuid.v4(); // use UUIDs for session IDs
  },
  secret: 'MADHAVMADHAVMADHAV', // Use a secret key to sign the session ID cookie
  resave: false,
  saveUninitialized: true
}));
mongoose.connect('mongodb://localhost:27017/Sports-Bee', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB successfull'))
  .catch(err => console.log("error connecting to MongoDB:", err))
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('public'))
app.set('view engine', 'ejs');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const statspage = require('./routes/stats')
app.use('/stats', statspage)
const statsapi = require('./api/stats')
app.use('/api/stats', statsapi)
const login = require('./routes/login')
app.use('/', login);
const signup = require('./routes/signup')
app.use('/signup', signup)
const sechdule = require('./routes/sechdule')
app.use('/sechdules', sechdule)
const livematches = require('./routes/livematch')
// live match chat and real time score updation starts
const chat = require('./models/livematchchat')
io.on("connection", socket => {
  
  socket.on("message", msg => {
    
    const text_object = { text: msg.text,image:msg.image };
    // chat.updateOne({ id: msg.matchid }, {
    //     $push: {
    //       textmessage: text_object
    //     }
    //   }, function (err, info) {
    //     if (err) console.log(err);
    //   })
    socket.broadcast.emit("server", text_object);
  });
  
  
});
app.get('/livematch', async (req, res) => {
  const chats = await chat.find({ id: "abcde" });
  const data=JSON.parse(decodeURIComponent(req.query.data))
  res.render('livematches.ejs', { data:data });
})
// live match update and real time time chat ends
const profile = require('./routes/home')
app.use('/profile', profile)
const teampages=require('./routes/teampages')
app.use('/teampages',teampages)
const discuss=require('./routes/news_discuss')
app.use('/discuss',discuss)
const userinfo=require('./routes/Userprofile')
app.use('/update',userinfo)
server.listen(port, function () {
  console.log("server is running on port 5000");
})