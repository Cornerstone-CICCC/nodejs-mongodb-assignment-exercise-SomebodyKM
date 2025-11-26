import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import productRouter from './routes/product.routes'

// Create server
const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/products', productRouter)
app.get('/', (req: Request, res: Response) => {
  res.status(200).send("Server is running!")
})

// Fallback / 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Invalid route!")
})

// Start server
const PORT = process.env.PORT
const CONN_STRING = process.env.DATABASE_URI

if (!PORT || !CONN_STRING) {
  throw new Error("Missing port or connectiong string!")
}

mongoose
  .connect(CONN_STRING, { dbName: "store" })
  .then(() => {
    console.log(`Connected to MongoDB!`)
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error(err)
    throw err
  })