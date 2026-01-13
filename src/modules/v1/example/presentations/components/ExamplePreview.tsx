// src/modules/v1/example/presentations/components/ExamplePreview.tsx
"use client"

import React, { useEffect, useState } from "react"
import { ExampleUseCase } from "@/src/modules/v1/example/usecases/example.usecase"
import { toast } from "sonner"

interface ApprovalAction {
  code: string
  label: string
}

interface ApprovalLine {
  step: number
  approver: {
    name: string
    division: { name: string }
    department: { name: string }
    position: { name: string }
  }
  state: "DONE" | "CURRENT" | string
  approved_at: string | null
  next_action?: ApprovalAction
  allowed_actions: ApprovalAction[]
}

interface ExamplePreviewProps {
  item: {
    id: number
    name: string
    attachment?: string
    approval?: {
      lines: ApprovalLine[]
    }
  }
  isImage: (url?: string) => boolean
}

export const ExamplePreview: React.FC<ExamplePreviewProps> = ({
  item,
  isImage,
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [collapsed, setCollapsed] = useState(true)

  if (!item) return null

  const exampleUseCase = new ExampleUseCase()

  const fetchDataById = async (id: number) => {
    setLoading(true)
    try {
      const res = await exampleUseCase.getById(id)
      setData(res)
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to fetch data.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!item?.id) return
    fetchDataById(item.id)
  }, [item?.id])

  if (loading || !data) return <div>Loading...</div>

  const currentLine = data.approval?.lines?.find((line: ApprovalLine) => line.state === "CURRENT")

  if (!currentLine) return null

  return (
    <div className="space-y-6">
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

      {/* 📝 Approval Line (CURRENT only) */}
      <div className="space-y-4 mt-4">
        <h2 className="text-lg font-semibold">Current Approval</h2>

        <div className="rounded-lg border p-4 bg-white shadow-sm">
          {/* Header */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <p className="font-medium">
              Step {currentLine.step} - {currentLine.state}
            </p>
            <span className="text-sm text-gray-500">
              {collapsed ? "+" : "-"}
            </span>
          </div>

          {/* Collapsible Content */}
          {!collapsed && (
            <>
              <div className="text-sm text-slate-700 mt-2 mb-2">
                <p>Approver: {currentLine.approver.name}</p>
                <p>
                  {currentLine.approver.position.name} - {currentLine.approver.department.name} /{" "}
                  {currentLine.approver.division.name}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap mt-2">
                {currentLine.allowed_actions.map((action: { code: string; label: string }) => (
                  <button
                    key={action.code}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm hover:bg-blue-200"
                  >
                    {action.label}
                  </button>
                ))}
                {currentLine.next_action && (
                  <button className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm hover:bg-green-200">
                    {currentLine.next_action.label}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

