"use client"

import { useTranslations, useLocale } from "next-intl"
import { Upload } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function EditUserDrawer({ user, isOpen, onClose, onSave }) {
  const t = useTranslations("EditUserDrawer")
  const locale = useLocale()
  const direction = locale === "ar" ? "rtl" : "ltr"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    status: "Active",
    avatar: "",
  })

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

  const getDateRange = () => {
    const today = new Date()
    const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
    const maxDate = new Date(today.getFullYear() - 7, today.getMonth(), today.getDate())

    const formatDate = (date) =>
      `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}`

    return { min: formatDate(minDate), max: formatDate(maxDate) }
  }

  const { min, max } = getDateRange()

  const formatDateForInput = (dateString) => {
    if (!dateString) return ""
    try {
      const [month, day, year] = dateString.split("/")
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    } catch (error) {
      return dateString
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[320px] sm:w-[380px] overflow-y-auto">
        <div dir={direction} className="space-y-5">
          <SheetHeader className="pb-4 space-y-1">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-base">{t("title")}</SheetTitle>
            </div>
            <p className={`text-xs text-muted-foreground ${direction==="rtl"?'text-right':'text-left'}`}>{t("subtitle")}</p>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            {/* Customer Details */}
            <div>
              <h3 className={`text-xs uppercase text-muted-foreground tracking-wider mb-3 ${direction==="rtl"?'text-right':'text-left'}`}>
                {t("sections.customer")}
              </h3>

              <div className="flex justify-between items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={formData.avatar || "/placeholder.svg"} alt={formData.name} />
                  <AvatarFallback>{formData.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs h-8 px-3">
                    <Upload className="h-3 w-3 mr-1" />
                    {t("upload")}
                  </Button>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "w-fit text-xs",
                      formData.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    )}
                  >
                    {t(`status.${formData.status.toLowerCase()}`)}
                  </Badge>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-xs">
                    {t("form.name")}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t("form.namePlaceholder")}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="dob" className="text-xs">
                    {t("form.dob")}
                  </Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    min={min}
                    max={max}
                    value={formatDateForInput(formData.dob)}
                    onChange={(e) => {
                      const date = new Date(e.target.value)
                      const formatted = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
                        .getDate()
                        .toString()
                        .padStart(2, "0")}/${date.getFullYear()}`
                      handleInputChange({ target: { name: "dob", value: formatted } })
                    }}
                    className={`h-9 text-sm ${direction === "rtl" ? "justify-end" : "justify-start"}`}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="gender" className="text-xs">
                    {t("form.gender")}
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                    dir={direction === "rtl" ? "rtl" : "ltr"}
                  >
                    <SelectTrigger id="gender" className="h-9 text-sm">
                      <SelectValue placeholder={t("form.genderPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Man">{t("genders.man")}</SelectItem>
                      <SelectItem value="Woman">{t("genders.woman")}</SelectItem>
                      <SelectItem value="Trans/Non-binary">{t("genders.trans")}</SelectItem>
                      <SelectItem value="Other">{t("genders.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="my-1" />

            {/* Contact Details */}
            <div>
              <h3 className="text-xs uppercase text-muted-foreground tracking-wider mb-3">
                {t("sections.contact")}
              </h3>

              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs">
                    {t("form.email")}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("form.emailPlaceholder")}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="phone" className="text-xs">
                    {t("form.phone")}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder={t("form.phonePlaceholder")}
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            </div>

            <SheetFooter className="mt-6 flex-col gap-2 sm:flex-row">
              <Button variant="outline" type="button" onClick={onClose} className="h-9 text-sm">
                {t("actions.cancel")}
              </Button>
              <Button type="submit" className="h-9 text-sm">
                {t("actions.save")}
              </Button>
            </SheetFooter>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
