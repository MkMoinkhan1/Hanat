"use client"

import { Button } from "@/components/ui/button"
import { Star, Phone, Mail, ChevronLeft } from "lucide-react"
import RescheduleDialog from "@/components/reschedule-dialog"
import { useState } from "react"
import Image from "next/image"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

export default function BookingDetailsContent() {
  const router = useRouter()
  const path = usePathname()
  const { locale, bookingId } = useParams()
  const direction = locale === "ar" ? "rtl" : "ltr"
  const t = useTranslations("ServiceProvider.BookingDetailsContent")
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false)

  const handleViewInvoice = () => {
    router.push(`${path}/invoice`)
  }

  return (
    <div className="p-7">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-6 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => router.push(`/${locale}/admin/service-provider/${bookingId}`)}
          >
            {
              direction === "rtl" ? (
                <ChevronLeft className="h-4 w-4 transform rotate-180" />  ):  (<ChevronLeft className="h-4 w-4" />)
            }
          
          </Button>
          <div>
            <p className="2xl:text-sm text-xs text-gray-500">{t("order_id")}</p>
            <h1 className="2xl:text-lg text-sm font-medium">{bookingId}</h1>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mt-8">
          <div className="border-r-2 pr-6">
            <p className="text-xs text-gray-500 mb-1">{t("order_type")}</p>
            <p className="font-medium text-sm">
              AC Repairing <span className="text-gray-500">(External)</span>
            </p>
          </div>
          <div className="border-r-2 pr-6">
            <p className="text-xs text-gray-500 mb-1">{t("order_type")}</p>
            <p className="font-medium text-sm">
              $220 <span className="text-gray-500">({t("including_tax")})</span>
            </p>
          </div>
          <div className="border-r-2 pr-6">
            <p className="text-xs text-gray-500 mb-1">{t("booking_date")}</p>
            <p className="font-medium text-sm">Feb 2, 2024 19:28</p>
          </div>
          <div className="border-r-2 pr-6">
            <p className="text-xs text-gray-500 mb-1">{t("status")}</p>
            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-orange-600 bg-orange-50">
              {t("pending")}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-6 mt-6 mr-14">
          <Button variant="outline" className="border-gray-300 text-gray-700 w-[220px]">
            {t("view_chats")}
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 w-[220px]"
            onClick={handleViewInvoice}
          >
            {t("view_invoice")}
          </Button>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-xs font-medium px-2 py-1 text-[#94A3B8] bg-[#F9FAFB] mb-4">
            {t("customer_details")}
          </h3>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex items-center space-x-3">
                <Image
                  width={48}
                  height={48}
                  src="/placeholder.svg"
                  alt="Customer"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-xs">Courtney Henry</h4>
                  <div className="flex gap-20">
                    <p className="text-xs text-gray-500">debra.holt@example.com</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>(629) 555-0129</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-24">
              <div>
                <p className="text-xs text-gray-500 mb-1">{t("location")}</p>
                <p className="text-xs">Syracuse, Connecticut</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">{t("requested_service")}</p>
                <p className="text-xs">Electrician</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resource Details */}
        <div className="flex flex-col w-full">
          <h3 className="text-xs font-medium px-2 py-1 text-[#94A3B8] bg-[#F9FAFB] mb-4">
            {t("resource_details")}
          </h3>
          <div className="flex">
            <div className="w-[50%]">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Image
                    width={48}
                    height={48}
                    src="/placeholder.svg"
                    alt="Resource"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium text-xs">Floyd Miles</div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 3 ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{t("service")}</p>
                    <p>Electrician</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{t("mobile_number")}</p>
                    <p>0000000000</p>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 m-auto"
              onClick={() => setShowRescheduleDialog(true)}
            >
              {t("reschedule")}
            </Button>
          </div>
        </div>
      </div>

      {/* Service Provider & Issue Details */}
      <div className="grid grid-cols-2 gap-8">
        <div className="mt-8">
          <h3 className="text-xs font-medium px-2 py-1 text-[#94A3B8] bg-[#F9FAFB] mb-4">
            {t("service_provider_details")}
          </h3>
          <div className="flex items-center space-x-3 gap-2">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-red-500 text-xs font-bold">NF</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-xs">Cody Fisher</h4>
            </div>
          </div>
          <div className="flex items-center space-x-4 my-4 gap-20 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>debra.holt@example.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>(629) 555-0129</span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xs font-medium px-2 py-1 text-[#94A3B8] bg-[#F9FAFB] mb-4">
            {t("issue_details")}
          </h3>
          <p className="text-xs text-gray-600">{t("not_available")}</p>
        </div>
      </div>

      <RescheduleDialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog} params={locale}/>
    </div>
  )
}
