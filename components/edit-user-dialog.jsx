"use client"

import { useState, useEffect } from "react"
import { X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function EditUserDrawer({ user, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    status: "Active",
    avatar: "",
  })

  // Initialize form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: user.dob || "",
        gender: user.gender || "",
        status: user.status || "Active",
        avatar: user.avatar || "",
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...user, ...formData })
    onClose()
  }

  // Format date for input field (assuming dob is in format MM/DD/YYYY)
  const formatDateForInput = (dateString) => {
    if (!dateString) return ""

    try {
      const [month, day, year] = dateString.split("/")
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    } catch (error) {
      return dateString
    }
  }

  // Format date for display (from YYYY-MM-DD to DD-Month-YYYY)
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return ""

    try {
      const date = new Date(dateString)
      const options = { day: "2-digit", month: "long", year: "numeric" }
      return date.toLocaleDateString("en-US", options)
    } catch (error) {
      return dateString
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[320px] sm:w-[380px] overflow-y-auto" data="user">
        <SheetHeader className="pb-4 space-y-1">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-base">Edit User</SheetTitle>
          </div>
          <p className="text-xs text-muted-foreground">Manage your user details.</p>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Customer Details Section */}
          <div>
            <h3 className="text-xs uppercase text-muted-foreground tracking-wider mb-3">Customer Details</h3>

            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={formData.avatar || "/placeholder.svg"} alt={formData.name} />
                <AvatarFallback>{formData.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs h-8 px-3">
                  <Upload className="h-3 w-3 mr-1" />
                  Upload New
                </Button>

                <Badge
                  variant="outline"
                  className={cn(
                    "w-fit text-xs",
                    formData.status === "Active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700",
                  )}
                >
                  {formData.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="dob" className="text-xs">
                  Date of Birth
                </Label>
                <div className="relative">
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formatDateForInput(formData.dob)}
                    onChange={(e) => {
                      const date = new Date(e.target.value)
                      const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date.getFullYear()}`
                      handleInputChange({ target: { name: "dob", value: formattedDate } })
                    }}
                    className="w-full h-9 text-sm"
                  />
                  {formData.dob && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground text-xs">
                      {formatDateForDisplay(formatDateForInput(formData.dob))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="gender" className="text-xs">
                  Gender
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                  <SelectTrigger id="gender" className="h-9 text-sm">
                    <SelectValue placeholder="Male or Female" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Man">Man</SelectItem>
                    <SelectItem value="Woman">Woman</SelectItem>
                    <SelectItem value="Trans/Non-binary">Trans/Non-binary</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator className="my-1" />

          {/* Contact Details Section */}
          <div>
            <h3 className="text-xs uppercase text-muted-foreground tracking-wider mb-3">Contact Details</h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="text-xs">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="h-9 text-sm"
                />
              </div>
            </div>
          </div>

          <SheetFooter className="mt-6 flex-col gap-2 sm:flex-row">
            <Button variant="outline" type="button" onClick={onClose} className="h-9 text-sm">
              Cancel
            </Button>
            <Button type="submit" className="h-9 text-sm">
              Save Changes
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
