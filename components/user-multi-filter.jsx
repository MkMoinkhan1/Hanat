"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { ChevronDown, Search, Check, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export function UserMultiFilter({ data, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef(null)

  const [filterState, setFilterState] = useState({
    sortBy: ["Name A - Z"],
    selectedNames: [],
    selectedGenders: [],
    selectedStatuses: ["Active"],
  })

  // Get unique values from data
  const uniqueNames = [...new Set(data.map((item) => item.name))].sort()
  const genderOptions = ["Women", "Men", "Trans/Non-binary"]
  const statusOptions = ["Active", "Inactive"]
  const sortOptions = ["Name A - Z", "Name Z - A"]

  // Filter names based on search
  const filteredNames = uniqueNames.filter((name) => name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setActiveSubmenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Memoized function to apply filters
  const applyFilters = useCallback(
    (newFilterState) => {
      let filteredData = [...data]

      // Apply name filter
      if (newFilterState.selectedNames.length > 0) {
        filteredData = filteredData.filter((item) => newFilterState.selectedNames.includes(item.name))
      }

      // Apply gender filter
      if (newFilterState.selectedGenders.length > 0) {
        filteredData = filteredData.filter((item) => newFilterState.selectedGenders.includes(item.gender))
      }

      // Apply status filter
      if (newFilterState.selectedStatuses.length > 0) {
        filteredData = filteredData.filter((item) => newFilterState.selectedStatuses.includes(item.status))
      }

      // Apply sorting
      if (newFilterState.sortBy.includes("Name A - Z")) {
        filteredData.sort((a, b) => a.name.localeCompare(b.name))
      } else if (newFilterState.sortBy.includes("Name Z - A")) {
        filteredData.sort((a, b) => b.name.localeCompare(a.name))
      }

      onFilterChange(filteredData, newFilterState)
    },
    [data, onFilterChange],
  )

  const handleSortToggle = (option) => {
    const newFilterState = {
      ...filterState,
      sortBy: [option],
    }
    setFilterState(newFilterState)
    applyFilters(newFilterState)
  }

  const handleNameToggle = (name) => {
    const newSelectedNames = filterState.selectedNames.includes(name)
      ? filterState.selectedNames.filter((item) => item !== name)
      : [...filterState.selectedNames, name]

    const newFilterState = { ...filterState, selectedNames: newSelectedNames }
    setFilterState(newFilterState)
    applyFilters(newFilterState)
  }

  const handleGenderToggle = (gender) => {
    const newSelectedGenders = filterState.selectedGenders.includes(gender)
      ? filterState.selectedGenders.filter((item) => item !== gender)
      : [...filterState.selectedGenders, gender]

    const newFilterState = { ...filterState, selectedGenders: newSelectedGenders }
    setFilterState(newFilterState)
    applyFilters(newFilterState)
  }

  const handleStatusToggle = (status) => {
    const newSelectedStatuses = filterState.selectedStatuses.includes(status)
      ? filterState.selectedStatuses.filter((item) => item !== status)
      : [...filterState.selectedStatuses, status]

    const newFilterState = { ...filterState, selectedStatuses: newSelectedStatuses }
    setFilterState(newFilterState)
    applyFilters(newFilterState)
  }

  const clearAllFilters = () => {
    const newFilterState = {
      sortBy: ["Name A - Z"],
      selectedNames: [],
      selectedGenders: [],
      selectedStatuses: [],
    }
    setFilterState(newFilterState)
    applyFilters(newFilterState)
  }

  const getActiveFiltersCount = () => {
    return filterState.selectedNames.length + filterState.selectedGenders.length + filterState.selectedStatuses.length
  }

  const handleSubmenuClick = (submenuType, e) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveSubmenu(activeSubmenu === submenuType ? null : submenuType)
  }

  const CustomCheckbox = ({
    checked,
    onCheckedChange,
    children,
  }) => (
    <div
      className="flex items-center space-x-3 p-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onCheckedChange()
      }}
    >
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150 ${
          checked ? "bg-blue-600 border-blue-600 shadow-sm" : "border-gray-300 bg-white hover:border-blue-400"
        }`}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className="text-sm text-gray-700 font-medium">{children}</span>
    </div>
  )

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        className={`gap-2 bg-white hover:bg-gray-50 border-gray-300 shadow-sm transition-all duration-150 ${
          isOpen ? "ring-2 ring-blue-500 ring-opacity-20 border-blue-400" : ""
        }`}
        onClick={() => {
          setIsOpen(!isOpen)
          setActiveSubmenu(null)
        }}
      >
        <Filter className="h-4 w-4 text-gray-600" />
        <span className="font-medium">Filter</span>
        {getActiveFiltersCount() > 0 && (
          <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
            {getActiveFiltersCount()}
          </span>
        )}
        <ChevronDown
          className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-visible">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            <div className="flex items-center gap-2">
              {getActiveFiltersCount() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Clear All
                </button>
              )}
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Sort By */}
          <div className="relative">
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
              onClick={(e) => handleSubmenuClick("sort", e)}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">Sort by</span>
                {filterState.sortBy.length > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-1">
                    {filterState.sortBy.length}
                  </span>
                )}
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${activeSubmenu === "sort" ? "rotate-180" : ""}`}
              />
            </div>
            {activeSubmenu === "sort" && (
              <div className="absolute right-full top-0 mr-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-[60] overflow-hidden">
                <div className="p-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                    Sort Options
                  </div>
                  {sortOptions.map((option) => (
                    <CustomCheckbox
                      key={option}
                      checked={filterState.sortBy.includes(option)}
                      onCheckedChange={() => handleSortToggle(option)}
                    >
                      {option}
                    </CustomCheckbox>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Name */}
          <div className="relative">
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
              onClick={(e) => handleSubmenuClick("name", e)}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">Name</span>
                {filterState.selectedNames.length > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-1">
                    {filterState.selectedNames.length}
                  </span>
                )}
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${activeSubmenu === "name" ? "rotate-180" : ""}`}
              />
            </div>
            {activeSubmenu === "name" && (
              <div className="absolute right-full top-0 mr-1 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-[60] overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Search Names</div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search for user..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-9 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {filteredNames.length > 0 ? (
                    filteredNames.map((name) => (
                      <CustomCheckbox
                        key={name}
                        checked={filterState.selectedNames.includes(name)}
                        onCheckedChange={() => handleNameToggle(name)}
                      >
                        {name}
                      </CustomCheckbox>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      {searchQuery ? `No names found matching "${searchQuery}"` : "No names available"}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Gender */}
          <div className="relative">
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
              onClick={(e) => handleSubmenuClick("gender", e)}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">Gender</span>
                {filterState.selectedGenders.length > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-1">
                    {filterState.selectedGenders.length}
                  </span>
                )}
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${activeSubmenu === "gender" ? "rotate-180" : ""}`}
              />
            </div>
            {activeSubmenu === "gender" && (
              <div className="absolute right-full top-0 mr-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-[60] overflow-hidden">
                <div className="p-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                    Gender Options
                  </div>
                  {genderOptions.map((gender) => (
                    <CustomCheckbox
                      key={gender}
                      checked={filterState.selectedGenders.includes(gender)}
                      onCheckedChange={() => handleGenderToggle(gender)}
                    >
                      {gender}
                    </CustomCheckbox>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="relative">
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={(e) => handleSubmenuClick("status", e)}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">Status</span>
                {filterState.selectedStatuses.length > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-1">
                    {filterState.selectedStatuses.length}
                  </span>
                )}
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${activeSubmenu === "status" ? "rotate-180" : ""}`}
              />
            </div>
            {activeSubmenu === "status" && (
              <div className="absolute right-full top-0 mr-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-[60] overflow-hidden">
                <div className="p-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                    Status Options
                  </div>
                  {statusOptions.map((status) => (
                    <CustomCheckbox
                      key={status}
                      checked={filterState.selectedStatuses.includes(status)}
                      onCheckedChange={() => handleStatusToggle(status)}
                    >
                      {status}
                    </CustomCheckbox>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
