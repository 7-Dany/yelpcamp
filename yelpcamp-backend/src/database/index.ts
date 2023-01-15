import { Connection, createConnection } from 'mongoose'
import config from '../config'

let database: Connection
if (config.env === 'test') {
  database = createConnection(config.testDatabase)
} else {
  database = createConnection(config.mainDatabase)
}

export default database
