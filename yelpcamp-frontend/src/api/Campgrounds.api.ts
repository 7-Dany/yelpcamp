import axios from 'axios'
import { ICampground } from '../Types'

export class CampgroundsApi {
  async index(): Promise<ICampground[]> {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    const response = await axios.get('http://localhost:4000/api/campgrounds', config)
    return response.data.body
  }

  async showById(id: string): Promise<ICampground> {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    const response = await axios.get(`http://localhost:4000/api/campgrounds/${id}`, config)
    return response.data.body
  }

  async create(data: ICampground): Promise<ICampground> {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    const response = await axios.post('http://localhost:4000/api/campgrounds', data, config)
    return response.data.body
  }

  async update(id: string, data: ICampground): Promise<ICampground> {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    const response = await axios.put(`http://localhost:4000/api/campgrounds/${id}`, data, config)
    return response.data.body
  }

  async delete(id: string): Promise<ICampground> {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    const response = await axios.delete(`http://localhost:4000/api/campgrounds/${id}`, config)
    return response.data
  }
}
