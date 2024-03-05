const express = require('express')
const app = express()
const connectToMongo = require('./db')
const cors = require('cors')
const bodyParser = require("body-parser");


connectToMongo()

app.use(express.json())
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use('/api/auth', require('./Routes/auth'))
app.use('/api/recipe', require('./Routes/recipe'))
app.use('/api/user', require('./Routes/user'));
app.use('/api/comment', require('./Routes/comment'))
app.use('/api/chat', require('./Routes/chat'))
app.use('/api/message', require('./Routes/message'));

//global catches - error middleware
app.use(function(err, req, res, next) {
  res.status(404).send({
    msg : "Sorry, something is wrong up with our server",
  })
});


const port = 5501;

app.listen(port, () => {
  console.log("Server is started")
  console.log(`Server started on port: ${port}`)
})