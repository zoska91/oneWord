/**
 * @openapi
 * /login:
 *   post:
 *     description: Login
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 * /users:
 *  get:
 *    description: get all users
 *    response:
 *      200:
 *        description: great
 *
 */

import express from 'express'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'

import { UserModel } from '../models/user.js'
import config from '../config.js'

const router = express.Router()

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const data = await UserModel.findOne({ username })
      console.log(data)
      if (!data) return cb(null, false, { message: `nie ma Cię w bazie` })

      bcrypt.compare(password, data.password, (err, result) => {
        if (result) {
          return cb(null, data)
        } else {
          return cb(null, false, {
            message: 'Incorrect username or password.',
          })
        }
      })
    } catch (err) {
      if (err) {
        console.log(err)
        return cb(err)
      }
    }
  })
)

passport.serializeUser((userObj, done) => {
  done(null, userObj)
})
passport.deserializeUser((userObj, done) => {
  done(null, userObj)
})

router.post('/login', passport.authenticate('local', {}), (req, res) => {
  console.log(req.session)
  res.json({ message: 'success' })
})

router.post('/register', async (req, res) => {
  const { username, password } = req.body

  const findUser = await UserModel.findOne({ username })
  if (findUser)
    return res
      .status(403)
      .json({ message: 'this user is already in the database' })

  bcrypt.hash(password, config.saltRounds, function (err, hash) {
    if (err) return res.status(500).json(err)

    const newUser = new UserModel({
      username,
      password: hash,
    })

    const errors = newUser.validateSync()
    if (errors) return res.status(402).json(errors)

    newUser.save((err) => {
      if (err) console.log(err)
    })

    res.json({ message: 'success' })
  })
})

export default router
