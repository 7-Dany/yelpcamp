import { HydratedDocument, Model, Schema } from 'mongoose'
import database from '../database'
import bcrypt from 'bcrypt'

export interface IUser {
  firstName: string
  lastName?: string
  email: string
  password: string
}

interface IUserMethods {
  fullName(): string

  comparePassword(candidatePassword: string): Promise<boolean>
}

type UserModel = Model<IUser, object, IUserMethods>

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.method('fullName', function (this: HydratedDocument<IUser>): string {
  return this.firstName + ' ' + this.lastName
})

userSchema.method(
  'comparePassword',
  async function (this: HydratedDocument<IUser>, candidatePassword: string): Promise<boolean> {
    /* Compare received password with saved password */
    return await bcrypt.compare(candidatePassword, this.password)
  }
)
userSchema.pre('save', async function (this: HydratedDocument<IUser>, next) {
  /* Hash the password if it has been modified, or it's new */
  if (!this.isModified('password')) return next()

  /* Create nes hashed password */
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(this.password, salt)

  /* Replace old password with hashed one */
  this.password = hash

  return next()
})

const User = database.model<IUser, UserModel>('User', userSchema)

export default User
