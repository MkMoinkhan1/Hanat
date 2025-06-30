"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, Edit2, Plus, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CategoryEditPage() {
  const router = useRouter()
  const {id,locale} = useParams()
  const categoryId = id
  const isNewCategory = categoryId === "new"

  const [activeTab, setActiveTab] = useState("edit-category")
  const [subcategories, setSubcategories] = useState([])
  const [newSubcategory, setNewSubcategory] = useState("")

  // Mock category data
  const [category, setCategory] = useState({
    id: isNewCategory ? "new" : categoryId,
    name: "",
    description: "",
  })

  // If editing an existing category, load its data
  useEffect(() => {
    if (!isNewCategory) {
      // In a real app, you would fetch the category data from an API
      // For now, we'll use mock data
      const mockCategories = [
        {
          id: "1",
          name: "Furniture",
          description: "Lorem ipsum dolor sit",
          subcategories: ["Sofa", "Dining Table", "Mattress"],
        },
        {
          id: "2",
          name: "Commercial",
          description: "Lorem ipsum dolor sit",
          subcategories: ["Kitchen", "Living Room", "Bedroom", "Bathroom"],
        },
        {
          id: "3",
          name: "Residential",
          description: "Lorem ipsum dolor sit",
          subcategories: ["Office Space", "Kitchen", "Bathroom"],
        },
      ]

      const foundCategory = mockCategories.find((c) => c.id === categoryId)
      if (foundCategory) {
        setCategory({
          id: foundCategory.id,
          name: foundCategory.name,
          description: foundCategory.description,
        })
        setSubcategories(foundCategory.subcategories)
      }
    }
  }, [categoryId, isNewCategory])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCategory((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSubcategory = () => {
    if (newSubcategory.trim()) {
      setSubcategories((prev) => [...prev, newSubcategory.trim()])
      setNewSubcategory("")
    }
  }

  const handleRemoveSubcategory = (index) => {
    setSubcategories((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    // In a real app, you would save the category data to an API
    // For now, we'll just redirect back to the service edit page

    // Get the service ID from the referrer or use a default
    const serviceId = "1" // In a real app, you would get this from the URL or state

    router.push(`/${locale}/admin/service-management/edit-service/${serviceId}`)
  }

  return (
    <div className="flex h-screen bg-white">

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4  bg-white px-6 py-4">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Service Management</h1>
            <p className="text-sm text-muted-foreground">Lorem ipsum management</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b bg-white">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-auto bg-transparent p-0">
              <TabsTrigger
                value="edit-category"
                className="rounded-none border-b-2 border-transparent px-8 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-black data-[state=active]:text-black data-[state=active]:shadow-none"
              >
                {isNewCategory ? "Add Category" : "Edit Category"}
              </TabsTrigger>
              <TabsTrigger
                value="sub-category"
                className="rounded-none border-b-2 border-transparent px-8 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-black data-[state=active]:text-black data-[state=active]:shadow-none"
              >
                Sub-Category
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg border p-6">
            {activeTab === "edit-category" ? (
              <div className="space-y-6 max-w-xl">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Category Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter Category name"
                    value={category.name}
                    onChange={handleInputChange}
                    className="h-10"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter Description"
                    value={category.description}
                    onChange={handleInputChange}
                    className="min-h-[200px]"
                  />
                </div>

                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Custom Field
                </Button>

                <div className="flex justify-end gap-4 pt-4">
                  <Button variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button className="bg-gray-900 hover:bg-gray-800" onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 w-full">
                  <div className="space-y-2">
                <div>
                  <h3 className="text-sm font-medium mb-2">Sub-Categories</h3>
                    {subcategories.length === 0 ? (
                      <p className="text-sm text-gray-500">No sub-categories added yet.</p>
                    ) : (
                      subcategories.map((subcat, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3 ">
                  <div className="flex justify-between ">
                    <div>
                      <h3 className="font-medium">{subcat}</h3>
                      <p className="text-sm text-gray-500 mt-1">Lorem ipsum management</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Avg Rating</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={`${i < "3" ? "fill-[#FFC107] text-[#FFC107]" : "text-gray-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                  <div className="flex justify-end mt-2 space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-transparent" 
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  </div>
                </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
