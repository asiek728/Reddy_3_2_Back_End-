const jwt = require('jsonwebtoken')
const User = require('../models/User')

const { v4: uuidv4 } = require('uuid');


const requireAuth = async (req, res, next) => {

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token is required for this feature'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.TEST_SECRET)

    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth
