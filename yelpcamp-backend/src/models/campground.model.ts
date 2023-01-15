import { Schema, Model } from 'mongoose'
import database from '../database'

export interface ICampground {
  title: string
  price: string
  description: string
  location: string
}

interface ICampgroundMethods {
  s: string
}

type CampgroundModel = Model<ICampground, object, ICampground>

const campgroundSchema = new Schema<ICampground, ICampgroundMethods, CampgroundModel>({
  title: { type: String },
  price: { type: String },
  description: { type: String },
  location: { type: String }
})

const Campground = database.model<ICampground, CampgroundModel>('Campground', campgroundSchema)

export default Campground
