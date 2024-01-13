import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-reposiotry'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}
interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByuserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
