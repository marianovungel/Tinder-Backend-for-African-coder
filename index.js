require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require("./db")

//importações
const Auth = require('./routes/Auth')
const SmsRouter = require('./routes/Sms')

//------------users-----------
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//-------routes--------
app.use("/auth", Auth)
app.use("/", SmsRouter)

app.listen("8080", console.log("servidor está a funcionar!"))