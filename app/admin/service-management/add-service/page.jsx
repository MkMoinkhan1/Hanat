"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, Upload, Edit, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function ServiceEditPage() {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id

  // Mock service data
  const [service, setService] = useState({
    id: serviceId,
    name: "Cleaning",
    description: "",
    image: "/placeholder.svg?height=80&width=80",
  })

  // Mock categories data
  const categories = [
    {
      id: 1,
      name: "Furniture",
      description: "Lorem ipsum dolor sit",
      subcategories: ["Sofa", "Dining Table", "Mattress"],
    },
    {
      id: 2,
      name: "Commercial",
      description: "Lorem ipsum dolor sit",
      subcategories: ["Kitchen", "Living Room", "Bedroom", "Bathroom"],
    },
    {
      id: 3,
      name: "Residential",
      description: "Lorem ipsum dolor sit",
      subcategories: ["Office Space", "Kitchen", "Bathroom"],
    },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setService((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <div className="flex h-screen bg-white">

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 border-b bg-white px-6 py-4">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className=" 2xl:text-lg text-sm  font-semibold">Service Management</h1>
            <p className="2xl:text-sm text-xs text-muted-foreground">Lorem ipsum management</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Service Details */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="h-16 w-16 object-cover rounded-md"
                />
                <Button variant="outline"  className="h-9 flex items-center gap-2 2xl:text-sm text-xs" onClick={() => alert("Upload new image")}>
                  <Upload className="2xl:h-4 2xl:w-4 !w-2 !h-2" />
                  Upload New
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block 2xl:text-sm text-xs font-medium mb-1">
                    Service Name
                  </label>
                  <Input id="name" name="name" value={service.name} onChange={handleInputChange} className="h-10 2xl:text-sm !text-xs" />
                </div>

                <div>
                  <label htmlFor="description" className="block 2xl:text-sm text-xs font-medium mb-1">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter Description"
                    value={service.description}
                    onChange={handleInputChange}
                    className="min-h-[200px] 2xl:text-sm !text-xs"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="mt-6 2xl:text-sm text-xs" onClick={() => router.push(`/admin/service-management`)}>
                Save
              </Button>
              <Button className="mt-6 2xl:text-sm text-xs" variant={"outline"} onClick={() => router.back()}>
                Cancel
              </Button>
              </div>
            </div>

            {/* Right Column - Category List */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center justify-between mb-4">
                <h2 className=" 2xl:text-lg text-sm  font-medium">Category list</h2>
                <Button
                variant={"outline"}
                  className="flex items-center gap-2 2xl:text-sm text-xs"
                  onClick={() => router.push("/admin/service-management/add-service/add-category")}
                >
                  <Plus className="2xl:h-4 2xl:w-4 w-2 h-2" />
                  Add category
                </Button>
              </div>

              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category.id} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className=" 2xl:text-lg text-sm  font-medium">{category.name}</h3>
                    </div>
                    <p className="2xl:text-sm text-xs text-gray-500 mb-2">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((subcat, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-blue-50 text-blue-400 hover:bg-blue-100 border-blue-100"
                        >
                          {subcat}
                        </Badge>
                      ))}
                      {category.subcategories.length > 3 && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-400 2xl:text-sm text-xs hover:bg-blue-100 border-blue-100">
                          +{category.subcategories.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
