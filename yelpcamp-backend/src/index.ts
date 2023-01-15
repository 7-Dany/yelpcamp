import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import config from './config'
import routes from './routes'
import { errorMiddleware } from './middlewares/error.middleware'

const app: Application = express()
const PORT = config.port || 4000
const corsConfig: cors.CorsOptions = {
  origin: 'http://localhost:3000'
}
app.use(express.json())
app.use(cors(corsConfig))
app.use('/', routes)

app.get('/', async (request: Request, response: Response) => {
  response.json({
    message: 'Hello World'
  })
})

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

export default app
