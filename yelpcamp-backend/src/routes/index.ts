import { Router } from 'express'
import campgroundRoute from './api/campground.route'

const routes = Router()

routes.use('/api', campgroundRoute)

export default routes
