import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { useCreateRecipesMutation } from '../slices/recipesApiSlice'

const CreateRecipesScreen = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [instruction, setInstruction] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [duration, setDuration] = useState(0)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [createRecipes, { isLoading }] = useCreateRecipesMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  function convertToBase64(e) {
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => setImage(reader.result)
    reader.onerror = (err) => toast.error(err)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (name === '') toast.error('Recipe name cannot be empty')
    if (image == '') {
      confirm('Are you sure, you do not want to add an image?')
    }
    if (instruction === '') toast.error('Instruction cannot be empty')
    if (ingredients === '') toast.error('Recipe ingredients cannot be empty')
    if (duration === 0) toast.error('Duration cannot be 0')

    try {
      const res = await createRecipes({
        name,
        image,
        instruction,
        ingredients,
        duration,
        owner: userInfo._id,
      })
      navigate('/')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <FormContainer>
      <h1>Create A Recipe</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Recipe Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={(e) => convertToBase64(e)} />
          {image === '' || image === null ? (
            ''
          ) : (
            <img className="mt-3 image-fluid w-100" src={image} />
          )}
        </Form.Group>
        {/* <Form.Group className="my-2" controlId="email">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="image"
            placeholder="Enter image url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
        </Form.Group> */}
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Instruction</Form.Label>
          <Form.Control
            type="instruction"
            as="textarea"
            row={3}
            placeholder="Enter instruction"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            type="ingredients"
            as="textarea"
            row={3}
            placeholder="Enter require ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="duration"
            as="textarea"
            row={3}
            placeholder="Enter duration to cook"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          {isLoading ? <Loader /> : 'Create Recipe'}
        </Button>
      </Form>
    </FormContainer>
  )
}

export default CreateRecipesScreen
