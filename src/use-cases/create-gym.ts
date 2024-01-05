import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface crateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface crateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: crateGymUseCaseRequest): Promise<crateGymUseCaseResponse> {
    const user = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym: user,
    }
  }
}
