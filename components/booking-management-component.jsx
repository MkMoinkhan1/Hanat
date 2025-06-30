"use client"
import DashboardDetails from "./dashboard-details"
import { DataTable } from "./data-table"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { AlertTriangle, ArrowLeft, CircleAlert, CircleCheck, EllipsisVertical, Eye, MoreVertical } from "lucide-react"
import BookingIcon from "@/public/images/Booking_management-Icon.png"
import Image from "next/image"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
const BookingManagementComponent = () => {
  const t = useTranslations("BookingManagement")
  const router = useRouter()
  const path = usePathname()
  
       const columns = [
    {
      header: t("bookingID"),
      accessorKey: "id",
    },
    {
      header: t("type"),
      accessorKey: "type",
    },
    {
      header: t('customerName'),
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
      header: t("serviceProvider"),
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
      header: t("bookingDate"),
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
                      <DropdownMenuItem className="2xl:text-sm text-xs" onClick={()=>router.push(`${path}/${row.id}`)}>
                        <Eye className="h-4 w-4 mr-2" />
                        {t('view')}
                      </DropdownMenuItem >
                      <DropdownMenuItem className="2xl:text-sm text-xs">
                        {t('cancelBooking')}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="2xl:text-sm text-xs">
                        {t('rescheduleBooking')}
                      </DropdownMenuItem>
                      
                    </DropdownMenuContent>
                  </DropdownMenu>
        </div>
      ),
    },
  ]

  const stats = [
    {
      label: t("totalBookings"),
      value: "1200",
      change: "+12",
      note:t("vsLastWeek"),
      changeType: "positive",
    },
    {
      label: t('totalRevenue'),
      value: "$45,904",
      change: "+8%",
      note:t("vsLastWeek"),
      changeType: "negative",
    },
    {
      label: t('providerRevenue'),
      value: "$145,674",
      change: "+12%",
      note:t("vsLastWeek"),
      changeType: "negative",
    },
    {
      label: t('commission'),
      value: "$1200",
      change: "+12%",
      note:t("vsLastWeek"),
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

  return (
       <div className="p-7 space-y-6">
        <div className="flex gap-4">
           {/* <Link href="/admin/dashboard" className="text-muted-foreground">
                <ArrowLeft className="h-8 w-8 border p-2 rounded-full " />
              </Link> */}
                    <Image src={BookingIcon} className="2xl:h-12 h-10 w-10 2xl:w-12 border border-r-2 rounded-full p-2" alt="User Icon" />
                    <div>
                      <h1 className="2xl:text-lg text-sm font-semibold">{t('title')}</h1>
                      <p className="text-xs text-muted-foreground">
                        {t('description')}
                      </p>
                    </div>
                  </div>
      <DashboardDetails stats={stats} />
      <DataTable
        data={bookings}
        columns={columns}
        searchField="customer.name"
        monthlyFilter={["Daily","Weekly","Monthly","Yearly"]}
        className="mt-6" />
    </div>
  )
}

export default BookingManagementComponent