// usecases/get-examples.ts
import { exampleRepository } from "@/src/modules/v1/example/repositories/example.repository"

export const getExamplesUsecase = (
  page = 1,
  perPage = 10
) => {
  return exampleRepository.getAll(page, perPage)
}

