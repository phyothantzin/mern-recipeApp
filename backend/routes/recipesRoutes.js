import express from 'express'
import {
  fetchRecipes,
  createRecipes,
  saveRecipes,
  unsaveRecipes,
  deleteRecipes,
  fetchUserRecipes,
} from '../controllers/recipesController.js'
// import upload from '../middleware/imageMiddleware.js'
import { protect } from '../middleware/authMiddleware.js'
import User from '../models/userModel.js'
import Recipes from '../models/recipesModel.js'

const router = express.Router()

// User Auth Routes
router.route('/').get(protect, fetchRecipes).post(protect, fetchUserRecipes)
router.post('/create', createRecipes)
router.delete('/delete', deleteRecipes)
router.put('/save', saveRecipes)
router.put('/unsave', unsaveRecipes)

router.get('/savedRecipes/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const savedRecipes = await Recipes.find({
      _id: { $in: user.savedRecipes },
    })
    res.status(200).json({ savedRecipes })
  } catch (err) {
    res.status(500)
    throw new Error('Internal Server Error')
  }
})

router.get('/savedRecipes/ids/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.status(201).json({ savedRecipes: user?.savedRecipes })
  } catch (err) {
    res.status(500)
    throw new Error('Internal Server Error')
  }
})

export default router
