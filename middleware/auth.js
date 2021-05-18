const jwt = require('jsonwebtoken')

const secret = 'mynameisdebendudas'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
      decodedData = jwt.verify(token, secret)

      req.userId = decodedData?.id
    }

    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = auth
