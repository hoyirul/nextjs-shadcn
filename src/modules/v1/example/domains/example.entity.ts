// domain/example.entity.ts

interface Status {
  id: number
  code: string
  label: string
} 
export interface Example {
  id: number
  name: string
  attachment: string
  status: Status
  createdAt: string
  updatedAt: string
}
