"use client";

import { Button } from "@/components/ui/button";
import { useRouter,useParams } from "next/navigation"
import { Star, Phone, Mail, ChevronLeft } from "lucide-react";
import RescheduleDialog from "@/components/reschedule-dialog"
import { useState } from "react";


export default function BookingDetailsContent({ bookingId }) {
    const router = useRouter()
    const params = useParams()
    console.log(bookingId)
      const [showRescheduleDialog, setShowRescheduleDialog] = useState(false)

  const handleViewInvoice = () => {
    router.push(`/service-provider/undefined/booking/${bookingId}/invoice/IDS-8263849`)
  }

  return (
    <div className="p-7">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-6 mb-4">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push(`/service-provider/${params.id}/booking`)}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
          <div>
            <p className="text-sm text-gray-500">Order Id</p>
            <h1 className="text-lg font-medium">{bookingId}</h1>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="border-r-2 pr-6">
            <p className="text-sm text-gray-500 mb-1">Order Type</p>
            <p className="font-medium">
              AC Repairing <span className="text-gray-500">(External)</span>
            </p>
          </div>
          <div className="border-r-2 pr-6">
            <p className="text-sm text-gray-500 mb-1">Order Type</p>
            <p className="font-medium">
              $220 <span className="text-gray-500">(Including tax)</span>
            </p>
          </div>
          <div className="border-r-2 pr-6">
            <p className="text-sm text-gray-500 mb-1">Booking Date and Time</p>
            <p className="font-medium">Feb 2, 2024 19:28</p>
          </div>
          <div className="border-r-2 pr-6">
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-orange-600 bg-orange-50">
              ⚠️ Pending
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-6 mt-6 mr-14">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 w-[258px]"
          >
            View Chats
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 w-[258px]"
            onClick={handleViewInvoice}
          >
            View Invoice
          </Button>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Customer Details */}
        <div>
          <h3 className="text-xs font-medium px-2 py-1 text-[#94A3B8] bg-[#F9FAFB] mb-4">
            CUSTOMER DETAILS
          </h3>
          <div className="space-y-4">
            <div className="flex ">
              <div className="flex items-center space-x-3">
                <img
                  src="/placeholder.svg?height=48&width=48"
                  alt="Courtney Henry"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium">Courtney Henry</h4>
                  <div className="flex gap-20">
                    <p className="text-sm text-gray-500">
                      debra.holt@example.com
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>(629) 555-0129</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-24">
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="text-sm">Syracuse, Connecticut</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Requested Service</p>
                <p className="text-sm">Electrician</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resource Details */}
        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-xs font-medium px-2 py-1 text-[#94A3B8] bg-[#F9FAFB] mb-4">
            RESOURCE DETAILS
          </h3>
          <div className="flex">
            <div className="w-[50%]">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Floyd Miles"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                    <h4 className="font-medium">Floyd Miles</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 3
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between text-sm text-gray-600">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Service</p>
                    <p className="text-sm">Electrician</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
                    <p className="text-sm">0000000000</p>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className=" border-gray-300 text-gray-700 m-auto"
               onClick={() => setShowRescheduleDialog(true)}
            >
               Reschedule this Booking
            </Button>
          </div>
        </div>
      </div>

      {/* Service Provider Details */}
      <div className="grid grid-cols-2 gap-8">
        <div className="mt-8">
          <h3 className="text-xs font-medium px-2 py-1 text-[#94A3B8] bg-[#F9FAFB] mb-4">
            SERVICE PROVIDER DETAILS
          </h3>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-red-500 text-xs font-bold">NF</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium">Cody Fisher</h4>
            </div>
          </div>
          <div className="flex items-center space-x-4 my-4 gap-20 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>debra.holt@example.com</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>(629) 555-0129</span>
            </div>
          </div>
        </div>
        {/* Issue/Tickets Details */}
        <div className="mt-8">
          <h3 className="text-xs font-medium px-2 py-1 text-[#94A3B8] bg-[#F9FAFB] mb-4">
            ISSUE/TICKETS DETAILS
          </h3>
          <p className="text-sm text-gray-600">Not Available</p>
        </div>
      </div>
       <RescheduleDialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog} />
    </div>
  );
}
