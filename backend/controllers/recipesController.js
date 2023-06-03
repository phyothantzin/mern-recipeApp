import Recipes from '../models/recipesModel.js'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import fs from 'fs'

//@desc Fetch recipes
//route GET api/recipes/
const fetchRecipes = asyncHandler(async (req, res) => {
  try {
    const recipes = await Recipes.find({})
    res.status(200).json(recipes)
  } catch (err) {
    res.status(500)
    throw new Error('Internal Server Error: Recipes not found')
  }
})

//@desc Fetch recipes for specific user
//route POST api/recipes
const fetchUserRecipes = asyncHandler(async (req, res) => {
  const { userId } = req.body
  try {
    const recipes = await Recipes.find({ owner: userId })
    res.status(200).json(recipes)
  } catch (err) {
    res.status(500)
    throw new Error('Internal Server Error: Recipes not found')
  }
})

//@desc Create recipes
//route POST api/recipes/create
const createRecipes = asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipes.create({ ...req.body })
    res.json(recipe)
  } catch (err) {
    res.status(401)
    throw new Error('Invalid data. Please try again')
  }
})

//@desc Delete recipes
//route Delete api/recipes/delete
const deleteRecipes = asyncHandler(async (req, res) => {
  const { recipeId, userId } = req.body

  try {
    await Recipes.deleteOne({ _id: recipeId, owner: userId })
    res.status(201)
  } catch (err) {
    res.status(401)
    throw new Error('Invalid data. Please try again')
  }
})

//@desc Update savedRecipes field
//route PUT api/recipes/create
const saveRecipes = asyncHandler(async (req, res) => {
  const { recipeId, userId } = req.body
  const recipe = await Recipes.findById(recipeId)
  const user = await User.findById(userId)

  try {
    user.savedRecipes.push(recipe)
    await user.save()
    res.status(201).json({
      savedRecipes: user.savedRecipes,
    })
  } catch (err) {
    res.status(500)
    throw new Error('Internal Server Error')
  }
})

//@desc Update savedRecipes field
//route POST api/recipes/create
const unsaveRecipes = asyncHandler(async (req, res) => {
  const { recipeId, userId } = req.body
  const recipe = await Recipes.findById(recipeId)
  const user = await User.findById(userId)
  try {
    user.savedRecipes.pull(recipe._id)
    await user.save()
    res.status(201)
    // await user.update({}, { $pull: { savedRecipes: { $in: [`${recipeId}`] } } })
  } catch (err) {
    res.status(500)
    throw new Error('Internal Server Error')
  }
})

export {
  fetchRecipes,
  fetchUserRecipes,
  createRecipes,
  deleteRecipes,
  saveRecipes,
  unsaveRecipes,
}
