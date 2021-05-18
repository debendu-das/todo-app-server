const mongoose = require('mongoose')

const CONNECTION_URL =
  'mongodb+srv://debendu-das:debendu6@to-do-app.skrpa.mongodb.net/To-Do-App?retryWrites=true&w=majority'

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const PORT = process.env.PORT || 5000
    console.log(`Server Running on Port: ${PORT}`)
  })
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
