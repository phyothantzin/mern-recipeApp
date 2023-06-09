import { Button, Card, Dropdown, DropdownButton, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {
  useSaveRecipesMutation,
  useUnsaveRecipesMutation,
  useDeleteRecipesMutation,
} from '../slices/recipesApiSlice.js'
import { useEffect, useState } from 'react'
import {
  useLikeRecipeMutation,
  useDislikeRecipeMutation,
} from '../slices/likeApiSlice.js'
import axios from 'axios'
import { FaTimes, FaTrashAlt } from 'react-icons/fa'

const Recipe = ({
  recipe,
  userId,
  showSave,
  isRecipeSaved,
  showLike,
  showUnsave,
  showDelete,
}) => {
  const PF = 'http://localhost:5000/images/'
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [likes, setLikes] = useState([])
  const { name, image, instruction, ingredients, duration, owner } = recipe
  let recipeId = recipe._id

  const navigate = useNavigate()

  const [saveRecipes, { loading }] = useSaveRecipesMutation()
  const [unsaveRecipes] = useUnsaveRecipesMutation()
  const [deleteRecipes] = useDeleteRecipesMutation()
  const [likeRecipe] = useLikeRecipeMutation()
  const [dislikeRecipe] = useDislikeRecipeMutation()

  const fetchLikesList = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/like/amount/${recipeId}`,
      )
      setLikes(
        res?.data?.map((doc) => ({ userId: doc?.userId, likeId: doc?._id })),
      )
    } catch (err) {
      console.error(err)
    }
  }

  const saveRecipe = async (recipeId) => {
    try {
      await saveRecipes({ recipeId, userId })
      navigate('/recipes/saved')
    } catch (err) {
      console.error(err?.data?.message || err.error)
    }
  }

  const unsaveRecipe = async (recipeId) => {
    try {
      await unsaveRecipes({ recipeId, userId })
      handleClose()
    } catch (err) {
      console.error(err?.data?.message || err.error)
    }
  }

  const deleteRecipe = async (recipeId) => {
    try {
      await deleteRecipes({ recipeId, userId })
      handleClose()
      // navigate(0)
    } catch (err) {
      console.error(err?.data?.message || err.error)
    }
  }

  const handleLike = async (userId, recipeId) => {
    try {
      const res = await likeRecipe({ userId, recipeId })
      const newDocId = res.data._id
      if (userId) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId, likeId: newDocId }]
            : [{ userId, likeId: newDocId }],
        )
      }
    } catch (err) {
      console.error(err?.data?.message || err.error)
    }
  }

  const handleDislike = async (userId, recipeId) => {
    try {
      const res = await dislikeRecipe({ userId, recipeId })
      if (userId) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== res.data._id),
        )
      }
    } catch (err) {
      console.error(err?.data?.message || err.error)
    }
  }

  const userLiked = likes?.find((like) => like.userId === userId)

  useEffect(() => {
    fetchLikesList()
  }, [setLikes])

  return (
    <Card className="p-4 d-flex flex-column justify-content-center hero-card w-75 mx-md-2 m-auto my-2">
      <div className="d-flex flex-row align-items-center justify-content-between mb-1">
        <h2 className="">{name}</h2>
        {showSave && userId !== owner ? (
          <div className="d-flex justify-content-center align-items-center mb-1">
            <button
              onClick={() => saveRecipe(recipeId)}
              className="btn btn-outline-secondary btn-sm d-inline flex-end h-1"
              disabled={isRecipeSaved}
            >
              {isRecipeSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        ) : (
          ''
        )}
        {showUnsave && userId !== owner ? (
          <div className="d-flex justify-content-center align-items-center mb-1">
            <button
              // onClick={() => unsaveRecipe(recipeId)}
              onClick={handleShow}
              className="btn btn-outline-secondary btn-sm d-inline flex-end h-1"
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          ''
        )}
        {showDelete && userId === owner ? (
          <div className="d-flex justify-content-center align-items-center mb-2">
            <button
              onClick={handleShow}
              className="btn btn-outline-secondary btn-sm d-inline flex-end h-1"
            >
              <FaTrashAlt />
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <h4>
            Are you sure to {showDelete ? 'delete' : 'unsave'} this recipe?
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>No</Button>
          <Button
            variant="danger"
            onClick={() => {
              if (showDelete) {
                deleteRecipe(recipeId)
              } else {
                unsaveRecipe(recipeId)
              }
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <img
        onDoubleClick={() => {
          if (showLike && userId !== owner) {
            userLiked
              ? handleDislike(userId, recipeId)
              : handleLike(userId, recipeId)
          } else {
            return
          }
        }}
        className="image-fluid mb-2"
        style={{ cursor: 'pointer' }}
        // src={image}
        src={PF + recipe.image}
        alt=""
      />

      <DropdownButton
        id="dropdown-basic-button"
        title="Instruction"
        size="md"
        variant="secondary"
        className="mb-2"
      >
        <Dropdown.Item>{instruction}</Dropdown.Item>
      </DropdownButton>

      <h5>Ingredients</h5>
      <p>{ingredients}</p>

      <h5>Duration</h5>
      <p>{duration}</p>

      <p>Likes: {likes.length}</p>

      {showLike && userId !== owner ? (
        <button
          className="btn btn-sm btn-success p-1"
          onClick={() => {
            userLiked
              ? handleDislike(userId, recipeId)
              : handleLike(userId, recipeId)
          }}
        >
          {userLiked ? 'Dislike' : 'Like'}
        </button>
      ) : (
        ''
      )}
    </Card>
  )
}

export default Recipe
