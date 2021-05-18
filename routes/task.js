var express = require('express')
const auth = require('../middleware/auth')
var router = express.Router()

const Task = require('../Models/task')

router.get('/all', (req, res, next) => {
  Task.find()
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send(err)
    })
})

router.get('/', auth, async (req, res, next) => {
  const userId = req.userId
  try {
    const task = await Task.findOne({ userId })

    res.status(200).json(task)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

router.post('/', auth, async (req, res, next) => {
  const userId = req.userId
  const data = req.body

  try {
    const result = await Task.updateOne(
      { userId: userId },
      { $set: { data: data } },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    )
    res.status(200).json(result)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

module.exports = router
