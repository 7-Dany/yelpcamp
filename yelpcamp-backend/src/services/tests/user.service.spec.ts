import { createUser, findUser, loginUser, deleteAllUsers } from '../user.service'

describe('user service', () => {
  afterAll(async () => {
    await deleteAllUsers()
  })

  afterEach(async () => {
    await deleteAllUsers()
  })

  const userPayload = {
    firstName: 'Ali',
    lastName: 'Ahmed',
    email: 'ali@gmail.com',
    password: '123456789'
  }

  describe('create user', () => {
    it('should create the user if no email like that', async function () {
      const newUser = await createUser(userPayload)

      expect(newUser.firstName).toBe(userPayload.firstName)

      expect(newUser.lastName).toBe(userPayload.lastName)

      expect(newUser.email).toBe(userPayload.email)

      expect(newUser.password).toHaveSize(60)
    })

    it('should not create the user if email is exist already', async function () {
      await createUser(userPayload)

      await expectAsync(createUser(userPayload)).toBeRejected()
    })
  })

  describe('login user', () => {
    it('should log in the user if credentials are true', async function () {
      const user = await createUser(userPayload)

      const loggedInUser = await loginUser({
        email: user.email,
        password: userPayload.password
      })

      expect(loggedInUser).toBeTruthy()

      expect(loggedInUser?.firstName).toBe(user.firstName)

      expect(loggedInUser?.lastName).toBe(user.lastName)

      expect(loggedInUser?.email).toBe(user.email)

      expect(loggedInUser?.password).toBe(user.password)
    })

    it('should throw error when email is not exist', async function () {
      await expectAsync(
        loginUser({
          email: 'notexist@gmail.com',
          password: userPayload.password
        })
      ).toBeRejected()
    })

    it('should return null if email exist and password is wrong', async function () {
      const user = await createUser(userPayload)

      const loggedInUser = await loginUser({ email: user.email, password: 'wrong' })

      expect(loggedInUser).toBeNull()
    })
  })

  describe('find user', () => {
    it('should return the user if it exist', async function () {
      const user = await createUser(userPayload)

      const existUser = await findUser({ email: user.email })

      expect(existUser?.firstName).toBe(user.firstName)

      expect(existUser?.lastName).toBe(user.lastName)

      expect(existUser?.email).toBe(user.email)

      expect(existUser?.password).toHaveSize(60)
    })

    it('should return null if the user is not exist', async function () {
      const notExistedUser = await findUser({ email: 'notexist@gmail.com' })

      expect(notExistedUser).toBeNull()
    })
  })
})
