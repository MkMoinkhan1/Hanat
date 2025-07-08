"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail } from "lucide-react"
import { checkEmail } from "@/http/auth"
import { useTranslations } from "next-intl"

export default function CheckEmailPage() {
    const t = useTranslations("CheckEmail")
    const { locale} = useParams()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState(searchParams.get("email") || "")
  const [resendCooldown, setResendCooldown] = useState(0)


  const handleResend = async () => {
  
    setResendCooldown(60)
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
        try {
            const res = await checkEmail(email)
            if(res.success){
                console.log("response",res)
            }
        } catch (error) {
            console.log(error)
        }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
          <Mail className="w-8 h-8 text-gray-600" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('title')}</h2>

        <div className="mb-8">
          <p className="text-gray-600 mb-2">{t('description')}</p>
          <p className="font-medium text-gray-900">{email || "your Email address"}</p>
        </div>

        <Button
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 mb-6"
          onClick={() => window.open("mailto:", "_blank")}
        >
          {t('openApp')}
        </Button>

        <div className="text-center mb-6">
          <span className="text-sm text-gray-600">{t("notReceived")}</span>
          {resendCooldown > 0 ? (
            <span className="text-sm text-gray-400">{t('resendIn')} {resendCooldown}s</span>
          ) : (
            <button onClick={handleResend} className="text-sm text-blue-600 hover:text-blue-500">
              {t('clickToResend')}
            </button>
          )}
        </div>

        <Link href={`/${locale}/auth/login`} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('backToLogin')}
        </Link>
      </div>
    </div>
  )
}
