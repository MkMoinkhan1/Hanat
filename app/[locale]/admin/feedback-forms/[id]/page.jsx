"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Sample feedback data
const feedbackData = {
  f1a2b3c4: {
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
  g5h6i7j8: {
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
  k9l0m1n2: {
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
  o3p4q5r6: {
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
  s7t8u9v0: {
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
}

export default function FeedbackDetailPage({ params }) {
  const {locale} = params
  const feedback = feedbackData[params.id]

  if (!feedback) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/${locale}/admin/feedback-forms`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">Feedback not found</h1>
          </div>
          <p>The requested feedback form could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto">
        <header className="flex items-center gap-3 border-b p-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/${locale}/admin/feedback-forms`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Feedback Forms</h1>
            <p className="2xl:text-sm text-xs text-muted-foreground">Manage and track your Raised issues</p>
          </div>
        </header>
        <main className="p-6">
          <Card className="max-w-4xl mx-auto py-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <h3 className="2xl:text-sm text-xs font-medium text-muted-foreground mb-1">Form ID</h3>
                    <p className="text-lg font-semibold">{feedback.formId}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="2xl:text-sm text-xs font-medium text-muted-foreground mb-1">Issue</h3>
                    <p className="font-medium">{feedback.issue}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="2xl:text-sm text-xs font-medium text-muted-foreground mb-1">Avg. Rating</h3>
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={i < feedback.rating ? "currentColor" : "none"}
                          stroke={i < feedback.rating ? "none" : "currentColor"}
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="2xl:text-sm text-xs font-medium text-muted-foreground mb-1">Date</h3>
                    <p>{feedback.date}</p>
                  </div>
                </div>

                <div>
                  <div className="mb-6">
                    <h3 className="2xl:text-sm text-xs font-medium text-muted-foreground mb-1">Customer Name</h3>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={feedback.customer.avatar || "/placeholder.svg"}
                          alt={feedback.customer.name}
                        />
                        <AvatarFallback>{feedback.customer.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{feedback.customer.name}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="2xl:text-sm text-xs font-medium text-muted-foreground mb-1">Booking Details</h3>
                    <p className="font-medium">{feedback.bookingId}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="2xl:text-sm text-xs font-medium text-muted-foreground mb-2">Description</h3>
                <p className="2xl:text-sm text-xs leading-relaxed">{feedback.description}</p>
              </div>

              <div className="mt-8 flex justify-end gap-2">
                <Button variant="outline">Mark as Resolved</Button>
                <Button>Reply to Customer</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
