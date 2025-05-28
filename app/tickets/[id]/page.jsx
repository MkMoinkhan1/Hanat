"use client"

import  React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, Trash2, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Current user info
const currentUser = {
  id: "current-user",
  name: "Slim Shady",
  avatar: "/placeholder.svg?height=40&width=40",
  initials: "SS",
}

// Sample ticket data
const ticketData = {
  id: "70668",
  date: "Feb 2, 2023 19:28",
  status: "pending",
  bookingId: "lodan02816",
  assignedTo: {
    name: "Jane Cooper",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JC",
  },
  serviceProvider: {
    name: "Barone LLC.",
    color: "rose",
    initials: "B",
  },
  messages: [
    {
      id: "1",
      sender: {
        id: "leslie",
        name: "Leslie Alexander",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "LA",
      },
      timestamp: "Wednesday, March 29, 2023 - 12:41 pm",
      content:
        'My current closing bank balance in "Cash & cash equivalents" is showing a correct amount according to the bank statement which is Rs. 20,800.06. But, at the bottom, it shows "Net Loss + Rs. 10,140.58". Can you please help and clear me over this difference.',
    },
    {
      id: "2",
      sender: {
        id: "bessie",
        name: "Bessie Cooper",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "BC",
      },
      timestamp: "Thursday, March 30, 2023 - 03:11 pm",
      content:
        'My current closing bank balance in "Cash & cash equivalents" is showing a correct amount according to the bank statement which is Rs. 20,800.06. But, at the bottom, it shows "Net Loss + Rs. 10,140.58". Can you please help and clear me over this difference.',
    },
  ],
}

export default function TicketDetailPage({ params }) {
  const [messages, setMessages] = useState(ticketData.messages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const adjustHeight = () => {
      textarea.style.height = "40px"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }

    textarea.addEventListener("input", adjustHeight)
    return () => textarea.removeEventListener("input", adjustHeight)
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const now = new Date()
    const formattedDate = now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    const formattedTime = now
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase()

    const timestamp = `${formattedDate} - ${formattedTime}`

    const newMessageObj = {
      id: `${messages.length + 1}`,
      sender: currentUser,
      timestamp,
      content: newMessage,
    }

    setMessages([...messages, newMessageObj])
    setNewMessage("")

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px"
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const isCurrentUser = (senderId) => {
    return senderId === currentUser.id
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col border-r">
          <header className="flex items-center gap-3 border-b p-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/tickets">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Tickets</h1>
              <p className="text-sm text-muted-foreground">Manage and track your Raised issues</p>
            </div>
          </header>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {messages.map((message) => {
                const isOwn = isCurrentUser(message.sender.id)
                return (
                  <div key={message.id} className={cn("flex gap-3", isOwn && "flex-row-reverse")}>
                    <Avatar className="h-10 w-10 mt-0.5 flex-shrink-0">
                      <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
                      <AvatarFallback>{message.sender.initials}</AvatarFallback>
                    </Avatar>
                    <div className={cn("max-w-[75%]", isOwn ? "items-end" : "items-start")}>
                      <div className={cn("flex items-center gap-2", isOwn && "flex-row-reverse")}>
                        <h3 className="font-medium">{message.sender.name}</h3>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <div
                        className={cn(
                          "mt-1 inline-block rounded-lg p-3 text-sm leading-relaxed",
                          isOwn ? "bg-gray-100 text-gray-900" : "bg-gray-50 text-gray-900",
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <div className="relative flex-1">
                <textarea
                  ref={textareaRef}
                  className="min-h-10 w-full resize-none rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Add your comment..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  style={{ height: "40px" }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={handleSendMessage}
                  disabled={newMessage.trim() === ""}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[300px] border-l">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Ticket ID</div>
              <Button variant="outline" size="sm" className="h-8 text-red-500 border-red-200">
                <Trash2 className="mr-1 h-3.5 w-3.5" />
                Delete
              </Button>
            </div>
            <div className="mt-1 font-medium">ID: {ticketData.id}</div>

            <div className="mt-4 text-sm font-medium text-muted-foreground">Date</div>
            <div className="mt-1 font-medium">{ticketData.date}</div>

            <div className="mt-4 flex items-center gap-2">
              <div className="text-sm font-medium text-muted-foreground">Status</div>
              <div className="flex items-center gap-1.5">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </div>
                <span className="text-sm font-medium capitalize">Pending</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="text-sm font-medium text-muted-foreground">Attached Booking Id</div>
            <div className="mt-1 font-medium">{ticketData.bookingId}</div>
            <Button variant="ghost" size="sm" className="mt-2 h-8 w-full justify-start gap-1.5 px-2">
              <Eye className="h-3.5 w-3.5" />
              View
            </Button>

            <Separator className="my-4" />

            <div className="text-sm font-medium text-muted-foreground">By</div>
            <div className="mt-2 flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={ticketData.assignedTo.avatar || "/placeholder.svg"}
                  alt={ticketData.assignedTo.name}
                />
                <AvatarFallback>{ticketData.assignedTo.initials}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{ticketData.assignedTo.name}</span>
            </div>
            <Button variant="ghost" size="sm" className="mt-2 h-8 w-full justify-start gap-1.5 px-2">
              <Eye className="h-3.5 w-3.5" />
              View
            </Button>

            <Separator className="my-4" />

            <div className="text-sm font-medium text-muted-foreground">Service Provider</div>
            <div className="mt-2 flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-rose-500 text-white">
                  {ticketData.serviceProvider.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{ticketData.serviceProvider.name}</span>
            </div>
            <Button variant="ghost" size="sm" className="mt-2 h-8 w-full justify-start gap-1.5 px-2">
              <Eye className="h-3.5 w-3.5" />
              View
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
