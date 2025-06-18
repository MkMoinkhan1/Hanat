"use client"

import MainButton from "@/components/main_button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function LanguagePage() {
  const [language, setLanguage] = useState("english")

  return (
    <>
        <main className="p-6">
                        <MainButton/>
          <div className="max-full space-y-4">
            <h3 className="2xl:text-sm text-xs font-medium">Select your preferred language</h3>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english" note={"lang"} >English <span>Default</span>  </SelectItem>
                <SelectItem value="arabic" note={"lang"}>عربي <span>Arabic</span></SelectItem>
              </SelectContent>
            </Select>
          </div>
        </main>
    </>
  )
}
