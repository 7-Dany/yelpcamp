import dotenv from 'dotenv'

dotenv.config()

const { PORT, ENV, MAIN_DATABASE, TEST_DATABASE } = process.env

export default {
  port: PORT as unknown as number,
  env: ENV as string,
  mainDatabase: MAIN_DATABASE as string,
  testDatabase: TEST_DATABASE as string
}
