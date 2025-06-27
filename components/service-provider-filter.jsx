"use client"


import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"


export function ServiceProviderFilterDialog({ data, onFilterChange, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRatings, setSelectedRatings] = useState([])
  const [selectedProviders, setSelectedProviders] = useState([])
  const [providerSearchQuery, setProviderSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("provider-name")
  const [selectedStatuses, setSelectedStatuses] = useState([])
  const [providerNameSort, setProviderNameSort] = useState("a-z")
  const [selectedServiceAreas, setSelectedServiceAreas] = useState([])
  const [selectedServices, setSelectedServices] = useState([])
  const [serviceAreaSearchQuery, setServiceAreaSearchQuery] = useState("")
  const [serviceSearchQuery, setServiceSearchQuery] = useState("")

  // Get unique values from data with null checks
  const uniqueProviders = data ? [...new Set(data.map((item) => item?.name).filter(Boolean))].sort() : []
  const uniqueServiceAreas = data ? [...new Set(data.map((item) => item?.area).filter(Boolean))].sort() : []
  const uniqueServices = data ? [...new Set(data.map((item) => item?.services).filter(Boolean))].sort() : []
  const ratings = ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"]
  const statuses = ["Active", "Inactive"]

  // Filter data based on search queries with null checks
  const filteredProviders = uniqueProviders.filter(
    (provider) => provider && provider.toLowerCase().includes(providerSearchQuery.toLowerCase()),
  )

  const filteredServiceAreas = uniqueServiceAreas.filter(
    (area) => area && area.toLowerCase().includes(serviceAreaSearchQuery.toLowerCase()),
  )

  const filteredServices = uniqueServices.filter(
    (service) => service && service.toLowerCase().includes(serviceSearchQuery.toLowerCase()),
  )

  const handleRatingToggle = (rating) => {
    setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  const handleProviderToggle = (provider) => {
    setSelectedProviders((prev) => (prev.includes(provider) ? prev.filter((p) => p !== provider) : [...prev, provider]))
  }

  const handleStatusToggle = (status) => {
    setSelectedStatuses((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const handleServiceAreaToggle = (area) => {
    setSelectedServiceAreas((prev) => (prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]))
  }

  const handleServiceToggle = (service) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const applyFilters = () => {
    let filteredData = data ? [...data] : []

    // Apply filters with null checks
    if (selectedRatings.length > 0) {
      filteredData = filteredData.filter((item) =>
        selectedRatings.some((rating) => item?.rating?.toString().includes(rating.charAt(0))),
      )
    }

    if (selectedProviders.length > 0) {
      filteredData = filteredData.filter((item) => item?.name && selectedProviders.includes(item.name))
    }

    if (selectedStatuses.length > 0) {
      filteredData = filteredData.filter((item) => item?.status && selectedStatuses.includes(item.status))
    }

    if (selectedServiceAreas.length > 0) {
      filteredData = filteredData.filter((item) => item?.area && selectedServiceAreas.includes(item.area))
    }

    if (selectedServices.length > 0) {
      filteredData = filteredData.filter((item) => item?.services && selectedServices.includes(item.services))
    }

    // Apply sorting with null checks
    if (sortBy === "provider-name") {
      filteredData.sort((a, b) => {
        const nameA = a?.name || ""
        const nameB = b?.name || ""
        if (providerNameSort === "a-z") {
          return nameA.localeCompare(nameB)
        } else {
          return nameB.localeCompare(nameA)
        }
      })
    } else if (sortBy === "service-area") {
      filteredData.sort((a, b) => (a?.area || "").localeCompare(b?.area || ""))
    } else if (sortBy === "services") {
      filteredData.sort((a, b) => (a?.services || "").localeCompare(b?.services || ""))
    } else if (sortBy === "ratings") {
      filteredData.sort((a, b) => (b?.rating || 0) - (a?.rating || 0))
    } else if (sortBy === "status") {
      filteredData.sort((a, b) => (a?.status || "").localeCompare(b?.status || ""))
    }

    const filterState = {
      selectedRatings,
      selectedProviders,
      sortBy,
      selectedStatuses,
      providerNameSort,
      selectedServiceAreas,
      selectedServices,
      providerSearchQuery,
      serviceAreaSearchQuery,
      serviceSearchQuery,
    }

    onFilterChange(filteredData, filterState)
    setIsOpen(false)
  }

  const resetFilters = () => {
    setSelectedRatings([])
    setSelectedProviders([])
    setProviderSearchQuery("")
    setSortBy("provider-name")
    setSelectedStatuses([])
    setProviderNameSort("a-z")
    setSelectedServiceAreas([])
    setSelectedServices([])
    setServiceAreaSearchQuery("")
    setServiceSearchQuery("")

    const filterState = {
      selectedRatings: [],
      selectedProviders: [],
      sortBy: "provider-name",
      selectedStatuses: [],
      providerNameSort: "a-z",
      selectedServiceAreas: [],
      selectedServices: [],
      providerSearchQuery: "",
      serviceAreaSearchQuery: "",
      serviceSearchQuery: "",
    }

    onFilterChange(data || [], filterState)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filter Service Providers</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {/* Ratings Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Ratings</h3>
            <div className="space-y-3">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onCheckedChange={() => handleRatingToggle(rating)}
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {rating}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Search for Provider */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Search for provider</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for provider"
                value={providerSearchQuery}
                onChange={(e) => setProviderSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {filteredProviders.map((provider) => (
                <div key={provider} className="flex items-center space-x-2">
                  <Checkbox
                    id={`provider-${provider}`}
                    checked={selectedProviders.includes(provider)}
                    onCheckedChange={() => handleProviderToggle(provider)}
                  />
                  <label
                    htmlFor={`provider-${provider}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {provider}
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
                <SelectItem value="provider-name">Provider Name</SelectItem>
                <SelectItem value="service-area">Service Area</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="ratings">Ratings</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>

            {/* Provider Name Sort Options */}
            {sortBy === "provider-name" && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="provider-a-z"
                    checked={providerNameSort === "a-z"}
                    onCheckedChange={() => setProviderNameSort("a-z")}
                  />
                  <label htmlFor="provider-a-z" className="text-sm font-medium">
                    Provider name A - Z
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="provider-z-a"
                    checked={providerNameSort === "z-a"}
                    onCheckedChange={() => setProviderNameSort("z-a")}
                  />
                  <label htmlFor="provider-z-a" className="text-sm font-medium">
                    Provider name Z - A
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Status</h3>
            <div className="space-y-3">
              {statuses.map((status) => (
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

          {/* Service Area Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Service Area</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for service area"
                value={serviceAreaSearchQuery}
                onChange={(e) => setServiceAreaSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {filteredServiceAreas.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={`area-${area}`}
                    checked={selectedServiceAreas.includes(area)}
                    onCheckedChange={() => handleServiceAreaToggle(area)}
                  />
                  <label
                    htmlFor={`area-${area}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {area}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Services Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Services</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for service"
                value={serviceSearchQuery}
                onChange={(e) => setServiceSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {filteredServices.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={`service-${service}`}
                    checked={selectedServices.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                  />
                  <label
                    htmlFor={`service-${service}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {service}
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
