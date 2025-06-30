"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import AddServiceDialog from "@/components/add-service-dialog"
import { useTranslations } from "next-intl"

export default function ServiceListContent() {
  const t = useTranslations("ServiceProvider.ServiceList")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const services = [
    {
      id: 1,
      name: "Wiring",
      description: "Concealed & Conduit Internal Wiring for a new connection",
      category: "Electrician",
      duration: "~2hrs",
      price: "280$",
    },
    {
      id: 2,
      name: "Cable Internet",
      description: "Concealed & Conduit Internal Wiring for a new connection",
      category: "Internet",
      duration: "~1.5hrs",
      price: "130$",
    },
    {
      id: 3,
      name: "Internet",
      description: "Concealed & Conduit Internal Wiring for a new connection",
      category: "Internet",
      duration: "~1hrs",
      price: "140$",
    },
    {
      id: 4,
      name: "Home Cleaning",
      description: "Concealed & Conduit Internal Wiring for a new connection",
      category: "Cleaning",
      duration: "~2.5hrs",
      price: "380$",
    },
  ]

  return (
    <div className="p-7">
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4 gap-2">
              <div className="w-16 h-16 bg-[#D9D9D9] rounded-lg"></div>
              <div>
                <h3 className="font-medium 2xl:text-lg text-sm">{service.name}</h3>
                <p className="2xl:text-sm text-xs text-gray-500">{service.description}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="2xl:text-sm text-xs text-gray-600 bg-gray-300 rounded-sm px-2">{service.category} {service.duration}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold 2xl:text-lg text-sm">{service.price}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        className="mt-6 text-gray-500 hover:bg-transparent hover:text-gray-700 p-0 h-auto font-normal"
        onClick={() => setShowAddDialog(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        {t('add_service')}
      </Button>

      <AddServiceDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}
