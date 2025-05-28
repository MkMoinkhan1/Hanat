"use client"

import { Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardDetails from "./dashboard-details"

export default function PersonalDetailsContent() {
  const stats = [
    {
      label: "Total Bookings Completed",
      value: "1200",
      change: "+12",
      note: "vs last week",
      changeType: "positive",
    },
    {
      label: "Overall Rating",
      value: "4.3",
      change: `(45 Reviews)`,
    changeType: "neutral",
    },
    {
      label: "Pending Bookings",
      value: "28",
      change: "Requires attention",
      changeType: "neutral",
    },
    {
      label: "Joining Date",
      value: "4-January",
      change:"2024",
       changeType: "neutral",
    },
  ]

  return (
    <div className="p-7">
      <DashboardDetails stats={stats} />

      {/* Profile Section */}
      <div className="mb-8 mt-5">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-500 text-xs font-bold">THE NORTH FACE</span>
            </div>
          </div>
          <Button variant="outline" className="border-gray-300 text-gray-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload New
          </Button>
          <div className="flex items-center text-green-600 text-sm">
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
            Active
          </div>
        </div>
      </div>

      {/* Personal Details Form */}
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">PERSONAL DETAILS</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input placeholder="Enter your name" className="border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input placeholder="Enter your mail" className="border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <Input placeholder="Enter your name" className="border-gray-300" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">BUSINESS DETAILS</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <Input placeholder="Enter your business name" className="border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type of Service</label>
              <Select>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select type of service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrician">Electrician</SelectItem>
                  <SelectItem value="plumber">Plumber</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Area</label>
              <Select>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="los-angeles">Los Angeles</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
