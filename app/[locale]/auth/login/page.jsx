"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { login } from "@/http/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import LanguageSwitcher from "@/components/language-switcher"
import { toast } from "sonner"
import loginImg from "@/public/images/login-image.webp"
import Spinner from "@/components/spinner"
import { useTranslations } from "next-intl"

export default function LoginPage() {
  const t = useTranslations("Login")
  const { locale } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isRemembered: false,
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  })

  useEffect(() => {
    
  }, [locale])

  const isRTL = locale === 'ar' || locale === 'he' || locale === 'fa'

  const validateEmail = (email) => {
    if (!email) return t('emailRequired')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return t('invalidEmail')
    return ""
  }

  const validatePassword = (password) => {
    if (!password) return t('passwordRequired')
    if (password.length < 6) return t('passwordTooShort')
    return ""
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "email" && typeof value === "string") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }))
    }
    if (field === "password" && typeof value === "string") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }))
    }
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)
    const { email, password, isRemembered } = formData

    setErrors({
      email: emailError,
      password: passwordError,
    })

    setTouched({
      email: true,
      password: true,
    })

    const mainEmail = 'hanat@123.com'
    const mainPassword = "Hanat@123"
    const cookieValue = JSON.stringify({ email: mainEmail, password: mainPassword })
    const maxAge = formData.isRemembered ? 60 * 60 * 24 * 7 : 60 * 60 * 24 // 7 days or 1 day
    
    if (!emailError && !passwordError) {
      if(mainEmail === formData.email && mainPassword === formData.password){
         setLoading(false)
         toast.success("Login Success")
         document.cookie = `auth-token=${cookieValue}; max-age=${maxAge}; path=/`
         router.push(`/${locale}/admin/dashboard`)
      }
      // setLoading(true)
      // try {
      //   // const res = await login(email, password, isRemembered)
      //   if (mainEmail===formData.email && mainPassword===formData.password) {
      //     // Fix: Use proper cookie setting method
      //     const cookieValue = JSON.stringify(res.user)
      //     // const maxAge = res.user.isRemembered ? 60 * 60 * 24 * 7 : 60 * 60 * 24
          
      //     // Use document.cookie or a proper cookie library
      //     document.cookie = `auth-token=${cookieValue}; max-age=${maxAge}; path=/`
          
      //     setLoading(false)
      //     toast.success("Login Success")
      //     router.push(`/${locale}/admin/dashboard`)
      //   }
      // } catch (err) {
      //   setLoading(false)
      //   // toast.error(err.response?.data?.message || 'Login failed')
      // }
    }
  }

  return (
    <div className={`min-h-screen flex ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Language Switcher */}
      <LanguageSwitcher />
      
      {/* Left Side - Image */}
      <div className={`hidden lg:flex lg:w-1/2 relative ${isRTL ? 'order-2' : 'order-1'}`}>
        <Image src={loginImg} alt="Service Professional" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/20" />
        <div className={`absolute bottom-8 text-white ${isRTL ? 'right-8' : 'left-8'}`}>
          <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            <div className="text-2xl font-bold">Hanat</div>
            <div className="text-sm opacity-80">عمل</div>
          </div>
          <h1 className="text-3xl font-bold mb-2">{t('tagline')}</h1>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 ${isRTL ? 'order-1' : 'order-2'}`}>
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="text-2xl font-bold">Hanat</div>
            <div className="text-sm opacity-80">عمل</div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('login')}</h2>
            <p className="text-gray-600">{t('welcome')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                {t('email')}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t('emailPlaceholder')}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={`mt-1 text-sm ${isRTL ? 'text-right' : 'text-left'} ${
                  touched.email && errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              {touched.email && errors.email && (
                <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                {t('password')}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={t('passwordPlaceholder')}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                className={`mt-1 ${isRTL ? 'text-right' : 'text-left'} ${
                  touched.password && errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              {touched.password && errors.password && (
                <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {errors.password}
                </p>
              )}
            </div>

            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                <Checkbox
                  id="remember"
                  checked={formData.isRemembered}
                  onCheckedChange={(checked) => handleInputChange("isRemembered", checked)}
                />
                <Label htmlFor="remember" className="text-sm text-gray-700">
                  {t('rememberMe')}
                </Label>
              </div>
              <Link 
                href={`/${locale}/auth/forgot-password`} 
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                {t('forgotPassword')}
              </Link>
            </div>

            <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3">
              {loading ? <Spinner /> : t('login')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}