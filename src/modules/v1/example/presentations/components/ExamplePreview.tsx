// src/modules/v1/example/presentations/components/ExamplePreview.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { ExampleUseCase } from "@/src/modules/v1/example/usecases/example.usecase"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


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
  state: "DONE" | "CURRENT" | "CANCELED" | "REJECTED" | "REVISED" | "APPROVED"
  status_from: {
    code: string
    label: string
  }
  status_to: {
    code: string
    label: string
  }
  actioned_at: string | null
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
  isImage: (url?: string) => boolean,
  onUpdated?: () => void
}

export const ExamplePreview: React.FC<ExamplePreviewProps> = ({
  item,
  isImage,
  onUpdated,
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)

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

  const approvalAction = async (actionCode: string) => {
    if (!item?.id) return

    setLoading(true)
    try {
      // Simulate approval action API call
      await exampleUseCase.approvalAction(item.id, actionCode)

      toast.success(`Action '${actionCode}' performed successfully.`)
      // Refresh data after action
      await fetchDataById(item.id)
      onUpdated?.()
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to perform action.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!item?.id) return
    fetchDataById(item.id)
  }, [item?.id])

  if (loading || !data) return <div>Loading...</div>

  const currentStep = data.approval?.lines?.find(
    (l: ApprovalLine) => l.state === "CURRENT"
  )?.step

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

      {/* 📝 Approval Timeline */}
      <div className="mt-4 -mb-4">
        <h2 className="text-lg font-semibold mb-3">Progress Aproval</h2>

        <Card className="shadow-sm">

          <CardContent>
            <div className="relative pl-6">

              {/* backbone garis panjang */}
              <div className="absolute left-2 top-0 h-full w-[2px] bg-gray-300" />

              <Accordion 
                type="single" 
                defaultValue={currentStep ? `step-${currentStep}` : undefined}
                collapsible>

                {data.approval?.lines?.map((line: ApprovalLine) => (
                  <AccordionItem key={line.step} value={`step-${line.step}`}>

                    <AccordionTrigger className="cursor-pointer">

                      <div className="flex items-center gap-3 relative">

                        {/* DOT */}
                        <span
                          className={cn(
                            "absolute -left-[22px] h-4 w-4 rounded-full border-2",
                            line.state === "DONE"
                              ? "bg-green-500 border-green-600"
                              : line.state === "CURRENT"
                              ? "bg-blue-500 border-blue-600"
                              : line.state === "CANCELED"
                              ? "bg-rose-500 border-rose-600"
                              : line.state === "REJECTED"
                              ? "bg-red-500 border-red-600"
                              : line.state === "REVISED"
                              ? "bg-yellow-500 border-yellow-600"
                              : "bg-gray-300 border-gray-400"

                          )}
                        ></span>

                        <div>
                          <p className="font-semibold">
                            Step {line.step} — {line.approver.name}
                          </p>

                          <Badge
                            className={cn(
                              "mt-2 lowercase font-semibold",
                              line.state === "DONE" && "bg-green-100 text-green-600",
                              line.state === "CURRENT" && "bg-blue-100 text-blue-600",
                              line.state === "CANCELED" && "bg-rose-100 text-rose-600",
                              line.state === "REJECTED" && "bg-red-100 text-red-600",
                              line.state === "REVISED" && "bg-yellow-100 text-yellow-600"
                            )}
                          >
                            {line.state === "DONE" ? line.status_to.label : line.state }
                          </Badge>
                        </div>
                      </div>

                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="mb-4 text-sm text-slate-700">
                        <p>
                          {line.approver.position.name} — {line.approver.department.name} / {line.approver.division.name}
                        </p>

                        {line.actioned_at && (
                          <p className="text-xs text-gray-500 mt-1">
                            {line.status_to.label} at {line.actioned_at}
                          </p>
                        )}
                      </div>

                      {line.state === "CURRENT" && (
                        <div className="flex gap-2 flex-wrap">

                          {line.allowed_actions?.map((action) => (
                            <AlertDialog key={action.code}>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="cursor-pointer"
                                >
                                  {action.label}
                                </Button>
                              </AlertDialogTrigger>

                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Yakin mau {action.label}?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tindakan ini tidak bisa dibatalkan.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => approvalAction(action.code)}
                                  >
                                    Lanjut
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ))}

                          {line.next_action && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="default"
                                  size="sm"
                                  className="cursor-pointer"
                                >
                                  {line.next_action.label}
                                </Button>
                              </AlertDialogTrigger>

                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Yakin mau {line.next_action.label}?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Pastikan keputusanmu sudah benar ya bro.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => approvalAction(line.next_action!.code)}
                                  >
                                    Lanjut
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}

                        </div>
                      )}
                    </AccordionContent>

                  </AccordionItem>
                ))}

              </Accordion>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

