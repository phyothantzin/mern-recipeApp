import mongoose from 'mongoose'

const recipesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  instruction: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
})

const Recipes = mongoose.model('Recipes', recipesSchema)

export default Recipes
