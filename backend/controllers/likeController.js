import User from '../models/userModel.js'
import Recipes from '../models/recipesModel.js'
import Likes from '../models/likeModel.js'
import asyncHandler from 'express-async-handler'

//@desc Like a post
//route POST api/like/
const like = asyncHandler(async (req, res) => {
  const { userId, recipeId } = req.body
  const user = await User.findById(userId)
  const recipe = await Recipes.findById(recipeId)

  try {
    const likeDoc = await Likes.create({
      userId: user._id,
      recipeId: recipe._id,
    })
    res.status(200).json(likeDoc)
  } catch (err) {
    res.status(500)
    throw new Error('Internal Server Error')
  }
})

//@desc Like a post
//route POST api/like/
const dislike = asyncHandler(async (req, res) => {
  const { userId, recipeId } = req.body
  const user = await User.findById(userId)
  const recipe = await Recipes.findById(recipeId)

  try {
    const dislikeDoc = await Likes.findOneAndDelete({
      userId: user._id,
      recipeId: recipe._id,
    })
    res.status(200).json(dislikeDoc)
  } catch (err) {
    res.status(500)
    throw new Error('Internal Server Error')
  }
})

export { like, dislike }
