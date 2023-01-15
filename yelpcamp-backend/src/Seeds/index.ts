import { cities, places, descriptors } from './FakeData'
import CampgroundService from '../services/campground.service'

function sample(array: string[]) {
  return array[Math.floor(Math.random() * array.length)]
}

export async function seeds() {
  const campground = new CampgroundService()
  await campground.deleteAll()
  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * 1000)
    await campground.create({
      location: `${cities[random].state}, ${cities[random].city}`,
      title: `${sample(places)} ${sample(descriptors)}`,
      price: '0',
      description: 'No description yet'
    })
  }
}
