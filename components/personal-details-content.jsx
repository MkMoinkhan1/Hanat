"use client"

import { CircleCheck, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardDetails from "./dashboard-details"
import Image from "next/image"
import serviceProviderLogo from "@/public/images/service-provider-logo.png"
import { Badge } from "./ui/badge"

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
         
         <div className="grid grid-cols-2 gap-4 w-full">
            <div className="w-full col-span-1">
               <div className="flex items-center justify-between text-white font-bold 2xl:text-sm text-xs">
            <div className="w-12 h-12 bg-white rounded-full flex items-center gap-4  ">
              <Image
                src={serviceProviderLogo}
                alt="Profile Picture"
                width={48}
                height={48}
                className="rounded-full"/>
          
               <Button variant="outline" className="border-gray-300 text-gray-700 2xl:text-sm text-xs">
            <Upload className="2xl:h-4 2xl:w-4 2xl:mr-2 w-2 h-2 mr-1 " />
            Upload New
          </Button>
            </div>
           <Badge
                variant="outline"
                className="text-muted-foreground rounded-md gap-0.5 px-1.5 text-xs "
              >
                <CircleCheck className="fill-green-500 dark:fill-green-400 w-[13px] h-[13px] text-white" />
                Active{" "}
              </Badge>
            </div>
            </div>
         </div>
        </div>
      </div>

      {/* Personal Details Form */}
      <div className="space-y-8">
        <div>
          <h3 className="2xl:text-sm text-xs font-medium text-gray-500 mb-4">PERSONAL DETAILS</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block 2xl:text-sm text-xs font-medium text-gray-700 mb-1">Full Name</label>
              <Input placeholder="Enter your name" className="border-gray-300 2xl:text-sm text-xs" />
            </div>
            <div>
              <label className="block 2xl:text-sm text-xs font-medium text-gray-700 mb-1">Email</label>
              <Input placeholder="Enter your mail" className="border-gray-300 2xl:text-sm text-xs" />
            </div>
            <div>
              <label className="block 2xl:text-sm text-xs font-medium text-gray-700 mb-1">Phone Number</label>
              <Input placeholder="Enter your name" className="border-gray-300 2xl:text-sm text-xs" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="2xl:text-sm text-xs font-medium text-gray-500 mb-4">BUSINESS DETAILS</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block 2xl:text-sm text-xs font-medium text-gray-700 mb-1">Business Name</label>
              <Input placeholder="Enter your business name" className="border-gray-300 2xl:text-sm text-xs" />
            </div>
            <div>
              <label className="block 2xl:text-sm text-xs font-medium text-gray-700 mb-1">Type of Service</label>
              <Select>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select type of service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrician" >Electrician</SelectItem>
                  <SelectItem value="plumber" >Plumber</SelectItem>
                  <SelectItem value="cleaning" >Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block 2xl:text-sm text-xs font-medium text-gray-700 mb-1">Service Area</label>
              <Select>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-york" className="2xl:text-sm text-xs">New York</SelectItem>
                  <SelectItem value="los-angeles" className="2xl:text-sm text-xs">Los Angeles</SelectItem>
                  <SelectItem value="chicago" className="2xl:text-sm text-xs">Chicago</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
