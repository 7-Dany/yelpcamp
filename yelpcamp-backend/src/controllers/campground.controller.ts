import { Request, Response, NextFunction } from 'express'
import CampgroundService from '../services/campground.service'
import { seeds } from '../Seeds'

const campgroundService = new CampgroundService()

export const getAllCampgrounds = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const campgrounds = await campgroundService.index()
    response.status(200).json({
      status: 'ok',
      body: campgrounds,
      message: 'Campgrounds got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getCampground = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = request.params.id
    const campground = await campgroundService.showById(id)
    if (!campground) {
      response.status(422).json({
        status: 'ok',
        message: 'no campground for that id'
      })
      return
    }
    response.status(200).json({
      status: 'ok',
      body: campground,
      message: 'campground got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const createCampground = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, location, description, price } = request.body
    const campground = await campgroundService.create({ title, location, description, price })
    response.status(201).json({
      status: 'ok',
      body: campground,
      message: 'campground got created successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const updateCampground = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = request.params.id
    const { title, price, location, description } = request.body
    const updatedCampground = await campgroundService.update(id, {
      title,
      price,
      location,
      description
    })

    response.status(202).json({
      status: 'ok',
      body: updatedCampground,
      message: 'campground got updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const deleteCampground = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = request.params.id
    await campgroundService.delete(id)
    response.status(202).json({
      status: 'ok',
      message: 'campground got deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
