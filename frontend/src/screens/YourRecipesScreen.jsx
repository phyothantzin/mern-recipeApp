import { Button, Card, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useFetchUserRecipesMutation } from '../slices/recipesApiSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Recipe from '../components/Recipe'
import { useEffect, useState } from 'react'

const YourRecipesScreen = () => {
  const [userRecipes, setUserRecipes] = useState([])

  const navigate = useNavigate()

  const [fetchUserRecipes, { isLoading }] = useFetchUserRecipesMutation()

  const { userInfo } = useSelector((state) => state.auth)
  const userId = userInfo?._id

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetchUserRecipes({ userId })
        setUserRecipes(res.data)
      } catch (err) {
        console.error(err?.data?.message || err.error)
      }
    }

    fetchRecipes()
  }, [userRecipes])

  return (
    <div className="py-5">
      <h1 className="text-center mb-4">Your Recipes</h1>
      {/* {userInfo && isLoading ? <Loader /> : ''} */}
      <Container className="d-md-flex justify-content-center flex-wrap">
        {userRecipes?.map((recipe) => (
          <Recipe
            key={recipe._id}
            recipe={recipe}
            userId={userId}
            showDelete={true}
          />
        ))}
      </Container>
    </div>
  )
}

export default YourRecipesScreen
