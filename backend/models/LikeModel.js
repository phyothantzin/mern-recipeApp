import mongoose from 'mongoose'

const likeSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipes',
  },
})

const Likes = mongoose.model('Likes', likeSchema)

export default Likes
