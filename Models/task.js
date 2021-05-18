const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  data: [
    {
      title: String,
      list: [
        {
          title: String,
          completed: Boolean,
          details: String,
        },
      ],
    },
  ],
})

let Task = mongoose.model('Task', dataSchema)

module.exports = Task
