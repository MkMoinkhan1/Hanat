"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Trash2, Filter, AlertTriangle } from "lucide-react"
import TicketIcon from "@/public/images/Ticket-Icon.png"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useTicketsStore } from "@/store/editStore"
import clsx from "clsx"
import { useParams } from "next/navigation"

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
  // ... more tickets
]

export default function TicketsComponent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { items, setItems, removeItem } = useTicketsStore()
  const t = useTranslations()
  const local = useLocale()
  const {locale} = useParams()
  const dir = local === "ar" ? "rtl" : "ltr"

  useEffect(() => {
    setItems(tickets)
  }, [])

  const filteredTickets = items.filter((ticket) => {
    const matchesSearch =
      ticket.id.includes(searchQuery) ||
      ticket.bookingId.includes(searchQuery) ||
      ticket.createdBy.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleRemoveItems = (id) => {
    removeItem(id)
  }

  return (
    <div dir={dir} className="flex h-screen">
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col h-full">
          <header className="p-6 space-y-6">
            <div className="flex gap-4 items-center">
              <Image src={TicketIcon} alt="Service Icon" className="2xl:h-12 h-10 w-10 2xl:w-12 border border-r-2 rounded-full p-2" />
              <div>
                <h1 className="2xl:text-lg text-sm font-semibold">{t("tickets")}</h1>
                <p className="text-xs text-muted-foreground">{t("description")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative">
                <Input
                  placeholder={t("search_placeholder")}
                  className={clsx("!w-[19rem] 2xl:text-sm !text-xs", dir === "rtl" ? "pr-10" : "pl-10")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={clsx("absolute h-4 w-4 top-1/2 -translate-y-1/2 text-muted-foreground", dir === "rtl" ? "right-3" : "left-3")}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>

              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder={t("all_status")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("all_status")}</SelectItem>
                    <SelectItem value="pending">{t("pending")}</SelectItem>
                    <SelectItem value="resolved">{t("resolved")}</SelectItem>
                    <SelectItem value="cancelled">{t("cancelled")}</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="2xl:text-sm text-xs">
                  <Filter className="2xl:h-4 2xl:w-4 w-2 h-2" />
                  {t("filter")}
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
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-3 gap-8 mb-4">
                          <div>
                            <div className="2xl:text-sm text-xs font-medium text-gray-500 mb-1">{t("ticket_id")}</div>
                            <div className="text-base font-semibold text-gray-900">ID: {ticket.id}</div>
                          </div>
                          <div>
                            <div className="2xl:text-sm text-xs font-medium text-gray-500 mb-1">{t("attached_booking_id")}</div>
                            <div className="text-base font-semibold text-gray-900">{ticket.bookingId}</div>
                          </div>
                          <div>
                            <div className="2xl:text-sm text-xs font-medium text-gray-500 mb-1">{t("status")}</div>
                            <Badge variant="outline" className="mt-2 rounded-sm !px-1 text-muted-foreground 2xl:text-sm text-xs gap-1">
                              <AlertTriangle className="h-4 w-4 text-white fill-orange-500" />
                              {t(ticket.status)}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-8">
                          <div className="flex items-center gap-2">
                            <span className="2xl:text-sm text-xs text-gray-500">{t("by")}</span>
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={ticket.createdBy.avatar} alt={ticket.createdBy.name} />
                              <AvatarFallback>{ticket.createdBy.initials}</AvatarFallback>
                            </Avatar>
                            <span className="2xl:text-sm text-xs text-gray-900">{ticket.createdBy.name}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="2xl:text-sm text-xs text-gray-500">{t("date")}</span>
                            <span className="2xl:text-sm text-xs text-gray-900">{ticket.date}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="2xl:text-sm text-xs text-gray-500">{t("service_provider")}</span>
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={ticket.createdBy.avatar} alt={ticket.createdBy.name} />
                              <AvatarFallback className={`${ticket.serviceProvider.color} text-white text-xs font-medium`}>
                                {ticket.serviceProvider.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="2xl:text-sm text-xs text-gray-900">{ticket.serviceProvider.name}</span>
                          </div>
                        </div>
                      </div>

                      <div className={clsx("flex items-center gap-2", dir === "rtl" ? "mr-8" : "ml-8")}>
                        <Button className="h-9 px-4 bg-gray-900 hover:bg-gray-800 text-white 2xl:text-sm text-xs font-medium gap-2" asChild>
                          <Link href={`/${locale}/admin/tickets/${ticket.id}`}>
                            <Eye className="h-4 w-4" />
                            {t("view")}
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-9 px-4 text-red-600 border-red-200 hover:bg-red-50 2xl:text-sm text-xs font-medium gap-2"
                          onClick={() => handleRemoveItems(ticket.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          {t("delete")}
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
