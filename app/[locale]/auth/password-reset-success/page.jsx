"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function PasswordResetSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Password reset</h2>

        <div className="mb-8">
          <p className="text-gray-600 mb-2">Your password has been successfully reset.</p>
          <p className="text-gray-600">Click below to log in.</p>
        </div>

        <Button asChild className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 mb-6">
          <Link href="/en/auth/login">Continue</Link>
        </Button>

        <Link href="/en/auth/login" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to log in
        </Link>
      </div>
    </div>
  )
}
