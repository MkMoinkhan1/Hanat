"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import { useTranslations } from "next-intl"



export default function AddServiceDialog({ open, onOpenChange }) {
  const t = useTranslations("ServiceProvider.AddServiceDialog")
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="2xl:text-lg text-sm">{t("title")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Upload */}
          <div className="flex items-center space-x-4 gap-2">
            <div className="2xl:w-24 2xl:h-24 h-14 w-14 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-gray-400">📷</div>
            </div>
            <Button variant="outline" className="border-gray-300 text-gray-700">
              <Upload className={`h-4 w-4 mr-2`} />
              {t('uploadButton')}
            </Button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block 2xl:text-sm text-xs font-medium text-gray-700 mb-1">{t('categoryLabel')}</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t("categoryPlaceholder" )}/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrician">Electrician</SelectItem>
                  <SelectItem value="plumber">Plumber</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block 2xl:text-sm text-xs font-medium text-gray-700 mb-1">{t('subCategoryLabel')}</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t('subCategoryPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wiring">Wiring</SelectItem>
                  <SelectItem value="repair">Repair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block 2xl:text-sm text-xs font-medium text-gray-700 mb-1">{t('durationLabel')}</label>
              <Input placeholder={t('durationPlaceholder')} />
            </div>
            <div>
              <label className="block 2xl:text-sm text-xs font-medium text-gray-700 mb-1">{t('serviceAreaLabel')}</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t('serviceAreaPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="los-angeles">Los Angeles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block 2xl:text-sm text-xs font-medium text-gray-700 mb-1">{t('chargesLabel')}</label>
              <Input placeholder={t('chargesPlaceholder')}/>
            </div>
            <div>
              <label className="block 2xl:text-sm text-xs font-medium text-gray-700 mb-1">{t('descriptionLabel')}</label>
              <Textarea placeholder={t('descriptionPlaceholder')} className="min-h-[80px]" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t('cancelButton')}
            </Button>
            <Button className="bg-gray-900 text-white">{t('saveButton')}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
