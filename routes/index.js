var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  const data = [
    {
      name: 'Debendu',
      age: 21,
    },
  ]
  res.json(data)
})

module.exports = router
