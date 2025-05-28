"use client"

import { Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PersonalDetailsContent() {
  const stats = [
    {
      title: "Total Bookings Completed",
      value: "1200",
      change: "+12 vs last week",
      positive: true,
    },
    {
      title: "Overall Rating",
      value: "4.3",
      subtext: "45 Reviews",
    },
    {
      title: "Pending Bookings",
      value: "28",
      change: "Requires attention",
      positive: false,
    },
    {
      title: "Joining Date",
      value: "4-January 2024",
    },
  ]

  return (
    <div className="p-7">
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-semibold mr-2">{stat.value}</h3>
              {stat.subtext && <span className="text-sm text-gray-500">({stat.subtext})</span>}
            </div>
            {stat.change && (
              <p className={`text-xs ${stat.positive ? "text-green-500" : "text-red-500"}`}>{stat.change}</p>
            )}
          </div>
        ))}
      </div>

      {/* Profile Section */}
      <div className="mb-8">
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
