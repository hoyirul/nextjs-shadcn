// domain/example.list.ts
import { Example } from "./example.entity"
import { IPagination } from "@/src/shared/types/pagination"
import { IAccess } from "@/src/shared/types/access"

export interface ExampleList {
  items: Example[]
  pagination: IPagination
  access: IAccess
}
