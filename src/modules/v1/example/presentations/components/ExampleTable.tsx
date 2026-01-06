// src/modules/v1/example/presentations/components/ExampleTable.tsx
"use client"

import { useState } from "react"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
// import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "components/ui/card"
import { ExampleForm } from "./ExampleForm"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "components/ui/dialog"
import { Search, Plus, Pencil, Trash2, Eye } from "lucide-react"
import { getExamplesUsecase } from "@/src/modules/v1/example/usecases/example.usecase"
import { Example } from "@/src/modules/v1/example/domains/example.entity"

interface Pagination {
  currentPage: number
  perPage: number
  totalPages: number
  total: number
}

interface ExampleTableProps {
  initialItems: Example[]
  initialPagination: Pagination
  access: {
    view: boolean
    show: boolean
    create: boolean
    update: boolean
    delete: boolean
  }
}

export function ExampleTable({
  initialItems,
  initialPagination,
  access,
}: ExampleTableProps) {
  const [items, setItems] = useState<Example[]>(initialItems)
  const [pagination, setPagination] = useState<Pagination>(initialPagination)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeModal, setActiveModal] = useState<
    "create" | "edit" | "show" | "delete" | null
  >(null)

  const [selectedItem, setSelectedItem] = useState<Example | null>(null)

  const fetchData = async (page = 1, perPage = pagination.perPage) => {
    setLoading(true)
    const res = await getExamplesUsecase(page, perPage)

    setItems(res.items)
    setPagination({
      currentPage: res.pagination.current_page,
      perPage: res.pagination.per_page,
      totalPages: res.pagination.total_pages,
      total: res.pagination.total,
    })
    setLoading(false)
  }

  const onPageChange = (page: number) => {
    if (page !== pagination.currentPage) {
      fetchData(page, pagination.perPage)
    }
  }

  const onPerPageChange = (perPage: number) => {
    fetchData(1, perPage)
  }

  const isImage = (url?: string) => {
    console.log("Checking if URL is image:", url)
    if (!url) return false
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e6edf5] overflow-hidden">

      {/* 🔍 Header */}
      <div className="bg-gradient-to-r from-[#e9f5fe] to-[#f4faff] px-5 py-4 flex flex-col lg:flex-row gap-3 justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9aa6b2]" />
          <Input
            placeholder="Search example..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 bg-white border-[#dbe3ec]"
          />
        </div>

        {/* {access.create && ( */}
          {/* <Link href="/v1/examples/create">
            <Button className="flex items-center gap-2 bg-[#4db1d4] hover:bg-[#3aa9d1] text-white h-11">
              <Plus />
              Add Example
            </Button>
          </Link> */}
          <Button
            className="flex items-center gap-2 bg-[#4db1d4] text-white h-11"
            onClick={() => {
              setSelectedItem(null)
              setActiveModal("create")
            }}
          >
            <Plus />
            Add Example
          </Button>
        {/* )} */}
      </div>

      {/* 📋 Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow className="bg-[#f8fafc]">
            <TableHead className="px-5">Name</TableHead>
            <TableHead className="px-5">Attachment</TableHead>
            <TableHead className="px-5 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10">
                  Loading...
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10 text-gray-400">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} className="hover:bg-[#f9fbff]">
                  <TableCell className="px-5 font-medium">
                    {item.name}
                  </TableCell>

                  <TableCell className="px-5">
                    <a
                      href={item.attachment}
                      target="_blank"
                      className="text-[#4db1d4] font-semibold hover:underline"
                    >
                      View File
                    </a>
                  </TableCell>

                  <TableCell className="px-5">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setSelectedItem(item)
                          setActiveModal("show")
                        }}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setSelectedItem(item)
                          setActiveModal("edit")
                        }}
                      >
                        <Pencil className="size-4 text-[#4db1d4]" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setSelectedItem(item)
                          setActiveModal("delete")
                        }}
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 🔢 Pagination */}
      <div className="flex items-center justify-between px-5 py-4 border-t bg-[#fafcff]">

        <div className="text-sm text-gray-600">
          Showing {(pagination.currentPage - 1) * pagination.perPage + 1} –{" "}
          {Math.min(
            pagination.currentPage * pagination.perPage,
            pagination.total
          )}{" "}
          of {pagination.total}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span>Per Page</span>
          <select
            value={pagination.perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="h-9 border rounded px-2"
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={pagination.currentPage === 1}
            onClick={() => onPageChange(pagination.currentPage - 1)}
          >
            Prev
          </Button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <Button
                key={page}
                size="sm"
                variant={
                  page === pagination.currentPage ? "default" : "outline"
                }
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            )
          )}

          <Button
            size="sm"
            variant="outline"
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => onPageChange(pagination.currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* 👁 Show Modal */}
      <Dialog
        open={activeModal === "show"}
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Example Detail</DialogTitle>
            <DialogDescription>
              Detail informasi example
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <>
              {/* 🖼 Attachment Preview */}
              <div className="rounded-lg border bg-slate-50 p-4">
                {isImage(selectedItem.attachment) ? (
                  <img
                    src={selectedItem.attachment}
                    alt={selectedItem.name}
                    className="max-h-[320px] mx-auto rounded-md object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      Attachment File
                    </span>
                    <a
                      href={selectedItem.attachment}
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
                  <p className="font-medium text-slate-900">
                    {selectedItem.name}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">Attachment</p>
                  <a
                    href={selectedItem.attachment}
                    target="_blank"
                    className="text-[#4db1d4] font-medium hover:underline"
                  >
                    Open file
                  </a>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setActiveModal(null)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✏️ Create / Edit Modal */}
      <Dialog open={activeModal === "create" || activeModal === "edit"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {activeModal === "create" ? "Add Example" : "Edit Example"}
            </DialogTitle>
            <DialogDescription>
              {activeModal === "create"
                ? "Create new example"
                : "Update example data"}
            </DialogDescription>
          </DialogHeader>

          <ExampleForm
            initialData={
              activeModal === "edit" && selectedItem
                ? {
                    name: selectedItem.name,
                    attachment: selectedItem.attachment,
                  }
                : undefined
            }
            submitUrl={
              activeModal === "create"
                ? "http://localhost:3001/api/v1/examples"
                : `http://localhost:3001/api/v1/examples/${selectedItem?.id}`
            }
            method={activeModal === "create" ? "POST" : "PATCH"}
            onSuccess={() => {
              setActiveModal(null)
              fetchData(pagination.currentPage, pagination.perPage)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* 🗑 Delete Modal */}
      <Dialog open={activeModal === "delete"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Example</DialogTitle>
            <DialogDescription>
              Are you sure want to delete <b>{selectedItem?.name}</b>?
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setActiveModal(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                console.log("Deleting...", selectedItem)
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

