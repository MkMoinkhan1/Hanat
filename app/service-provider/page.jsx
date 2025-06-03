"use client"

import { useState } from "react"
import { Edit, Trash, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/data-table"
import { useRouter } from "next/navigation"
import serviceIcon from "@/public/images/Service-Provider-Icon.png"
import Image from "next/image"

export default function ServiceProviderPage() {
  const router = useRouter()
  // Mock data for service providers
  const serviceProviders = [
    {
      id: 1,
      name: "Acme Co.",
      phone: "(252) 555-0126",
      area: "Great Falls, Maryland",
      employee: 2,
      services: "Service name",
      serviceCount: "+3",
      rating: 3,
      status: "Active",
    },
    {
      id: 2,
      name: "Barone LLC.",
      phone: "(629) 555-0129",
      area: "Syracuse, Connecticut",
      employee: 5,
      services: "Service name",
      serviceCount: "+2",
      rating: 3,
      status: "Active",
    },
    {
      id: 3,
      name: "Abstergo Ltd",
      phone: "(603) 555-0123",
      area: "Pasadena, Oklahoma",
      employee: 6,
      services: "Service name",
      serviceCount: "+3",
      rating: 3,
      status: "Active",
    },
    {
      id: 4,
      name: "Biffco Enterprises Ltd.",
      phone: "(907) 555-0101",
      area: "Corona, Michigan",
      employee: 4,
      services: "Service name",
      serviceCount: "+2",
      rating: 3,
      status: "Active",
    },
    {
      id: 5,
      name: "Binford Ltd.",
      phone: "(505) 555-0125",
      area: "Lansing, Illinois",
      employee: 1,
      services: "Service name",
      serviceCount: "",
      rating: 5,
      status: "Active",
    },
  ]

  // Handle edit user
  const handleEditUser = (user) => {
    router.push(`/service-provider/${user.id}`)
  }

  // Render star rating
  const renderRating = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  const columns = [
    {
      header: "",
      accessorKey: "checkbox",
      width: "40px",
      cell: () => <Checkbox />,
    },
    {
      header: "Service Provider",
      accessorKey: "name",
    },
    {
      header: "Mobile Number",
      accessorKey: "phone",
    },
    {
      header: "Service Area",
      accessorKey: "area",
    },
    {
      header: "Employee",
      accessorKey: "employee",
      cell: (row) => (
        <Badge variant="outline" className="bg-orange-50 text-orange-700">
          {row.employee}
        </Badge>
      ),
    },
    {
      header: "Services",
      accessorKey: "services",
      cell: (row) => (
        <div className="flex items-center gap-1">
          <span className="text-blue-600">{row.services}</span>
          {row.serviceCount && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {row.serviceCount}
            </Badge>
          )}
        </div>
      ),
    },
    {
      header: "Avg Rating",
      accessorKey: "rating",
      cell: (row) => renderRating(row.rating),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <Badge
          variant="outline"
          className={row.status === "Active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (row) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleEditUser(row)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEditUser(row)}>Edit User</DropdownMenuItem>
              <DropdownMenuItem>Suspend User</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col">
      <div className="2xl:p-6 p-4 space-y-6">
               <div className="flex gap-4">
                           <Image src={serviceIcon} className="2xl:h-12 h-10 w-10 2xl:w-12 border border-r-2 rounded-full p-2" alt="Service Icon" />
                           <div>
                             <h1 className="2xl:text-lg text-sm font-semibold">Service Provider</h1>
                             <p className="text-xs text-muted-foreground">
                               Lorem ipsum management
                             </p>
                           </div>
                         </div>
       
        <DataTable
          data={serviceProviders}
          columns={columns}
          searchField="name"
          itemsPerPageOptions={[5, 10, 15, 20]}
          defaultItemsPerPage={5}
        />
      </div>
    </div>
  )
}
