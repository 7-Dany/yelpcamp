import Campground, { ICampground } from '../models/campground.model'
import { HydratedDocument } from 'mongoose'

export default class CampgroundService {
  async index(): Promise<HydratedDocument<ICampground>[]> {
    try {
      return await Campground.find({}).exec()
    } catch (error) {
      throw new Error(`Unable to show all campgrounds, ${(error as Error).message}`)
    }
  }

  async showById(id: string): Promise<HydratedDocument<ICampground> | null> {
    try {
      return await Campground.findById(id).exec()
    } catch (error) {
      throw new Error(`Unable show campground by id, ${(error as Error).message}`)
    }
  }

  async create(campground: ICampground): Promise<HydratedDocument<ICampground>> {
    try {
      return await Campground.create(campground)
    } catch (error) {
      throw new Error(`Unable to creat new campground, ${(error as Error).message}`)
    }
  }

  async update(id: string, campground: ICampground): Promise<HydratedDocument<ICampground> | null> {
    try {
      return await Campground.findByIdAndUpdate(id, campground, { new: true })
    } catch (error) {
      throw new Error(`Unable to update campground, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<HydratedDocument<ICampground> | null> {
    try {
      return await Campground.findByIdAndDelete(id)
    } catch (error) {
      throw new Error(`Unable to delete campground, ${(error as Error).message}`)
    }
  }

  async deleteAll() {
    try {
      return await Campground.deleteMany({})
    } catch (error) {
      throw new Error(`Unable to delete all campgrounds`)
    }
  }
}
