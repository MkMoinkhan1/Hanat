"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Calendar, Clock, User } from "lucide-react"

export default function RescheduleDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Reschedule this Booking</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Booking Info */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">AC Repairing</h3>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">(External)</span>
            </div>
            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-orange-600 bg-orange-50">
              ⚠️ Pending
            </span>
          </div>

          {/* Current Resource Details */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-3">CURRENT RESOURCE DETAILS</h4>
            <div className="flex items-center space-x-3 mb-4">
              <img src="/placeholder.svg?height=48&width=48" alt="Floyd Miles" className="w-12 h-12 rounded-full" />
              <div>
                <h5 className="font-medium">Floyd Miles</h5>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < 3 ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Service</p>
                <p className="font-medium">Electrician</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Mobile Number</p>
                <p className="font-medium">0000000000</p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Change Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Date of Service" className="pl-10 border-gray-300" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Block Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Time of Service" className="pl-10 border-gray-300" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Change Resource</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Select>
                  <SelectTrigger className="pl-10 border-gray-300">
                    <SelectValue placeholder="Select Resource" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="floyd-miles">Floyd Miles</SelectItem>
                    <SelectItem value="cody-fisher">Cody Fisher</SelectItem>
                    <SelectItem value="jenny-wilson">Jenny Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="flex-1 bg-gray-900 text-white">Reschedule</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
