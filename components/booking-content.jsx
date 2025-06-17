"use client"

import { Search, Filter, ChevronDown, CircleCheck, CircleAlert, AlertTriangle, EllipsisVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter, useParams } from "next/navigation"
import DashboardDetails from "./dashboard-details"
import { DataTable } from "./data-table"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"

export default function BookingContent() {
  const router = useRouter()
  const params = useParams()
  const providerId = params.id


  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-orange-600 bg-orange-50"
      case "Completed":
        return "text-green-600 bg-green-50"
      case "Cancelled":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="p-7">
      {/* Stats Section */}
        {/* Search and Filter */}
      <DashboardDetails stats={stats} />
      {/* Filter and Status */}


      {/* Bookings Table */}
      <DataTable
        data={bookings}
        columns={columns}
        searchField="customer_name"
        className="mt-6" />
    </div>
  )
}
