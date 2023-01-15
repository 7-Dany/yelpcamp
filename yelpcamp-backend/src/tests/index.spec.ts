import app from '../index'
import supertest from 'supertest'

const request = supertest(app)

describe('Test endpoint', () => {
  it('test hello world endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})
