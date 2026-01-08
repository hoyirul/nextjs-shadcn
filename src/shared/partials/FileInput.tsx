import { useState, useEffect, useRef } from "react"
import { Label } from "components/ui/label"
import { Input } from "components/ui/input"

interface FileInputProps {
  data?: { attachment?: string }
  onFileChange?: (file: File | null) => void
}

export function FileInput({ data, onFileChange }: FileInputProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(data?.attachment ?? null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!file) {
      setPreview(data?.attachment ?? null)
      onFileChange?.(null)
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    onFileChange?.(file)

    return () => URL.revokeObjectURL(objectUrl)
  }, [file, data, onFileChange])

  const isImage = (preview: string, file?: File) => {
    if (file) return file.type.startsWith("image/")
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(preview)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="attachment">Attachment</Label>
      <Input
        ref={inputRef}
        id="attachment"
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      {preview && (
        <div className="border rounded-lg p-4 bg-slate-50 flex flex-col items-center gap-2 relative">
          {isImage(preview, file!) ? (
            <img
              src={
                file
                  ? preview
                  : preview?.startsWith("http")
                  ? preview
                  : `${process.env.NEXT_PUBLIC_API_URL}${preview}`
              }
              alt="Attachment preview"
              className="max-h-48 w-auto rounded-md object-contain"
            />
          ) : (
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-medium">
                {file ? file.name : data?.attachment?.split("/").pop()}
              </span>
            </div>
          )}

          <button
            type="button"
            className="absolute top-1 right-1 text-red-500 hover:text-red-700"
            onClick={() => {
              setFile(null)
              if (inputRef.current) inputRef.current.value = ""
            }}
          >
            ✕
          </button>

          <p className="text-xs text-gray-500">
            Leave empty to keep existing file
          </p>
        </div>
      )}
    </div>
  )
}
