const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();


const createToken = (_id) => {
  // const SECRET = uuidv4()
  // return jwt.sign({_id}, SECRET, { expiresIn: '3d' })

  return jwt.sign({_id}, process.env.TEST_SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const signupUser = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await User.signup(email, password)
  
      const token = createToken(user._id)
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

module.exports = { signupUser, loginUser, createToken }
