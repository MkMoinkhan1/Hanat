"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AddVariantDialog({ open, onOpenChange, initialVariants = [], onSave }) {
  const [variantData, setVariantData] = useState({
    "multiple-choice": [],
    "short-answer": [""],
  })

  const [selectedType, setSelectedType] = useState("multiple-choice")
  const [newOption, setNewOption] = useState("")

  useEffect(() => {
    if (open) {
      if (initialVariants.length > 0) {
        const type = initialVariants[0].type || "multiple-choice"
        const options = initialVariants[0].options || []
        setSelectedType(type)

        setVariantData((prev) => ({
          ...prev,
          [type]: options,
        }))

        if (["short-answer", "long-answer"].includes(type)) {
          setNewOption(options[0] || "")
        } else {
          setNewOption("")
        }
      } else {
        setSelectedType("multiple-choice")
        setNewOption("")
        setVariantData({
          "multiple-choice": [],
          "short-answer": [""],
        })
      }
    }
  }, [open, initialVariants])

  const handleTypeChange = (type) => {
    setSelectedType(type)
    if (["short-answer"].includes(type)) {
      setNewOption(variantData[type]?.[0] || "")
    } else {
      setNewOption("")
    }
  }

  const handleAddOption = () => {
    if (newOption.trim()) {
      setVariantData((prev) => ({
        ...prev,
        [selectedType]: [...(prev[selectedType] || []), newOption.trim()],
      }))
      setNewOption("")
    }
  }

  const handleRemoveOption = (index) => {
    setVariantData((prev) => ({
      ...prev,
      [selectedType]: prev[selectedType].filter((_, i) => i !== index),
    }))
  }

  const handleSave = () => {
    const options =
      ["short-answer"].includes(selectedType)
        ? [newOption.trim()]
        : variantData[selectedType]

    const newVariant = {
      type: selectedType,
      options,
    }

    onSave(newVariant)
    onOpenChange(false)

    // Reset all
    setVariantData({
      "multiple-choice": [],
      "short-answer": [""],
    })
    setNewOption("")
    setSelectedType("multiple-choice")
  }

  const isSaveDisabled =
    (["short-answer"].includes(selectedType) && !newOption.trim()) ||
    (["multiple-choice"].includes(selectedType) && variantData[selectedType]?.length === 0)

  const renderOptionIcon = () => {
    if (selectedType === "multiple-choice") {
      return (
        <div className="h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-gray-500" />
        </div>
      )
    } 
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="p-6 pb-2">
          <DialogTitle className="text-lg font-semibold">Add Variant</DialogTitle>
        </div>

        <div className="px-6 py-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="subcategory" className="block 2xl:text-sm text-xs font-medium mb-2">
                Sub-Category
              </label>
              <Input id="subcategory" value="Sofa" readOnly className="h-10" />
            </div>
            <div>
              <label htmlFor="type" className="block 2xl:text-sm text-xs font-medium mb-2">
                Type
              </label>
              <Select value={selectedType} onValueChange={handleTypeChange}>
                <SelectTrigger id="type" className="h-10">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="short-answer">Short Answer</SelectItem>
                  <SelectItem value="long-answer">Long Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {["multiple-choice"].includes(selectedType) ? (
            <div className="space-y-2">
              {variantData[selectedType]?.map((option, index) => (
                <div key={index} className="flex items-center justify-between 2xl:py-3 py-0 border-b">
                  <div className="flex items-center gap-3 overflow-auto">
                    {renderOptionIcon()}
                    <span className="2xl:text-sm text-xs">{option}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                    onClick={() => handleRemoveOption(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3 w-full">
                  {renderOptionIcon()}
                  <Input
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Add Option"
                    className="h-8 border-none shadow-none focus-visible:ring-0 p-0"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddOption()
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="py-3">
              <Input
                placeholder="Enter the question"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex justify-between p-6 pt-2 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-gray-900 hover:bg-gray-800"
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
