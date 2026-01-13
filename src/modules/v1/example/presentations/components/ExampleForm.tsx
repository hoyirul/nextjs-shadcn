// src/modules/v1/example/presentations/components/ExampleForm.tsx
"use client"

import { useState } from "react"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { FileInput } from "@/src/shared/partials/FileInput"
import { ExampleUseCase } from "@/src/modules/v1/example/usecases/example.usecase"
import { toast } from "sonner"

interface Props {
  data?: {
    id?: number
    name: string
    attachment?: string
  }
  onSuccess?: () => void
}

export function ExampleForm({ data, onSuccess }: Props) {
  const exampleUseCase = new ExampleUseCase()
  const [name, setName] = useState(data?.name ?? "")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const isEdit = Boolean(data?.id)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEdit && data?.id) {
        // update
        const response = await exampleUseCase.update(data.id, { name, attachment: file ?? undefined })
        toast.success(response.message || "Example updated successfully")
      } else {
        // create
        const response = await exampleUseCase.create({ name, attachment: file ?? undefined })
        toast.success(response.message || "Example created successfully")
      }

      onSuccess?.()
    } catch (err) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Example name"
          required
        />
      </div>

      {/* Attachment */}
      <FileInput data={{ attachment: data?.attachment }} onFileChange={setFile} />

      {/* Action */}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  )
}
