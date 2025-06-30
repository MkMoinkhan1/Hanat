"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"


export default function ServiceProviderLayout({ children, activeTab, providerId }) {
  const router = useRouter()
  const {locale , id} = providerId
  console.log("ServiceProviderLayout params", providerId)
  const direction = locale === "ar" ? "rtl" : "ltr"
  const t = useTranslations("ServiceProvider.ServiceProviderTabs")
  const td = useTranslations("ServiceProvider")
  const tabs = [
    { id: "personal-details", label: t("personal_details"), href: `/${locale}/admin/service-provider/${id}` },
    { id: "booking", label: t("booking"), href: `/${locale}/admin/service-provider/${id}/booking` },
    { id: "service-list", label: t("service_list"), href: `/${locale}/admin/service-provider/${id}/service-list` },
    { id: "resources", label: t("resources"), href: `/${locale}/admin/service-provider/${id}/resources` },
    { id: "categories", label: t("categories"), href: `/${locale}/admin/service-provider/${id}/categories` },
  ]

  return (
      <div className="flex-1 flex flex-col">
        <header className="py-6 px-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className={`${direction === "rtl"?"ml-2":"mr-2"} h-8 w-8 border rounded-[50%] p-4`}
                onClick={() => router.push(`/${locale}/admin/service-provider`)}
              >
                {
                  direction === "rtl" ? <ArrowRight className="h-4 w-4  " /> : <ArrowLeft className="h-4 w-4" />
                }
              </Button>
              <div>
                <h1 className="2xl:text-lg text-sm font-medium">{td('title')}</h1>
                <p className="text-xs text-gray-500">{td('about')}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-gray-300 text-gray-700 ">
                {td('cancel')}
              </Button>
              <Button className="bg-gray-900 text-white">{td('save')}</Button>
            </div>
          </div>

          <div className="mt-8 border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => router.push(tab.href)}
                  className={`px-4 py-2 2xl:text-sm text-xs font-medium relative ${
                    activeTab === tab.id ? "text-black bg-gray-100" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />}
                </button>
              ))}
            </div>
          </div>
        </header>
        {children}
      </div>
  )
}
