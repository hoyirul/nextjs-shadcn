// domain/example.list.ts
import { Example } from "./example.entity"
import { Pagination } from "@/src/shared/types/pagination"
import { Access } from "@/src/shared/types/access"

export interface ExampleList {
  items: Example[]
  pagination: Pagination
  access: Access
}
