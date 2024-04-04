const express = require('express');
const app = express();
const connectToMongo = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

connectToMongo();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
app.use(bodyParser.json()); 
app.use(express.json()); 


// Routes
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/recipe', require('./Routes/recipe'));
app.use('/api/user', require('./Routes/user'));
app.use('/api/comment', require('./Routes/comment'));
app.use('/api/chat', require('./Routes/chat'));
app.use('/api/message', require('./Routes/message'));


app.use(function(err, req, res, next) {
  res.status(404).send({
    msg : "Sorry, something is wrong up with our server"
  });
});

const port = 5501;
app.listen(port, () => {
  console.log("Server started on port: ", port);
});