import mongoose from 'mongoose'
import { URL } from '../config/database'


mongoose.connect(URL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
 }, function (error) {
 if (!error) return;
 console.log('Falha na conexao!', error)
})
mongoose.Promise = global.Promise;

module.exports = mongoose