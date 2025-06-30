"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export default function RescheduleDialog({ open, onOpenChange, params }) {
  const t = useTranslations("ServiceProvider.RescheduleDialog");
  const direction = params === "ar" ? "rtl" : "ltr";
  const dateRef = useRef(false);

  function showPicker(id) {
    const dateInput = document.getElementById(id);
    if (id === "date-input") return dateInput?.showPicker?.();

    if (dateRef.current) {
      dateRef.current = false;
      return dateInput?.blur?.();
    } else {
      dateRef.current = true;
      return dateInput?.showPicker?.();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md h-[95%]" dir={direction}>
        <DialogHeader>
          <DialogTitle className="2xl:text-lg text-sm font-medium">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 overflow-auto">
          {/* Booking Info */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium 2xl:text-md text-sm">{t("bookingTitle")}</h3>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {t("bookingType")}
              </span>
            </div>
            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-orange-600 bg-orange-50">
              {t("pendingStatus")}
            </span>
          </div>

          {/* Current Resource Details */}
          <div>
            <h4 className="2xl:text-sm text-xs font-medium text-gray-500 mb-3">
              {t("currentResourceTitle")}
            </h4>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/placeholder.svg?height=48&width=48"
                alt="Resource"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h5 className="font-medium 2xl:text-sm text-xs">{t("resourceName")}</h5>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < 3 ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 2xl:text-sm text-xs">
              <div>
                <p className="text-gray-500 mb-1">{t("service")}</p>
                <p className="font-medium">{t("serviceValue")}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">{t("mobile")}</p>
                <p className="font-medium">0000000000</p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                {t("dateLabel")}
              </label>
              <div className="relative" onClick={() => showPicker("date-input")}>
                <Input
                  id="date-input"
                  type="date"
                  placeholder={t("placeholderDate")}
                  className={`pl-10 border-gray-300 2xl:text-sm text-xs ${
                    direction === "rtl" ? "flex justify-end" : ""
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                {t("timeLabel")}
              </label>
              <div className="relative" onClick={() => showPicker("time-input")}>
                <Input
                  type="time"
                  id="time-input"
                  placeholder={t("placeholderTime")}
                  className={`pl-10 border-gray-300 2xl:text-sm text-xs ${
                    direction === "rtl" ? "flex justify-end" : ""
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                {t("changeResource")}
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Select dir={direction}>
                  <SelectTrigger className="pl-10 border-gray-300 2xl:text-sm text-xs">
                    <SelectValue placeholder={t("placeholderResource")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="floyd-miles">Floyd Miles</SelectItem>
                    <SelectItem value="cody-fisher">Cody Fisher</SelectItem>
                    <SelectItem value="jenny-wilson">Jenny Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 gap-2">
            {direction === "rtl" ? (
              <>
                <Button className="flex-1 bg-gray-900 text-white 2xl:text-sm text-xs">
                  {t("rescheduleButton")}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 2xl:text-sm text-xs"
                  onClick={() => onOpenChange(false)}
                >
                  {t("cancelButton")}
                </Button>
              </>
            ) : (
              <>
                <Button className="flex-1 bg-gray-900 text-white 2xl:text-sm text-xs">
                  {t("rescheduleButton")}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 2xl:text-sm text-xs"
                  onClick={() => onOpenChange(false)}
                >
                  {t("cancelButton")}
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
