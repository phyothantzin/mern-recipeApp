import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import recipesRoutes from './routes/recipesRoutes.js'
import likeRoutes from './routes/likeRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()
const port = process.env.PORT || 5500

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.use('/api/users', userRoutes)
app.use('/api/recipes', recipesRoutes)
app.use('/api/like', likeRoutes)
app.get('/', (req, res) => res.status(200).send('Server running'))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server Running: ${port}`))
