"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"



export default function AddServiceDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add new service</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Upload */}
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-gray-400">📷</div>
            </div>
            <Button variant="outline" className="border-gray-300 text-gray-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload New
            </Button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type of Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrician">Electrician</SelectItem>
                  <SelectItem value="plumber">Plumber</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sub-category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type of sub category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wiring">Wiring</SelectItem>
                  <SelectItem value="repair">Repair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <Input placeholder="Enter Duration" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Area</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="los-angeles">Los Angeles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Charges</label>
              <Input placeholder="Enter Charges" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea placeholder="Enter Description" className="min-h-[80px]" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="bg-gray-900 text-white">Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
