"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Ticket, Eye, Trash2, Filter, AlertTriangle } from "lucide-react"
import TicketIcon from "@/public/images/Ticket-Icon.png"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
// Sample ticket data
const tickets = [
  {
    id: "70668",
    bookingId: "lodan02816",
    status: "pending",
    createdBy: {
      name: "Jane Cooper",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JC",
    },
    date: "Feb 2, 2023 19:28",
    serviceProvider: {
      name: "Barone LLC.",
      color: "rose",
      initials: "B",
    },
  },
  {
    id: "43178",
    bookingId: "987jo087",
    status: "pending",
    createdBy: {
      name: "Brooklyn Simmons",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "BS",
    },
    date: "Dec 4, 2024 21:42",
    serviceProvider: {
      name: "Acme Co.",
      color: "gray",
      initials: "A",
    },
  },
  {
    id: "97174",
    bookingId: "oo908j786",
    status: "pending",
    createdBy: {
      name: "Eleanor Pena",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EP",
    },
    date: "Dec 30, 2024 05:18",
    serviceProvider: {
      name: "Abstergo Ltd",
      color: "blue",
      initials: "A",
    },
  },
]

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter tickets based on search query and status
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.includes(searchQuery) ||
      ticket.bookingId.includes(searchQuery) ||
      ticket.createdBy.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col h-full">
          <header className="border-b p-6 space-y-6">
               <div className="flex gap-4">
                                      <Image src={TicketIcon} className="2xl:h-12 h-10 w-10 2xl:w-12 border border-r-2 rounded-full p-2" alt="Service Icon" />
                                      <div>
                                        <h1 className="2xl:text-lg text-sm font-semibold">Tickets</h1>
                                        <p className="text-xs text-muted-foreground">
                                          Lorem ipsum management
                                        </p>
                                      </div>
                                    </div>
                  
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Input
                  placeholder="Search..."
                  className="pl-10 !w-[19rem] 2xl:text-sm !text-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="2xl:text-sm text-xs" >
                  <Filter className=" 2xl:h-4 2xl:w-4 w-2 h-2" />
                  Filter
                </Button>
              </div>
            </div>
          </header>
           <main className="flex-1 p-6">
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      {/* Left Content Area */}
                      <div className="flex-1">
                        {/* Top Row - Ticket ID, Attached Booking Id, Status */}
                        <div className="grid grid-cols-3 gap-8 mb-4">
                          {/* Ticket ID */}
                          <div>
                            <div className="2xl:text-sm text-xs font-medium text-gray-500 mb-1">Ticket ID</div>
                            <div className="text-base font-semibold text-gray-900">ID: {ticket.id}</div>
                          </div>

                          {/* Attached Booking Id */}
                          <div>
                            <div className="2xl:text-sm text-xs font-medium text-gray-500 mb-1">Attached Booking Id</div>
                            <div className="text-base font-semibold text-gray-900">{ticket.bookingId}</div>
                          </div>

                          {/* Status */}
                          <div>
                            <div className="2xl:text-sm text-xs font-medium text-gray-500 mb-1">Status</div>
                            <div className="flex items-center gap-2">
                            
                               <Badge variant="outline" className="mt-2 rounded-sm !px-1 text-muted-foreground 2xl:text-sm text-xs gap-1">
                                 <AlertTriangle className="h-4 w-4 text-white fill-orange-500" />
                                                       {ticket.status}
                                                     </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Row - Creator and Date, Service Provider */}
                        <div className="grid grid-cols-3 gap-8">
                          {/* Creator Info */}
                          <div className="flex items-center gap-2">
                            <span className="2xl:text-sm text-xs text-gray-500">By</span>
                            <Avatar className="h-5 w-5">
                              <AvatarImage
                                src={ticket.createdBy.avatar || "/placeholder.svg"}
                                alt={ticket.createdBy.name}
                              />
                              <AvatarFallback className="text-xs">{ticket.createdBy.initials}</AvatarFallback>
                            </Avatar>
                            <span className="2xl:text-sm text-xs text-gray-900">{ticket.createdBy.name}</span>
                          </div>

                          {/* Date */}
                          <div className="flex items-center gap-2">
                            <span className="2xl:text-sm text-xs text-gray-500">Date</span>
                            <span className="2xl:text-sm text-xs text-gray-900">{ticket.date}</span>
                          </div>

                          {/* Service Provider */}
                          {/* <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-gray-500 mb-1">Service Provider</div>
                            <div className="flex">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback
                                  className={`${ticket.serviceProvider.color} text-white text-xs font-medium`}
                                >
                                  {ticket.serviceProvider.initials}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-900">{ticket.serviceProvider.name}</span>
                            </div>
                          </div> */}
                           <div className="flex items-center gap-1">
                            <span className="2xl:text-sm text-xs text-gray-500">Service Provider</span>
                            <Avatar className="h-5 w-5">
                              <AvatarImage
                                src={ticket.createdBy.avatar || "/placeholder.svg"}
                                alt={ticket.createdBy.name}
                              />
                              <AvatarFallback  className={`${ticket.serviceProvider.color} text-white text-xs font-medium`}>{ticket.serviceProvider.initials}</AvatarFallback>
                            </Avatar>
                            <span className="2xl:text-sm text-xs text-gray-900">{ticket.serviceProvider.name}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Actions */}
                      <div className="flex items-center gap-2 ml-8">
                        <Button
                          className="h-9 px-4 bg-gray-900 hover:bg-gray-800 text-white 2xl:text-sm text-xs font-medium gap-2"
                          asChild
                        >
                          <Link href={`/tickets/${ticket.id}`}>
                            <Eye className="h-4 w-4" />
                            View
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-9 px-4 text-red-600 border-red-200 hover:bg-red-50 2xl:text-sm text-xs font-medium gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
