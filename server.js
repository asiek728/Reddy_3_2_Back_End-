require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());


const flashStackRoutes = require('./routes/flashStacks')
const flashCardRouters = require('./routes/flashCards')
const commentsRoutes = require('./routes/comments')
const threadRoutes = require("./routes/thread");

// routes

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the flash stacks app' })
})

app.use('/flashStacks', flashStackRoutes)
app.use('/flashCards', flashCardRouters)
app.use('/comments', commentsRoutes)
app.use("/threads", threadRoutes);

//connect to db
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
