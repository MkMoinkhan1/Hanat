"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Trash2, MoreVertical, Edit, Trash, EyeIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRoleManagementStore } from "@/store/editStore";
import { DataTable } from "@/components/data-table";
import { useEffect } from "react";
import MainButton from "@/components/main_button";

// Sample role management data
const roleManagementData = [
  {
    id: 1,
    email: "shady@hanat.com",
    role: "Super Admin",
    name: "Devon Lane",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    email: "marshalmatthers123@hanat.com",
    role: "Admin",
    name: "Robert Fox",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    email: "shadyslim@hanat.com",
    role: "Bookings Admin",
    name: "Eleanor Pena",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    email: "shadymathers@hanat.com",
    role: "Service Manager",
    name: "Ronald Richards",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    email: "marshalshady03@hanat.com",
    role: "Other...",
    name: "Wade Warren",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

export default function RoleManagementPage() {
  const columns = [
    {
      header: "Email ID",
      accessorKey: "email",
    },
    {
      header: "Admin role",
      accessorKey: "role",
    },
    {
      header: "Admin name",
      accessorKey: "name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={row.avatar || "/placeholder.svg"}
              alt={row.name}
            />
            <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },

    {
      header: "Action",
      accessorKey: "action",
      cell: (row) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => alert("Ha dekh liya")}
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDeleteUser(row)}
          >
            <Trash className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
  const { items, setItems, removeItem } = useRoleManagementStore();
  useEffect(() => {
    setItems(roleManagementData);
  }, []);
  const handleDeleteUser = (user) => {
    removeItem(user.id);
  };
  return (
    <div className="p-6">
      <MainButton />
    <div className="2xl:p-6 p-4 mb-4 space-y-6">
      <DataTable
        data={items}
        columns={columns}
        management={"true"}
        searchField="name"
        itemsPerPageOptions={[5, 10, 15, 20]}
        defaultItemsPerPage={5}
      />
    </div>
    </div>
  );
}
