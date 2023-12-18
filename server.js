require('dotenv').config();

const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(cors());
app.use(express.json());

const flashStackRoutes = require('./routes/flashStacks')
const commentsRoutes = require('./routes/comments')


// routes
app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the flash stacks app' })
})

app.use('/flashStacks', flashStackRoutes)
app.use('/comments', commentsRoutes)


//connect to db
mongoose.connect(process.env.DB_URL)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


