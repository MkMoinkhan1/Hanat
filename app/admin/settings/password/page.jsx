"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function PasswordPage() {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  

  return (
    <>
    
    <div className="space-y-6">
      <div>
      <h3 className="w-full 2xl:text-sm text-xs p-2 font-medium mb-4 bg-gray-100 text-gray-400">Update Password</h3>
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <label className="2xl:text-sm text-xs font-medium">Current Password</label>
            <Input
              type="password"
              placeholder="Enter your current password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="2xl:text-sm text-xs"
            />
          </div>
          <div className="space-y-2">
            <label className="2xl:text-sm text-xs font-medium">New Password</label>
            <Input
              type="password"
              placeholder="Enter your new password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="2xl:text-sm text-xs"
            />
          </div>
          <div className="space-y-2">
            <label className="2xl:text-sm text-xs font-medium">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm your password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="2xl:text-sm text-xs"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
