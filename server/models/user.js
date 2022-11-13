import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'email jest wymagany'] },
  password: { type: String, required: [true, 'hasło jest wymagane'] },
  salt: String,
})

export const UserModel = mongoose.model('User', newsSchema)
