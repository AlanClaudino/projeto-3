import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let userRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase // sut => system under test

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(userRepository) // sut => system under test
  })

  it('should be able to retrieve user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      id: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to retrieve user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        id: 'invalid id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
