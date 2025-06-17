"use client"

import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"
import { HandlerContext } from "./layout"

export default function SettingsPage() {
  console.log("SettingsPage rendered")
  const {handler,setHandler} = useContext(HandlerContext);
  const value = useContext(HandlerContext);
  console.log("SettingsPage value",value)

  const [accountForm, setAccountForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
  })
  function handleAccountChange(){
    // logic
    console.log("SettingsPage handleAccountChange", accountForm)
  }
  useEffect(() => {
    console.log("SettingsPage useEffect", handler)
    setHandler(()=>handleAccountChange)
    return ()=>{
setHandler(null)
    }
  },[accountForm])
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="2xl:h-16 2xl:w-16 h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Profile" />
          <AvatarFallback className="2xl:text-sm text-xs">SS</AvatarFallback>
        </Avatar>
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="h-4 w-4 text-sm" />
          Upload New
        </Button>
      </div>

      <div>
        <h3 className="2xl:text-sm text-xs 2xl:font-medium text-muted-foreground mb-4">PERSONAL DETAILS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="2xl:text-sm text-xs  font-medium">Full Name</label>
            <Input
              placeholder="Enter your name"
              value={accountForm.fullName}
              onChange={(e) => setAccountForm({ ...accountForm, fullName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="2xl:text-sm text-xs  font-medium">Email</label>
            <Input
              placeholder="Enter your mail"
              value={accountForm.email}
              onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="2xl:text-sm text-xs  font-medium">Phone Number</label>
            <Input
              placeholder="Enter your name"
              value={accountForm.phoneNumber}
              onChange={(e) => setAccountForm({ ...accountForm, phoneNumber: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-6 max-w-xs">
          <div className="space-y-2">
            <label className="2xl:text-sm text-xs font-medium ">Role</label>
            <Input
              placeholder="Enter your role"
              value={accountForm.role}
              onChange={(e) => setAccountForm({ ...accountForm, role: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
