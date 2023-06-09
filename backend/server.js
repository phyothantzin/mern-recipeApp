import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import recipesRoutes from './routes/recipesRoutes.js'
import likeRoutes from './routes/likeRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import multer from 'multer'
import { fileURLToPath } from 'url'
import { upload } from './middleware/imageMiddleware.js'

dotenv.config()
connectDB()
const port = process.env.PORT || 5500

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use('/api/users', userRoutes)
app.use('/api/recipes', recipesRoutes)
app.use('/api/like', likeRoutes)

const __dirname = path.resolve()
app.use('/images', express.static(path.join(__dirname, '/images')))

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images/')
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name)
//   },
// })

// const upload = multer({ storage: storage })

// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve()
//   app.use(express.static(path.join(__dirname, 'frontend/dist')))

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')),
//   )
// } else {
//   app.get('/', (req, res) => res.status(200).send('Server running'))
// }

app.get('/', (req, res) => res.status(200).send('Server running'))

app.post('/api/upload', upload.single('file'), (req, res) =>
  res.status(200).json('image uploaded'),
)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
  console.log(`Server Running: ${port} on ${process.env.NODE_ENV} mode`),
)
