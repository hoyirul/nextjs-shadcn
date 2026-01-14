// src/modules/v1/example/presentations/components/ExampleTable.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { ExampleForm } from "./ExampleForm"
import { ExamplePreview } from "./ExamplePreview"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, Pencil, Trash2, Eye, Filter, MoreVertical, Edit, RefreshCw } from "lucide-react"
import { ExampleUseCase } from "@/src/modules/v1/example/usecases/example.usecase"
import { Example } from "@/src/modules/v1/example/domains/example.entity"
import { Pagination } from "@/src/shared/partials/Pagination";
import type { IPagination } from "@/src/shared/types/pagination";
import type { IAccess } from "@/src/shared/types/access";
import { Modal } from "@/src/shared/partials/Modal";
import { toast } from "sonner"

export function ExampleTable() {
  const exampleUseCase = new ExampleUseCase()
  const [items, setItems] = useState<Example[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    current_page: 1,
    per_page: 10,
    total_pages: 0,
    total: 0,
  })

  const [access, setAccess] = useState<IAccess>({
    view: true,
    show: true,
    create: true,
    update: true,
    delete: true,
    restore: true,
    approve: true 
  })

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [loading, setLoading] = useState(false)
  const [activeModal, setActiveModal] = useState<
    "create" | "edit" | "show" | "delete" | "restore" | "filters" | null
  >(null)

  const [selectedItem, setSelectedItem] = useState<Example | null>(null)

  const fetchData = async (page = 1, per_page = 10, keywords = "") => {
    setLoading(true)
    try {
      const res = await exampleUseCase.getAll(page, per_page, keywords)

      setItems(res.items)
      setPagination({
        current_page: res.pagination.current_page,
        per_page: res.pagination.per_page,
        total_pages: res.pagination.total_pages,
        total: res.pagination.total,
      })
      setAccess(res.access)
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to fetch data.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
    }, 800)

    return () => clearTimeout(handler)
  }, [search])

  useEffect(() => {
    fetchData(pagination.current_page, pagination.per_page, debouncedSearch)
  }, [debouncedSearch])

  const onPageChange = (page: number) => {
    if (page !== pagination.current_page) {
      fetchData(page, pagination.per_page)
    }
  }

  const onPerPageChange = (per_page: number) => {
    if (per_page !== pagination.per_page) {
      fetchData(1, per_page)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await exampleUseCase.delete(id)
      toast.success(response.message || "Example deleted successfully")
      setActiveModal(null)
      fetchData(pagination.current_page, pagination.per_page, debouncedSearch)
    } catch (err) {
      toast.error("Failed to delete example.")
    } finally {
      setSelectedItem(null)
    }
  }

  const isImage = (url?: string) => {
    if (!url) return false
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e6edf5] overflow-hidden">

      {/* 🔍 Header */}
      <div className="bg-gradient-to-r from-[#e9f5fe] to-[#f4faff] px-5 py-4 flex flex-col lg:flex-row gap-3 justify-between items-center">
        {/* Left: Search + Filter */}
        <div className="flex gap-2 items-center w-full max-w-md">
          {/* Filter Button */}
          <Button
            variant="outline"
            className="h-11 flex items-center gap-2 font-semibold cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            onClick={() => setActiveModal("filters")}
          >
            <Filter />
            Filter
          </Button>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9aa6b2]" />
            <Input
              placeholder="Search example..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 bg-white border-[#dbe3ec]"
            />
          </div>
        </div>

        {/* Right: Add Example */}
        {access.create && (
          <Button
            className="flex items-center gap-2 bg-[#3b82f6] text-white h-11 cursor-pointer font-semibold hover:bg-[#2563eb]"
            onClick={() => {
              setSelectedItem(null)
              setActiveModal("create")
            }}
          >
            <Plus />
            Add Example
          </Button>
        )}
      </div>

      {/* Filter Modal */}
      <Modal
        isOpen={activeModal === "filters"}
        title="Filter Examples"
        description="Set your filter preferences"
        onClose={() => setActiveModal(null)}
        maxWidth="max-w-md"
      >
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setActiveModal(null)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              setActiveModal(null)
            }}
          >
            Apply Filters
          </Button>
        </div>
      </Modal>


      {/* 📋 Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow className="bg-[#f8fafc]">
            <TableHead className="px-5">Name</TableHead>
            <TableHead className="px-5">Attachment</TableHead>
            <TableHead className="px-5 justify-center flex">Status</TableHead>
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
                    {/* badge draft gray */}
                    <div className="justify-center flex">
                      {item.status.code === 'draft' ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 font-semibold">
                          {item.status.label}
                        </span>
                      ) : item.status.code === 'submitted' ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 font-semibold">
                          {item.status.label}
                        </span>
                      ) : item.status.code === 'approved' ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 font-semibold">
                          {item.status.label}
                        </span>
                      ) : item.status.code === 'rejected' ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 font-semibold">
                          {item.status.label}
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs bg-rose-100 text-rose-800 font-semibold">
                          {item.status.label}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="px-5">
                    <div className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 rounded hover:bg-gray-100 flex items-center gap-1 cursor-pointer">
                            {/* Aksi <MoreVertical className="w-4 h-4" /> */}
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                          {access.show && (
                            <DropdownMenuItem
                              className="text-gray-500 cursor-pointer"
                              onClick={() => {
                                setSelectedItem(item)
                                setActiveModal("show")
                              }}
                            >
                              <Eye className="size-4 mr-2 text-gray-500" />
                              View
                            </DropdownMenuItem>
                          )}

                          {access.update && (
                            <DropdownMenuItem
                              className="text-gray-500 cursor-pointer"
                              onClick={() => {
                                setSelectedItem(item)
                                setActiveModal("edit")
                              }}
                            >
                              <Edit className="size-4 mr-2 text-sky-500" />
                              Edit
                            </DropdownMenuItem>
                          )}

                          {access.delete && (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedItem(item)
                                setActiveModal("delete")
                              }}
                              className="text-gray-500 cursor-pointer"
                            >
                              <Trash2 className="size-4 mr-2 text-red-500" />
                              Delete
                            </DropdownMenuItem>
                          )}

                          {access.restore && item.deletedAt && (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedItem(item)
                                setActiveModal("restore")
                              }}
                              className="text-gray-500 cursor-pointer"
                            >
                              <RefreshCw className="size-4 mr-2 text-green-500" />
                              Restore
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 🔢 Pagination */}
      <Pagination
        currentPage={pagination.current_page}
        perPage={pagination.per_page}
        total={pagination.total}
        totalPages={pagination.total_pages}
        onPageChange={onPageChange}
        onPerPageChange={onPerPageChange}
      />

      {/* 👁 Show Modal */}
      <Modal
        isOpen={activeModal === "show"}
        title="Example Detail"
        description="Detail informasi example"
        onClose={() => setActiveModal(null)}
        maxWidth="max-w-2xl"
      >
        {selectedItem && (
          <ExamplePreview 
            item={selectedItem} 
            isImage={isImage} 
            onUpdated={() =>
              fetchData(
                pagination.current_page,
                pagination.per_page,
                debouncedSearch
              )
            }
          />
        )}

        <div className="flex justify-end mt-4">
          <Button variant="outline" className="cursor-pointer" onClick={() => setActiveModal(null)}>Close</Button>
        </div>
      </Modal>

      {/* ✏️ Create/Edit Modal */}
      <Modal
        isOpen={activeModal === "create" || activeModal === "edit"}
        title={activeModal === "create" ? "Create Example" : "Edit Example"}
        description={
          activeModal === "create"
            ? "Fill the form below to create a new example."
            : "Update the form below to edit the example."
        }
        onClose={() => setActiveModal(null)}
        maxWidth="max-w-lg"
      >
        <ExampleForm
            data={
              activeModal === "edit" && selectedItem
                ? {
                    id: selectedItem.id,
                    name: selectedItem.name,
                    attachment: selectedItem.attachment,
                  }
                : undefined
            }
            onSuccess={() => {
              setActiveModal(null)
              fetchData(pagination.current_page, pagination.per_page, debouncedSearch)
            }}
          />
      </Modal>

      {/* 🗑 Delete Modal */}
      <Modal
        isOpen={activeModal === "delete"}
        title="Delete Example"
        description="Are you sure you want to delete this example? This action cannot be undone."
        onClose={() => setActiveModal(null)}
        maxWidth="max-w-md"
      >
        <div className="flex justify-end gap-2">
          <Button variant="outline" className="cursor-pointer" onClick={() => setActiveModal(null)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              if (!selectedItem) return

              await handleDelete(selectedItem.id)
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}

