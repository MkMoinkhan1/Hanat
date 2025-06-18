import Image from 'next/image'
import React from 'react'
import { Button } from "./ui/button"
import SettingIcon from "@/public/images/Setting-Icon.png"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const MainButton = () => {
      const pathname = usePathname()

      const isActive = (path) => {
    if (path === "/admin/settings") {
      return pathname === "/admin/settings"
    }
    return pathname === path
  }
  return (
    <>
         <header className="flex h-16 items-center justify-between ">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Image
                src={SettingIcon}
                alt="Setting Icon"
                className="2xl:h-12 h-10 w-10 2xl:w-12 border border-r-2 rounded-full p-2"
              />
              <div>
                <h1 className="2xl:text-lg text-sm font-semibold">Settings</h1>
                <p className="2xl:text-sm text-xs text-muted-foreground">Manage your preferences</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-slate-900 hover:bg-slate-800">Save Changes</Button>
          </div>
        </header>
         <div className="border-b my-6 ">
          <nav className="flex">
            <Link
              href="/admin/settings"
              className={`px-6 py-3 2xl:text-sm text-xs font-medium ${
                isActive("/admin/settings")
                  ? "border-b-2 border-slate-900 text-slate-900 bg-gray-100"
                  : "text-muted-foreground hover:text-slate-900"
              }`}
            >
              Account Settings
            </Link>
            <Link
              href="/admin/settings/password"
              className={`px-6 py-3 2xl:text-sm text-xs font-medium ${
                isActive("/admin/settings/password")
                  ? "border-b-2 border-slate-900 text-slate-900 bg-gray-100"
                  : "text-muted-foreground hover:text-slate-900"
              }`}
            >
              Password
            </Link>
            <Link
              href="/admin/settings/role-management"
              className={`px-6 py-3 2xl:text-sm text-xs font-medium ${
                isActive("/admin/settings/role-management")
                  ? "border-b-2 border-slate-900 text-slate-900 bg-gray-100"
                  : "text-muted-foreground hover:text-slate-900"
              }`}
            >
              Role Management
            </Link>
            <Link
              href="/admin/settings/language"
              className={`px-6 py-3 2xl:text-sm text-xs font-medium ${
                isActive("/admin/settings/language")
                  ? "border-b-2 border-slate-900 text-slate-900 bg-gray-100"
                  : "text-muted-foreground hover:text-slate-900"
              }`}
            >
              Language
            </Link>
            <Link
              href="/admin/settings/faqs"
              className={`px-6 py-3 2xl:text-sm text-xs font-medium ${
                isActive("/admin/settings/faqs")
                  ? "border-b-2 border-slate-900 text-slate-900 bg-gray-100"
                  : "text-muted-foreground hover:text-slate-900"
              }`}
            >
              FAQs
            </Link>
          </nav>
        </div>
    </>
  )
}

export default MainButton