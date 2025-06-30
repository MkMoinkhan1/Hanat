"use client"

import { usePathname, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function CategoryTab() {
  const pathname = usePathname()
  const router = useRouter()
  const [lastSubCategoryPath, setLastSubCategoryPath] = useState(null)
  // Track the last subcategory path the user was on
  useEffect(() => {
    if (pathname.includes("/sub-category")) {
      setLastSubCategoryPath(pathname)
    }
  }, [pathname])

  // Determine if we're on edit category or sub-category section
  const isEditCategory = pathname === "/edit-category"
  const isSubCategory = pathname.includes("/sub-category")

  // Handle tab clicks
  const handleEditCategoryClick = () => {
    router.push(`${pathname}/edit-category`)
  }

  const handleSubCategoryClick = () => {
    // If we have a saved subcategory path, go back to it
    // Otherwise go to the main subcategory page
    if (lastSubCategoryPath && lastSubCategoryPath !== "/sub-category") {
      router.push(lastSubCategoryPath)
    } else {
      router.push(`${pathname}/sub-category`)
    }
  }

  // Handle back button click


  return (
    <header className="py-6 px-7 border-b border-gray-200">
      <div className="mt-8 border-b border-gray-200">
        <div className="flex">
          <button
            onClick={handleEditCategoryClick}
            className={`px-4 py-2 text-sm font-medium relative ${
              isEditCategory ? "text-black" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Edit Category
            {isEditCategory && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />}
          </button>
          <button
            onClick={handleSubCategoryClick}
            className={`px-4 py-2 text-sm font-medium relative ${
              isSubCategory ? "text-black" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sub-Category
            {isSubCategory && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />}
          </button>
        </div>
      </div>
    </header>
  )
}
