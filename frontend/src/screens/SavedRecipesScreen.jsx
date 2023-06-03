import { Button, Card, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Recipe from '../components/Recipe'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const SavedRecipesScreen = () => {
  const [savedRecipes, setSavedRecipes] = useState([])

  const { userInfo } = useSelector((state) => state.auth)
  const userId = userInfo._id

  useEffect(() => {
    const fetchRecipesList = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/recipes/savedRecipes/${userId}`,
        )
        setSavedRecipes(res.data.savedRecipes)
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
    fetchRecipesList()
  }, [savedRecipes])

  return (
    <div className="py-5">
      <h1 className="text-center mb-4">Saved Recipes</h1>
      <Container className="d-md-flex justify-content-center flex-wrap">
        {savedRecipes.map((recipe) => (
          <Recipe
            key={recipe._id}
            recipe={recipe}
            userId={userInfo._id}
            showSave={false}
            showLike={false}
            showUnsave={true}
          />
        ))}
      </Container>
    </div>
  )
}

export default SavedRecipesScreen
