// src/modules/v1/example/presentations/ExampleCreate.tsx
"use client"

import { ExampleForm } from "./components/ExampleForm"
import { useRouter } from "next/navigation"

export default function CreateExamplePage() {
  const router = useRouter()

  return (
    <>
      <ExampleForm
        submitUrl="http://localhost:3001/api/v1/examples"
        method="POST"
        onSuccess={() => router.push("/v1/examples")}
      />
    </>
  )
}
