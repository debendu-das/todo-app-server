var express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var router = express.Router()
const User = require('../Models/user')

const secret = 'mynameisdebendudas'

router.post('/', async (req, res, next) => {
  const { email, password } = req.body

  try {
    const oldUser = await User.findOne({ email }).select('+password')
    if (!oldUser)
      return res.status(401).send({ message: "User doesn't exist!" })

    const isCorrectPassword = await bcrypt.compare(password, oldUser.password)
    if (!isCorrectPassword)
      return res.status(400).json({ message: 'Invalid password!' })

    const token = jwt.sign({ id: oldUser._id, name: oldUser.name }, secret)

    res.status(200).json({ result: oldUser.name, token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
