"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronRight, Edit, Trash, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/data-table"
import { EditUserDrawer } from "@/components/edit-user-dialog"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import UserIcon from "@/public/images/Users-Icon.png"
import Image from "next/image"
import { useUsersStore } from "@/store/editStore"
const initialData = [
    {
      id: 1,
      name: "Arlene McCoy",
      email: "nathan.roberts@example.com",
      phone: "(252) 555-0126",
      dob: "05/06/1993",
      gender: "Trans/Non-binary",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Dianne Russell",
      email: "debra.holt@example.com",
      phone: "(629) 555-0129",
      dob: "03/12/1990",
      gender: "Woman",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Courtney Henry",
      email: "jessica.hanson@example.com",
      phone: "(603) 555-0123",
      dob: "07/25/1985",
      gender: "Trans/Non-binary",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Devon Lane",
      email: "sara.cruz@example.com",
      phone: "(907) 555-0101",
      dob: "10/19/1984",
      gender: "Woman",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Robert Fox",
      email: "deanna.curtis@example.com",
      phone: "(505) 555-0125",
      dob: "12/03/1998",
      gender: "Man",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Eleanor Pena",
      email: "tim.jennings@example.com",
      phone: "(205) 555-0100",
      dob: "04/17/1976",
      gender: "Man",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      name: "Ronald Richards",
      email: "dolores.chambers@example.com",
      phone: "(704) 555-0127",
      dob: "01/27/1991",
      gender: "Woman",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      name: "Wade Warren",
      email: "alma.lawson@example.com",
      phone: "(208) 555-0112",
      dob: "11/08/1979",
      gender: "Man",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 9,
      name: "Jane Cooper",
      email: "jane.cooper@example.com",
      phone: "(219) 555-0114",
      dob: "04/15/1992",
      gender: "Woman",
      status: "Inactive",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 10,
      name: "Esther Howard",
      email: "esther.howard@example.com",
      phone: "(319) 555-0115",
      dob: "06/23/1994",
      gender: "Woman",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]
  
export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const {items , setItems , editItem , removeItem } = useUsersStore()
  useEffect(()=>{
    setItems(initialData)
  },[])
  const handleEditUser = (user) => {
    setSelectedUser(user)
    setIsDrawerOpen(true)
  }
  const handleDeleteUser = (user) => {
    removeItem(user.id)
  }
  const handleSaveUser = (updatedUser) => {
    editItem(updatedUser)
    toast({
      title: "User updated",
      description: `${updatedUser.name}'s information has been updated successfully.`,
    })
  }

  const columns = [
    {
      header: "Full name",
      accessorKey: "name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.avatar || "/placeholder.svg"} alt={row.name} />
            <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    {
      header: "Email Address",
      accessorKey: "email",
    },
    {
      header: "Mobile Number",
      accessorKey: "phone",
    },
    {
      header: "DOB",
      accessorKey: "dob",
    },
    {
      header: "Gender",
      accessorKey: "gender",
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
          <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(row)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col">
      <div className="2xl:p-6 p-4 mb-4 space-y-6">
           <div className="flex gap-4">
                    <Image src={UserIcon} className="2xl:h-12 h-10 w-10 2xl:w-12 border border-r-2 rounded-full p-2" alt="User Icon" />
                    <div>
                      <h1 className="2xl:text-lg text-sm font-semibold">Users</h1>
                      <p className="text-xs text-muted-foreground">
                        Lorem ipsum management
                      </p>
                    </div>
                  </div>

        <DataTable
          data={items}
          columns={columns}
          searchField="name"
          itemsPerPageOptions={[5, 10, 15, 20]}
          defaultItemsPerPage={5}
        />

        {/* Edit User Drawer */}
        <EditUserDrawer
          user={selectedUser}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onSave={handleSaveUser}
        />

        <Toaster />
      </div>
    </div>
  )
}
