import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase // sut => system under test

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository) // sut => system under test

    await gymsRepository.create({
      id: 'gym-01',
      description: '',
      latitude: -22.7803136,
      longitude: -47.7069312,
      phone: '',
      title: 'Javascript Gym',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.7803136,
      userLongitude: -47.7069312,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    const date = new Date(2024, 0, 20, 8, 0, 0)
    vi.setSystemTime(date)

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.7803136,
      userLongitude: -47.7069312,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.7803136,
        userLongitude: -47.7069312,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in on different days', async () => {
    const date = new Date(2024, 0, 20, 8, 0, 0)
    vi.setSystemTime(date)

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.7803136,
      userLongitude: -47.7069312,
    })

    const secondDate = new Date(2024, 0, 21, 8, 0, 0)
    vi.setSystemTime(secondDate)

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.7803136,
      userLongitude: -47.7069312,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in at a distant gym', async () => {
    gymsRepository.gyms.push({
      id: 'gym-02',
      description: '',
      latitude: new Decimal(-22.7285643),
      longitude: new Decimal(-47.65174),
      phone: '',
      title: 'Javascript Gym',
    })

    console.log('Distant')

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -22.7455238,
        userLongitude: -47.6808407,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })

  it('should be able to check in at a close gym', async () => {
    gymsRepository.gyms.push({
      id: 'gym-02',
      description: '',
      latitude: new Decimal(-22.7455471),
      longitude: new Decimal(-47.6808417),
      phone: '',
      title: 'Javascript Gym',
    })

    console.log('close')

    const { checkIn } = await sut.execute({
      gymId: 'gym-02',
      userId: 'user-01',
      userLatitude: -22.7456785,
      userLongitude: -47.6807662,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
