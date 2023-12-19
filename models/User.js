const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
require('dotenv').config();

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  })

userSchema.statics.signup = async function ( email, password ) {

    if (!email || !password) {
      throw Error('You must enter an email and password!')
    }
    if (!validator.isEmail(email)) {
      throw Error('This email address is not valid!')
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough!')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
      }
    
      const salt = await bcrypt.genSalt(parseInt(process.env.SALT))
      const hash = await bcrypt.hash(password, salt)
    
      const user = await this.create({ email, password: hash })
    
      return user
}

userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('You must enter an email and password!')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('This email address is not valid!')
  }

  const check = await bcrypt.compare(password, user.password)
  if (!check) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)
