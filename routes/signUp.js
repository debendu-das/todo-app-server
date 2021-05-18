var express = require('express')
var router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../Models/user')
const Task = require('../Models/task')

const secret = 'mynameisdebendudas'

router.post('/', async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  console.log(name, email, password, confirmPassword)

  try {
    const oldUser = await User.findOne({ email })
    if (oldUser) return res.status(400).json({ message: 'User already exits!' })

    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Password not matching!' })

    const hashedPassword = await bcrypt.hash(password, 12)
    console.log(hashedPassword)
    const result = await User.create({ name, email, password: hashedPassword })

    const data = [
      {
        title: 'General',
        list: [
          { title: 'Task 1', completed: false, details: 'Not Completed' },
          { title: 'Task 2', completed: true, details: 'Completed' },
        ],
      },
    ]
    const task = await Task.create({
      userId: result._id.toString(),
      data: data,
    })

    const token = jwt.sign({ id: result._id, name: result.name }, secret)

    res.status(200).json({ result: result.name, token })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
