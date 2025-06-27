"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditIcon from "@/public/images/Edit-icon.png";
import { DataTable } from "./data-table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { useResourcesStore } from "@/store/editStore";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
const serviceProviders = [
  {
    id: 1,
    name: "Robert Fox",
    service: "Personal Chef",
    phone: "9876543210",
    rating: 3,
    status: "Active",
  },
  {
    id: 2,
    name: "Eleanor Pena",
    service: "Car Cleaning",
    phone: "9876543210",
    rating: 3,
    status: "Active",
  },
  {
    id: 3,
    name: "Wade Warren",
    service: "Car Cleaning",
    phone: "9876543210",
    rating: 3,
    status: "Active",
  },
];
const renderRating = (rating) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};
export default function ResourcesContent() {
  const t = useTranslations("ServiceProvider.resourceTable");
  const columns = [
    {
      header: t("name"),
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
      header: t("service"),
      accessorKey: "service",
    },
    {
      header: t("phone"),
      accessorKey: "phone",
    },
    {
      header: t("rating"),
      accessorKey: "rating",
      cell: (row) => renderRating(row.rating),
    },
    {
      header: t("status"),
      accessorKey: "status",
      cell: (row) => (
        <Badge
          variant="outline"
          className={
            row.status === "Active"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: t("action"),
      accessorKey: "action",
      cell: (row) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleEditUser(row)}
          >
            <Image
              src={EditIcon}
              className="h-4 w-4 filter contrast-50 "
              alt="edit icon"
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleDeleteUser(row)}
          >
            <Trash2 className="h-4 w-4 text-gray-400 " />
          </Button>
        </div>
      ),
    },
  ];
  const { items, setItems, removeItem } = useResourcesStore();

  const handleEditUser = (user) => {
    console.log("Edit user:", user);
  };
  const handleDeleteUser = (user) => {
    removeItem(user.id);
  };
  useEffect(() => {
    setItems(serviceProviders);
  }, []);
  return (
    <div className="p-4">
      <DataTable
        data={items}
        columns={columns}
        searchField="name"
        itemsPerPageOptions={[5, 10, 15, 20]}
        defaultItemsPerPage={5}
      />
    </div>
  );
}
