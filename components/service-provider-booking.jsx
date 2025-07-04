"use client"

import { Search, Filter, ChevronDown, CircleCheck, CircleAlert, AlertTriangle, EllipsisVertical, MoreVertical, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter, useParams } from "next/navigation"
import DashboardDetails from "./dashboard-details"
import { DataTable } from "./data-table"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useTranslations } from "next-intl"

export default function BookingContent({params}) {
  const t = useTranslations("ServiceProvider.Booking")
  const router = useRouter()
  const {locale,id } = params
 const columns = [
    {
      header: t("booking_id"),
      accessorKey: "id",
    },
    {
      header: t("type"),
      accessorKey: "type",
    },
    {
      header: t("customer_name"),
      accessorKey: "customer",
       cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.customer.avatar || "/placeholder.svg"} alt={row.customer.name} />
            <AvatarFallback>{row.customer.name}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{row.customer.name}</span>
        </div>
      ),
    },
    {
      header: t("service"),
      accessorKey: "service",
    },
    {
      header: t("service_provider"),
      accessorKey: "service_provider",
       cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.service_provider.avatar || "/placeholder.svg"} alt={row.service_provider.name} />
            <AvatarFallback>{row.service_provider.name}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{row.service_provider.name}</span>
        </div>
      ),
    },
      {
      header: t("booking_date"),
      accessorKey: "date",
    },
    {
      header: t("status"),
      accessorKey: "status",
      cell: (row) => (
            <Badge
                variant="outline"
                className="text-muted-foreground rounded-md gap-0.5 px-1.5 text-xs"
              >
                {row.status==="Completed" ? <CircleCheck className="fill-green-500 dark:fill-green-400 w-[13px] h-[13px] text-white" />: row.status==="Cancelled"? <CircleAlert className="fill-red-500 dark:fill-red-400 w-[13px] h-[13px] text-white" /> :  <AlertTriangle className="h-4 w-4 text-white fill-orange-500" /> }
                {row.status}
              </Badge>
      ),
    },
    {
      header: t("action"),
      accessorKey: "action",
      cell: (row) => (
         <div className="flex justify-center gap-2">
               <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only"></span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="2xl:text-sm text-xs" onClick={()=>router.push(`/${locale}/admin/service-provider/${id}/booking/${row.id}`)}>
                        <Eye className="h-4 w-4 mr-2" />
                        {t('view')}
                      </DropdownMenuItem >
                      <DropdownMenuItem className="2xl:text-sm text-xs">
                        {t("cancel_booking")}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="2xl:text-sm text-xs">
                        {t("reschedule_booking")}
                      </DropdownMenuItem>
                      
                    </DropdownMenuContent>
                  </DropdownMenu>
        </div>
      ),
    },
  ]

  const stats = [
    {
      label: t("Total Bookings"),
      value: "1200",
      change: "+12",
      note:t("vs last week"),
      changeType: "positive",
    },
    {
      label: t("Total Revenue"),
      value: "$45,904",
      change: "+8%",
      note:t("vs last week"),
      changeType: "negative",
    },
    {
      label: t("Money generated by the provider"),
      value: "$145,674",
      change: "+12%",
      note:t("vs last week"),
      changeType: "negative",
    },
    {
      label: t("Commission earned by Hanat"),
      value: "$1200",
      change: "+12%",
      note:t("vs last week"),
      changeType: "positive",
    },
  ]

  const bookings = [
    {
      id: "ONE-Z2A3B4",
      type: "External",
      customer: { name: "Robert Fox", avatar: "/placeholder.svg?height=32&width=32" },
      service: "Personal Chef",
      service_provider: { name: "Acme Co.", avatar: "/placeholder.svg?height=32&width=32" },
      date: "Feb 2, 2024",
      status: "Pending",
    },
    {
      id: "ONE-Q3R4S5",
      type: "Hanat",
      customer: { name: "Barone LLC.", avatar: "/placeholder.svg?height=32&width=32" },
      service: "Car Cleaning",
      service_provider: { name: "Jane Cooper", avatar: "/placeholder.svg?height=32&width=32" },
      date: "Dec 30, 2024",
      status: "Completed",
    },
    {
      id: "ONE-7G8H9I",
      type: "Hanat",
      customer: { name: "Alstergo Ltd", avatar: "/placeholder.svg?height=32&width=32" },
      service: "Home Cleaning",
      service_provider: { name: "Devon Lane", avatar: "/placeholder.svg?height=32&width=32" },
      date: "Mar 20, 2024",
      status: "Cancelled",
    },
  ]

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
