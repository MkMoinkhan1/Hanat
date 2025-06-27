"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

import loginImg from "@/public/images/login-image.webp"
export default function LoginPage() {
  const {locale} = useParams()
  const admin_email = "moinkhan7724081607@gmail.com"
  const admin_password = "Moin@123"
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  })

  const validateEmail = (email) => {
    if (!email) return "Email is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    if(email !== admin_email) return "Email is incorrect"
    return ""
  }

  const validatePassword = (password) => {
    if (!password) return "Password is required"
    if (password.length < 6) return "Password must be at least 6 characters"
    if(password !== admin_password) return "Password is incorrect"
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

  const handleSubmit = (e) => {
    e.preventDefault()

    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    setErrors({
      email: emailError,
      password: passwordError,
    })

    setTouched({
      email: true,
      password: true,
    })

    if (!emailError && !passwordError) {
        if(formData.email === admin_email && formData.password === admin_password) {
          document.cookie = `auth-token=${encodeURIComponent("jiefcmunycgedyugd73t76nx273y8721nyz287")}; path=/; max-age=${formData.rememberMe?"604800":"86400"}`
           const userInfoString = encodeURIComponent(JSON.stringify(formData));
document.cookie = `user-info=${userInfoString}; path=/; max-age=${formData.rememberMe ? "604800" : "86400"}`;

          router.push(`/${locale}/admin/dashboard`)
        }
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image src={loginImg} alt="Service Professional" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-8 left-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-2xl font-bold">Hanat</div>
            <div className="text-sm opacity-80">عمل</div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Your Hub for Smarter Service Operations</h1>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="text-2xl font-bold">Hanat</div>
            <div className="text-sm opacity-80">عمل</div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Log in</h2>
            <p className="text-gray-600">Welcome back! Please enter your details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={`mt-1 text-sm ${
                  touched.email && errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              {touched.email && errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                className={`mt-1 ${
                  touched.password && errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              {touched.password && errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange("rememberMe", checked)}
                />
                <Label htmlFor="remember" className="text-sm text-gray-700">
                  Remember me
                </Label>
              </div>
              <Link href={`/${locale}/admin/forgot-password`} className="text-sm text-blue-600 hover:text-blue-500">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
