"use client"
import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Key } from "lucide-react"
import { checkEmail } from "@/http/auth"
import { toast } from "sonner"
import Spinner from "@/components/spinner"
import { useTranslations } from "next-intl"

export default function ForgotPasswordPage() {
  const { locale } = useParams()
  const router = useRouter()
  const t = useTranslations("ForgotPassword")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [touched, setTouched] = useState(false)

  const validateEmail = (email) => {
    if (!email) return t("emailRequired")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return t("invalidEmail")
    return ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailError = validateEmail(email)
    setError(emailError)
    setTouched(true)

    if (!emailError) {
      setLoading(true)
      try {
        const res = await checkEmail(email)
        if (res.success) {
          toast.success(res.message)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }

      router.push(`/${locale}/auth/check-email?email=${encodeURIComponent(email)}`)
    }
  }

  const handleInputChange = (value) => {
    setEmail(value)
    if (touched) {
      setError(validateEmail(value))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
            <Key className="w-8 h-8 text-gray-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t("title")}</h2>
          <p className="text-gray-600">{t("description")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              {t("email")}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t("placeholder")}
              value={email}
              onChange={(e) => handleInputChange(e.target.value)}
              onBlur={() => setTouched(true)}
              className={`mt-1 ${
                touched && error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              }`}
            />
            {touched && error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3">
            {loading ? <Spinner /> : t("reset")}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href={`/${locale}/auth/login`} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("backToLogin")}
          </Link>
        </div>
      </div>
    </div>
  )
}
