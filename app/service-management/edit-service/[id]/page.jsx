"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, Upload, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"   
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function ServiceEditPage() {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id

  const [service, setService] = useState({
    id: serviceId,
    name: "Cleaning",
    description: "",
    image: "/placeholder.svg?height=80&width=80",
  })

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

  const handleEditCategory = (categoryId) => {
    router.push(`/service-management/edit-service/${service.id}/category/${categoryId}`)
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
            <h1 className="2xl:text-lg text-sm font-semibold">Service Management</h1>
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
                <Button variant="outline" size="sm" className="h-9 flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload New
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block 2xl:text-sm text-xs font-medium mb-1">
                    Service Name
                  </label>
                  <Input id="name" name="name" value={service.name} onChange={handleInputChange} className="h-10" />
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
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Category List */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="2xl:text-lg text-sm font-medium">Category list</h2>
              </div>

              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium 2xl:text-lg text-sm">{category.name}</h3>
                      <Button
                        variant="default"
                        size="sm"
                        className="h-8 bg-gray-900 text-white hover:bg-gray-800"
                        onClick={() => handleEditCategory(category.id)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                    <p className="2xl:text-sm text-xs text-gray-500 mb-2">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((subcat, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100"
                        >
                          {subcat}
                        </Badge>
                      ))}
                      {category.subcategories.length > 3 && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100">
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
