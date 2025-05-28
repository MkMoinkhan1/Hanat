"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Ticket, Eye, Trash2, Filter } from "lucide-react"

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
          <header className="border-b p-6">
            <div className="flex items-center gap-3 mb-4">
              <Ticket className="h-6 w-6" />
              <div>
                <h1 className="text-xl font-semibold">Tickets</h1>
                <p className="text-sm text-muted-foreground">Manage and track your Raised issues</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Input
                  placeholder="Search..."
                  className="pl-10"
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
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-center gap-4 p-6">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Ticket ID</div>
                      <div className="font-medium">ID: {ticket.id}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">By</span>
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={ticket.createdBy.avatar || "/placeholder.svg"}
                            alt={ticket.createdBy.name}
                          />
                          <AvatarFallback>{ticket.createdBy.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{ticket.createdBy.name}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Attached Booking Id</div>
                      <div className="font-medium">{ticket.bookingId}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Date</span>
                        <span className="text-sm">{ticket.date}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Status</div>
                      <div className="flex items-center gap-2">
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </div>
                        <span className="font-medium capitalize">{ticket.status}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Service Provider</div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className={`bg-${ticket.serviceProvider.color}-500 text-white`}>
                            {ticket.serviceProvider.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{ticket.serviceProvider.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm" className="h-8 gap-1" asChild>
                        <Link href={`/tickets/${ticket.id}`}>
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 gap-1 text-red-500 border-red-200">
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </Button>
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
