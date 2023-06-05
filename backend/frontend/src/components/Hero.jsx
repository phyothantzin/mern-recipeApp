import { Button, Card, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useFetchRecipesMutation } from '../slices/recipesApiSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Recipe from './Recipe'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Hero = () => {
  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [fetchRecipes, { isLoading }] = useFetchRecipesMutation()

  const { userInfo } = useSelector((state) => state.auth)
  const userId = userInfo?._id

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      const fetchRecipesList = async () => {
        try {
          const res = await fetchRecipes()
          setRecipes(res.data)
        } catch (err) {
          console.error(err?.data?.message || err.error)
        }
      }

      const fetchSavedRecipes = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/recipes/savedRecipes/ids/${userId}`,
          )
          setSavedRecipes(res.data.savedRecipes)
        } catch (err) {
          console.error(err)
        }
      }

      fetchRecipesList()
      fetchSavedRecipes()
    }
  }, [])

  function isRecipeSaved(id) {
    return savedRecipes.includes(id)
  }

  return (
    <div className="py-5">
      <h1 className="text-center mb-4">Recipes</h1>
      {userInfo && isLoading ? <Loader /> : ''}
      <Container className="d-md-flex justify-content-center flex-wrap">
        {recipes?.map((recipe) =>
          recipe ? (
            <Recipe
              key={recipe._id}
              recipe={recipe}
              userId={userId}
              showSave={true}
              isRecipeSaved={isRecipeSaved(recipe._id)}
              showLike={true}
            />
          ) : (
            ''
          ),
        )}
      </Container>
    </div>
  )
}

export default Hero
