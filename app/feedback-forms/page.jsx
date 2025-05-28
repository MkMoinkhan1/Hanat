"use client"

import { useState } from "react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FileText, Eye, Trash2, MoreVertical, Trash, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/data-table"

// Sample feedback data
const feedbackData = [
  {
    id: "f1a2b3c4",
    formId: "(252) 555-0126",
    issue: "New Service Request",
    customer: {
      name: "Devon Lane",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DL",
    },
    rating: 3,
    bookingId: "lodan02816",
    date: "19-feb-2023",
    description: "Hi! I'm looking for a deep cleaning service for my 2BHK apartment this weekend. Do you offer that?",
  },
  {
    id: "g5h6i7j8",
    formId: "(629) 555-0129",
    issue: "Service Provider Didn't Show Up",
    customer: {
      name: "Robert Fox",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RF",
    },
    rating: 3,
    bookingId: "kj78d0123",
    date: "15-feb-2023",
    description: "The service provider didn't show up at the scheduled time. I waited for 2 hours but no one came.",
  },
  {
    id: "k9l0m1n2",
    formId: "(603) 555-0123",
    issue: "Issues with Service Quality",
    customer: {
      name: "Eleanor Pena",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EP",
    },
    rating: 3,
    bookingId: "pl90j4567",
    date: "12-feb-2023",
    description:
      "The cleaning service was not up to the mark. Several areas were left untouched and the bathroom wasn't properly cleaned.",
  },
  {
    id: "o3p4q5r6",
    formId: "(907) 555-0101",
    issue: "Booking Was Cancelled Unexpectedly",
    customer: {
      name: "Ronald Richards",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RR",
    },
    rating: 3,
    bookingId: "mn56k7890",
    date: "10-feb-2023",
    description:
      "My booking was cancelled without any prior notice or explanation. This caused a lot of inconvenience.",
  },
  {
    id: "s7t8u9v0",
    formId: "(505) 555-0125",
    issue: "Other...",
    customer: {
      name: "Wade Warren",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "WW",
    },
    rating: 3,
    bookingId: "qr34s5678",
    date: "08-feb-2023",
    description:
      "I have a suggestion to improve your service. It would be great if you could provide an estimated time of arrival for the service provider.",
  },
]
const columns = [
     {
      header: "",
      accessorKey: "checkbox",
      width: "40px",
      cell: () => <Checkbox />,
    },
     {
      header: "Form ID",
      accessorKey: "formId",
    },
     {
      header: "Issue",
      accessorKey: "issue",
    },
     {
      header: "Customer name",
      accessorKey: "customer.name",
      cell: (row) => 
        (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.customer.avatar || "/placeholder.svg"} alt={row.customer.name} />
            <AvatarFallback>{row.customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{row.customer.name}</span>
        </div>
      )
    },  {
      header: "Action",
      accessorKey: "action",
      cell: (row) =>
        (
        <div className="flex justify-start gap-2">
          <Button variant="ghost" size="icon" asChild>
                      <Link href={`/feedback-forms/${row.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
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
      )
    },
]

export default function FeedbackFormsPage() {
  const [selectedFeedbacks, setSelectedFeedbacks] = useState([])

  const toggleFeedback = (id) => {
    setSelectedFeedbacks((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    if (selectedFeedbacks.length === feedbackData.length) {
      setSelectedFeedbacks([])
    } else {
      setSelectedFeedbacks(feedbackData.map((feedback) => feedback.id))
    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col h-full">
          <header className="border-b p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6" />
              <div>
                <h1 className="text-xl font-semibold">Feedback Forms</h1>
                <p className="text-sm text-muted-foreground">Manage and track your Raised issues</p>
              </div>
            </div>
          </header>
          <main className="flex-1">
        <DataTable
                 data={feedbackData}
                 columns={columns}
                 searchField="name"
                 itemsPerPageOptions={[5, 10, 15, 20]}
                 defaultItemsPerPage={5}
               />
          </main>
        </div>
      </div>
    </div>
  )
}
