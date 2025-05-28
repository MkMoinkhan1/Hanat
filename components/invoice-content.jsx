"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function InvoiceContent({ invoiceId }) {
  const router = useRouter()

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="py-6 px-7 border-b border-gray-200">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 p-0" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <p className="text-sm text-gray-500">Invoice Id</p>
            <h1 className="text-lg font-medium">{invoiceId}</h1>
          </div>
        </div>
      </header>

      {/* Invoice Content */}
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          {/* Company Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Company name</h1>
              <p className="text-gray-600">Sub heading</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">+1 987 987 8376</p>
              <p className="text-gray-600">Company@gmail.com</p>
              <div className="mt-2 text-sm text-gray-600">
                <p>TAX I.D : 84738294854</p>
                <p>GSTIN : 768HAUY3456NSHJS</p>
                <p>NRIC/FIN I.D : A2369756</p>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <div>
                <span className="text-gray-600">Invoice : </span>
                <span className="font-medium">84738294854</span>
              </div>
              <div>
                <span className="text-gray-600">Client : </span>
                <span className="font-medium">768HAUY3456NSHJS</span>
              </div>
              <div>
                <span className="text-gray-600">Date : </span>
                <span className="font-medium">19-feb-2025</span>
              </div>
            </div>
          </div>

          {/* Services Table */}
          <div className="mb-8">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Description :</span>
                <span className="font-medium text-gray-900">Subtotal:</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Cleaning</span>
                <span className="text-gray-700">$ 0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Sofa Cleaning</span>
                <span className="text-gray-700">$ 0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Car Cleaning</span>
                <span className="text-gray-700">$ 0.00</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Discount (%)</span>
                <span className="text-gray-700">0%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Tax</span>
                <span className="text-gray-700">$ 0.00</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="font-semibold text-gray-900">Total Amount:</span>
                <span className="font-semibold text-gray-900">JOD 0.00</span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Payment made via bank transfer / cheque in the name of: Jay Janikaram
            </p>
            <p className="text-sm text-gray-600 text-center mt-1">
              MyBank a/c no 01234567890, MG Road Branch, Bangalore, India | rtgs: neft ifsc: MY1800000000001
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
