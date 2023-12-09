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


app.listen(5500, () => {
    console.log("Server started on port: 5501")
})

app.use('/api/auth', require('./Routes/auth'))

app.listen(5501, () => {
  console.log("Server is started")
})