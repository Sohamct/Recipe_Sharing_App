const express = require('express')
const app = express()
const connectToMongo = require('./db')
const cors = require('cors')

connectToMongo()

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  }));

app.use('/api/auth', require('./Routes/auth'))
app.use('/api/recipe', require('./Routes/recipe'))
app.use('/api/comment', require('./Routes/comment'))

app.listen(5501, () => {
  console.log("Server is started")

    console.log("Server started on port: 5501")
})