import { Router } from 'express'
import {
  getAllCampgrounds,
  getCampground,
  createCampground,
  updateCampground,
  deleteCampground
} from '../../controllers/campground.controller'

const campgroundRoute = Router()

campgroundRoute.route('/campgrounds').get(getAllCampgrounds).post(createCampground)
campgroundRoute
  .route('/campgrounds/:id')
  .get(getCampground)
  .put(updateCampground)
  .delete(deleteCampground)

export default campgroundRoute
