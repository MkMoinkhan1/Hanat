"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Search, Filter, PenSquare, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useRouter } from "next/router"

// Sample service data
const services = [
  {
    id: "1",
    title: "Cleaning",
    description: "Concealed & Conduit Internal Wiring for a new connection",
    category: "Internet",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    title: "Wiring",
    description: "Concealed & Conduit Internal Wiring for a new connection",
    category: "Electrician",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "3",
    title: "Internet",
    description: "Concealed & Conduit Internal Wiring for a new connection",
    category: "Internet",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "4",
    title: "Home Cleaning",
    description: "Concealed & Conduit Internal Wiring for a new connection",
    category: "Cleaning",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function ServiceManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter services based on search query and status
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || service.category === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <div className="flex flex-col h-full">
          <header className="border-b p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="h-6 w-6" />
              <div>
                <h1 className="text-xl font-semibold">Service Management</h1>
                <p className="text-sm text-muted-foreground">Lorem ipsum management</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-[19rem]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Internet">Internet</SelectItem>
                    <SelectItem value="Electrician">Electrician</SelectItem>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" >
                  <Filter className="h-4 w-4" />
                    Filter
                </Button>

                  <Link href={"/service-management/add-service"}>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Service
                    </Button>
                  </Link>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="space-y-4">
              {filteredServices.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center">
                      <div className="h-[100px] w-[100px] flex-shrink-0 bg-gray-100 m-auto ml-3 rounded-lg">
                        <img
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          className="h-full w-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 p-4 items-center">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{service.title}</h3>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                        <Badge variant="outline" className="mt-2 rounded-sm bg-[#F4F4F4]">
                          {service.category}
                        </Badge>
                      </div>
                           <Link  href={`/service-management/edit-service/${service.id}`}>
                          <Button variant="secondary" size="sm">
                            <PenSquare className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                            </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
          <footer className="border-t p-4 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
              <span className="text-sm">Page 2 of 6</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.1584 3.13514C5.95694 3.32401 5.94673 3.64042 6.13559 3.84188L9.565 7.49991L6.13559 11.1579C5.94673 11.3594 5.95694 11.6758 6.1584 11.8647C6.35986 12.0535 6.67627 12.0433 6.86514 11.8419L10.6151 7.84188C10.7954 7.64955 10.7954 7.35027 10.6151 7.15794L6.86514 3.15794C6.67627 2.95648 6.35986 2.94628 6.1584 3.13514Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
