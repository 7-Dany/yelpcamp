import { FilterQuery, HydratedDocument, QueryOptions } from 'mongoose'
import User, { IUser } from '../models/user.model'

type TLoginUser = {
  email: HydratedDocument<IUser>['email']
  password: HydratedDocument<IUser>['password']
}

export async function createUser(user: IUser) {
  return User.create<IUser>(user)
}

export async function findUser(
  query: FilterQuery<HydratedDocument<IUser>>,
  options: QueryOptions = { lean: true }
) {
  return User.findOne(query, null, options).exec()
}

export async function loginUser({
  email,
  password
}: TLoginUser): Promise<HydratedDocument<IUser> | null> {
  const user = await findUser({ email }, { lean: false })

  if (!user) {
    throw new Error('User does not exist')
  }

  const isAuthenticate = await user.comparePassword(password)

  if (!isAuthenticate) return null

  return user
}

export async function deleteAllUsers() {
  return User.deleteMany({})
}
