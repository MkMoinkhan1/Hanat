"use client"

import { Search, Filter, ChevronDown, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export default function ResourcesContent() {
  const resources = [
    {
      id: 1,
      name: "Cody Fisher",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 3,
      service: "Electrician",
      mobile: "0000000000",
    },
    {
      id: 2,
      name: "Floyd Miles",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 3,
      service: "Electrician",
      mobile: "0000000000",
    },
    {
      id: 3,
      name: "Savannah Nguyen",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 3,
      service: "Electrician",
      mobile: "0000000000",
    },
    {
      id: 4,
      name: "Jenny Wilson",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 3,
      service: "Electrician",
      mobile: "0000000000",
    },
  ]

  return (
    <div className="p-7">
      {/* Search and Filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search" className="pl-10 border-gray-300" />
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-gray-300 text-gray-700">
            All Status
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Resources List */}
      <div className="space-y-6">
        {resources.map((resource) => (
          <div key={resource.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4 w-[20rem]">
              <img src={resource.avatar || "/placeholder.svg"} alt={resource.name} className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="font-medium text-gray-900 2xl:text-sm text-xs">{resource.name}</h3>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`2xl:h-4 2xl:w-4 w-3 h-3 ${i < resource.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-16 w-[20em]">
              <div className="">
                <p className="2xl:text-sm text-xs text-gray-500 mb-1">Service</p>
                <p className="font-medium text-gray-900 2xl:text-sm text-xs">{resource.service}</p>
              </div>
              <div className="">
                <p className="2xl:text-sm text-xs text-gray-500 mb-1">Mobile Number</p>
                <p className="font-medium text-gray-900 2xl:text-sm text-xs">{resource.mobile}</p>
              </div>
            </div>
              <Button variant="outline" className="border-gray-300 text-gray-700">
                <Eye className="2xl:h-4 2xl:w-4 w-3 h-3 mr-2" />
                View
              </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
