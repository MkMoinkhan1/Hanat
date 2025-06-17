"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


export default function ServiceProviderLayout({ children, activeTab, providerId }) {
  const router = useRouter()

  const tabs = [
    { id: "personal-details", label: "Personal Details", href: `/admin/service-provider/${providerId}` },
    { id: "booking", label: "Booking", href: `/admin/service-provider/${providerId}/booking` },
    { id: "service-list", label: "Service List", href: `/admin/service-provider/${providerId}/service-list` },
    { id: "resources", label: "Resources", href: `/admin/service-provider/${providerId}/resources` },
    { id: "categories", label: "Categories", href: `/admin/service-provider/${providerId}/categories` },
  ]

  return (
      <div className="flex-1 flex flex-col">
        <header className="py-6 px-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 h-8 w-8 p-0"
                onClick={() => router.push("/admin/service-provider")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="2xl:text-lg text-sm font-medium">Service Provider</h1>
                <p className="text-xs text-gray-500">Lorem ipsum management</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-gray-300 text-gray-700 ">
                Cancel
              </Button>
              <Button className="bg-gray-900 text-white">Save Changes</Button>
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
