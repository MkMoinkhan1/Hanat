"use client"
import { useState } from "react"

import Link from "next/link"
import {  useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react"
import { resetPassword } from "@/http/auth"
import { toast } from "sonner"
import Spinner from "@/components/spinner"
import { useTranslations } from "next-intl"


export default function ResetPasswordPage() {
    const [loading, setLoading] = useState(false) 
    const param = useSearchParams()
    const token = param.get('token')
    const t = useTranslations("ResetPassword")
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  })
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  })
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  })

  const validatePassword = (password) => {
    if (!password) return t("validation.passwordRequired")
    if (password.length < 8) return t("validation.passwordLength")
    if (!/(?=.*[a-z])/.test(password)) return t('validation.passwordLowercase')
    if (!/(?=.*[A-Z])/.test(password)) return t("validation.passwordUppercase")
    if (!/(?=.*\d)/.test(password)) return t("validation.passwordNumber")
    return ""
  }

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return t("validation.confirmPasswordRequired")
    if (confirmPassword !== password) return t("validation.passwordsDoNotMatch")
    return ""
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "password") {
      const passwordError = validatePassword(value)
      setErrors((prev) => ({
        ...prev,
        password: passwordError,
        confirmPassword: formData.confirmPassword ? validateConfirmPassword(formData.confirmPassword, value) : "",
      }))
    }

    if (field === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(value, formData.password),
      }))
    }
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const passwordError = validatePassword(formData.password)
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password)

    setErrors({
      password: passwordError,
      confirmPassword: confirmPasswordError,
    })

    setTouched({
      password: true,
      confirmPassword: true,
    })

    if (!passwordError && !confirmPasswordError) {
            setLoading(true)
        try {
            const newPass = formData.password
            const res = await resetPassword(newPass, token)
            if(res){
                toast.success(res.message)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
      router.push("/en/auth/login")  
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
            <Lock className="w-8 h-8 text-gray-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('title')}</h2>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              {t("password")}
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword.password ? "text" : "password"}
                placeholder={t("placeholder.password")}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                className={`pr-10 ${
                  touched.password && errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("password")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword.password ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {touched.password && errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              {t('confirmPassword')}
            </Label>
            <div className="relative mt-1">
              <Input
                id="confirmPassword"
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder={t('placeholder.confirmPassword')}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                onBlur={() => handleBlur("confirmPassword")}
                className={`pr-10 ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword.confirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3">
            {
                loading ? (
                    <Spinner/>
                ) : (
                    t("button")
                ) 
            }
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToLogin')}
          </Link>
        </div>
      </div>
    </div>
  )
}
