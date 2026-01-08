// src/modules/v1/example/presentations/components/ExamplePreview.tsx
"use client"

import React from "react"

interface ExamplePreviewProps {
  item: {
    name: string
    attachment?: string
  }
  isImage: (url?: string) => boolean
}

export const ExamplePreview: React.FC<ExamplePreviewProps> = ({ item, isImage }) => {
  if (!item) return null

  return (
    <div className="space-y-4">
      {/* 🖼 Attachment Preview */}
      <div className="rounded-lg border bg-slate-50 p-4">
        {isImage(item.attachment) ? (
          <img
            src={item.attachment}
            alt={item.name}
            className="max-h-[320px] mx-auto rounded-md object-contain"
          />
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Attachment File</span>
            <a
              href={item.attachment}
              target="_blank"
              className="text-[#4db1d4] font-medium underline"
            >
              View File
            </a>
          </div>
        )}
      </div>

      {/* 📄 Metadata */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-500">Name</p>
          <p className="font-medium text-slate-900">{item.name}</p>
        </div>
        <div>
          <p className="text-slate-500">Attachment</p>
          <a
            href={item.attachment}
            target="_blank"
            className="text-[#4db1d4] font-medium hover:underline"
          >
            Open file
          </a>
        </div>
      </div>
    </div>
  )
}
