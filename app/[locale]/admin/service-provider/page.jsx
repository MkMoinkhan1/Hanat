"use client"

import { useEffect, useState } from "react"
import { Edit, Trash, MoreHorizontal, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/data-table"
import { useParams, useRouter } from "next/navigation"
import serviceIcon from "@/public/images/Service-Provider-Icon.png"
import Image from "next/image"
import { useServiceProvidersStore } from "@/store/editStore"
import { useTranslations } from "next-intl"
const serviceProviders = [
  {
    id: 1,
    name: "Acme Co.",
    phone: "(252) 555-0126",
    area: "Great Falls, Maryland",
    employee: 2,
    services: "Service name",
    add_services:"Service name",
    serviceCount: "+3",
    rating: 3,
    status: "Active",
    // serviceProviders:
  },
  {
    id: 2,
    name: "Barone LLC.",
    phone: "(629) 555-0129",
    area: "Syracuse, Connecticut",
    employee: 5,
    services: "Service name",
    add_services:"Service name",
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
    add_services:"Service name",
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
    add_services:"Service name",
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
    add_services:"Service name",
    serviceCount: "",
    rating: 5,
    status: "Active",
  },
]

export default function ServiceProviderPage() {
  const {locale}  = useParams()
  console.log("Locale:", locale)
  const t = useTranslations("ServiceProvider")
  const td = useTranslations("ServiceProvider.Table")
    const {items , setItems , editItem , removeItem } = useServiceProvidersStore()
    useEffect(()=>{
      setItems(serviceProviders)
    },[])
  const router = useRouter()

  // Handle edit user
  const handleEditUser = (user) => {
    router.push(`/${locale}/admin/service-provider/${user.id}`)
  }
const handleRemoveItem = (id) => {
  removeItem(id)
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
      header: td("service_provider"),
      accessorKey: "name",
    },
    {
      header: td("mobile_number"),
      accessorKey: "phone",
    },
    {
      header: td("service_area"),
      accessorKey: "area",
    },
    {
      header: td("employee"),
      accessorKey: "employee",
      cell: (row) => (
        <Badge variant="outline" className="bg-orange-50 text-orange-700">
          {row.employee}
        </Badge>
      ),
    },
    {
      header: td("services"),
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
      header: td("additional_services"),
      accessorKey: "add_services",
      cell: (row) => (
        <div className="flex items-center justify-center gap-1">
          <span className="text-blue-600">{row.services}</span>
          
        </div>
      ),
    },
    {
      header: td("avg_rating"),
      accessorKey: "rating",
      cell: (row) => renderRating(row.rating),
    },
    {
      header: td("status"),
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
      header: td("action"),
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
                      <DropdownMenuItem onClick={() => handleEditUser(row)}>
                        <Edit className="h-4 w-4 mr-2" />
                        {t('Table.edit_user')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRemoveItem(row)}>
                        <Trash className="h-4 w-4 mr-2" />
                        {t('Table.delete_user')}
                      </DropdownMenuItem>
                      
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
                             <h1 className="2xl:text-lg text-sm font-semibold">{t('title')}</h1>
                             <p className="text-xs text-muted-foreground">
                               {t('about')}
                             </p>
                           </div>
                         </div>
       
        <DataTable
          data={items}
          columns={columns}
          searchField="name"
          itemsPerPageOptions={[5, 10, 15, 20]}
          defaultItemsPerPage={5}
           selectFilterItems={["All","Active", "Inactive"]}
        />
      </div>
    </div>
  )
}
