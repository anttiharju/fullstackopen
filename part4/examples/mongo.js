const mongoose = require('mongoose')
const logger = require('./utils/logger')

if (process.argv.length < 3) {
  logger.info('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })

  const Note = mongoose.model('Note', noteSchema)

  const note = new Note({
    content: 'HTML is x',
    important: true,
  })

  /*
  note.save().then(result => {
    logger.info('note saved!')
    mongoose.connection.close()
  })
  */
  Note.find({}).then(result => {
    result.forEach(note => {
      logger.info(note)
    })
    mongoose.connection.close()
  })
})
