// src/modules/v1/example/presentations/components/ExampleForm.tsx
"use client"

import { useState } from "react"
import axios from "axios"

import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "components/ui/card"

interface Props {
  initialData?: {
    name: string
    attachment?: string
  }
  submitUrl: string
  method?: "POST" | "PATCH"
  onSuccess?: () => void
}

export function ExampleForm({
  initialData,
  submitUrl,
  method = "POST",
  onSuccess,
}: Props) {
  const [name, setName] = useState(initialData?.name ?? "")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append("name", name)
    if (file) formData.append("attachment", file)

    try {
      await axios({
        method,
        url: submitUrl,
        data: formData,
        headers: {
          "Accept-Language": "id",
        },
      })

      onSuccess?.()
    } catch (err) {
      console.error(err)
      alert("Gagal menyimpan data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
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
        <div className="space-y-2">
          <Label htmlFor="attachment">Attachment</Label>
          <Input
            id="attachment"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />

          {initialData?.attachment && (
            <p className="text-xs text-muted-foreground">
              Leave empty to keep existing file
            </p>
          )}
        </div>

        {/* Action */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>

      </form>
    </>
  )
}
