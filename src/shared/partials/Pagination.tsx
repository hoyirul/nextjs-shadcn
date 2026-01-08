import React from "react";
import { Button } from "components/ui/button";

interface PaginationProps {
  currentPage: number;
  perPage: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  perPageOptions?: number[]; // optional, default [10,25,50,100]
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  perPage,
  total,
  totalPages,
  onPageChange,
  onPerPageChange,
  perPageOptions = [10, 25, 50, 100],
}) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-t bg-[#fafcff]">

      {/* Showing x - y of total */}
      <div className="text-sm text-gray-600">
        Showing {(currentPage - 1) * perPage + 1} –{" "}
        {Math.min(currentPage * perPage, total)} of {total}
      </div>

      {/* Per Page */}
      <div className="flex items-center gap-2 text-sm">
        <span>Per Page</span>
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="h-9 border rounded px-2"
        >
          {perPageOptions.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Page Buttons */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            size="sm"
            variant={page === currentPage ? "default" : "outline"}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
