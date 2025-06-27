"use client"


import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"



export function UsersFilterDialog({ data, onFilterChange, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([])
  const [sortBy, setSortBy] = useState("name")
  const [selectedGenders, setSelectedGenders] = useState([])
  const [nameSort, setNameSort] = useState("a-z")
  const [selectedStatuses, setSelectedStatuses] = useState([])

  // Get unique values for filters
  const uniqueUsers = [...new Set(data.map((item) => item.name))].sort()
  const uniqueGenders = [...new Set(data.map((item) => item.gender))].sort()
  const uniqueStatuses = [...new Set(data.map((item) => item.status))].sort()

  // Filter users based on search query
  const filteredUsers = uniqueUsers.filter((user) => user.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleUserToggle = (userName) => {
    setSelectedUsers((prev) => (prev.includes(userName) ? prev.filter((u) => u !== userName) : [...prev, userName]))
  }

  const handleGenderToggle = (gender) => {
    setSelectedGenders((prev) => (prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]))
  }

  const handleStatusToggle = (status) => {
    setSelectedStatuses((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const applyFilters = () => {
    let filteredData = [...data]

    // Filter by selected users
    if (selectedUsers.length > 0) {
      filteredData = filteredData.filter((item) => selectedUsers.includes(item.name))
    }

    // Filter by selected genders
    if (selectedGenders.length > 0) {
      filteredData = filteredData.filter((item) => selectedGenders.includes(item.gender))
    }

    // Filter by selected statuses
    if (selectedStatuses.length > 0) {
      filteredData = filteredData.filter((item) => selectedStatuses.includes(item.status))
    }

    // Apply sorting
    if (sortBy === "name") {
      filteredData.sort((a, b) => {
        if (nameSort === "a-z") {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      })
    } else if (sortBy === "gender") {
      filteredData.sort((a, b) => a.gender.localeCompare(b.gender))
    } else if (sortBy === "status") {
      filteredData.sort((a, b) => a.status.localeCompare(b.status))
    }

    const filterState = {
      selectedUsers,
      sortBy,
      selectedGenders,
      nameSort,
      selectedStatuses,
      searchQuery,
    }

    onFilterChange(filteredData, filterState)
    setIsOpen(false)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedUsers([])
    setSortBy("name")
    setSelectedGenders([])
    setNameSort("a-z")
    setSelectedStatuses([])

    const filterState = {
      selectedUsers: [],
      sortBy: "name",
      selectedGenders: [],
      nameSort: "a-z",
      selectedStatuses: [],
      searchQuery: "",
    }

    onFilterChange(data, filterState)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filter Users</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Search for User */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Search for user</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for user"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div key={user} className="flex items-center space-x-2">
                  <Checkbox
                    id={`user-${user}`}
                    checked={selectedUsers.includes(user)}
                    onCheckedChange={() => handleUserToggle(user)}
                  />
                  <label
                    htmlFor={`user-${user}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {user}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Sort by</h3>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Select sort option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="gender">Gender</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>

            {/* Name Sort Options */}
            {sortBy === "name" && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="name-a-z" checked={nameSort === "a-z"} onCheckedChange={() => setNameSort("a-z")} />
                  <label htmlFor="name-a-z" className="text-sm font-medium">
                    Name A - Z
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="name-z-a" checked={nameSort === "z-a"} onCheckedChange={() => setNameSort("z-a")} />
                  <label htmlFor="name-z-a" className="text-sm font-medium">
                    Name Z - A
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Gender Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Gender</h3>
            <div className="space-y-2">
              {uniqueGenders.map((gender) => (
                <div key={gender} className="flex items-center space-x-2">
                  <Checkbox
                    id={`gender-${gender}`}
                    checked={selectedGenders.includes(gender)}
                    onCheckedChange={() => handleGenderToggle(gender)}
                  />
                  <label
                    htmlFor={`gender-${gender}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {gender}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Status</h3>
            <div className="space-y-2">
              {uniqueStatuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={() => handleStatusToggle(status)}
                  />
                  <label
                    htmlFor={`status-${status}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={resetFilters}>
            Reset
          </Button>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
