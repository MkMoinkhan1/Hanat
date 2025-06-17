"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Search ,Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DataTable({
  data,
  columns,
  searchField = "name",
  itemsPerPageOptions = [5, 10, 25, 50],
  defaultItemsPerPage = 5,
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage)
  const [filteredData, setFilteredData] = useState(data)
  const [paginatedData, setPaginatedData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    if (!data) return

    const filteredStatus = statusFilter === "All" ? data : data.filter((item) => item.status === statusFilter)

    const filtered = searchQuery
      ? filteredStatus.filter((item) => {
          const searchValue = item[searchField]?.toString().toLowerCase() || ""
          
          return searchValue.includes(searchQuery.toLowerCase()) 
        })
      : filteredStatus
    
    setFilteredData(filtered)
    setTotalPages(Math.ceil(filtered.length / itemsPerPage))
    setCurrentPage(1) 
  }, [searchQuery, data, searchField, itemsPerPage,statusFilter])

  useEffect(() => {
    if (!filteredData) return

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setPaginatedData(filteredData.slice(startIndex, endIndex))
  }, [filteredData, currentPage, itemsPerPage])

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    setCurrentPage(newPage)
  }

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground 2xl:text-sm text-xs"  />
          <Input
            type="search"
            placeholder={`Search by ${searchField}...`}
            className="pl-8 2xl:text-sm !text-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
            <div className="flex items-center gap-2 2xl:text-sm text-xs">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px] 2xl:text-sm text-xs">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="text-xs 2xl:text-sm" >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
      </div>

      {/* Table */}
      <div className="rounded-md border text-xs lg:text-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="h-12 px-2 text-left align-middle 2xl:text-sm text-xs  font-medium text-muted-foreground"
                  style={column.width ? { width: column.width } : {}}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="2xl:p-4 p-2 align-middle 2xl:text-sm text-xs">
                      {column.cell ? column.cell(row) : row[column.accessorKey]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center 2xl:text-sm text-xs">
                  {searchQuery ? "No results found" : "No data available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {filteredData.length > 0 && (
          <div className="flex items-center justify-center border-t px-4 py-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="2xl:text-sm text-xs">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
