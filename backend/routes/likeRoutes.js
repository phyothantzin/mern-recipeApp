import express from 'express'
import { like, dislike } from '../controllers/likeController.js'
import Likes from '../models/LikeModel.js'

const router = express.Router()
s
// User Auth Routes
router.post('/', like)
router.post('/remove', dislike)
router.get('/amount/:recipeId', async (req, res) => {
  try {
    const docs = await Likes.find({ recipeId: req.params.recipeId })
    res.status(200).json(docs)
  } catch (err) {
    res.status(500)
  }
})

export default router
