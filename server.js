require("dotenv").config();

const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());


const flashStackRoutes = require('./routes/flashStacks')
const flashCardRouters = require('./routes/flashCards')
const commentsRoutes = require('./routes/comments')
const threadRoutes = require("./routes/thread");
const userRoutes = require('./routes/users')

// routes

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the flash stacks app' })
})

app.use('/flashStacks', flashStackRoutes)
app.use('/flashCards', flashCardRouters)
app.use('/comments', commentsRoutes)
app.use("/threads", threadRoutes)
app.use('/users', userRoutes)




module.exports = app
