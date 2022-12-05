import express from 'express'
import { SettingsModel } from '../models/settings.js'

const router = express.Router()

router.get('/all', async (req, res) => {
  try {
    if (!req.user) res.status(401).json({ message: 'no logged user' })
    const userId = req.user._id.valueOf()
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'something went wrong' })
  }
})

router.post('/add-one', async (req, res) => {
  try {
    if (!req.user) res.status(401).json({ message: 'no logged user' })
    const userId = req.user._id.valueOf()
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'something went wrong' })
  }
})

export default router
