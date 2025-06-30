"use client";
import React from 'react'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import MainButton from '@/components/main_button';
import { useTranslations } from 'next-intl';

const formDataVal = 
  {
    fullName:"Moin Khan",
    email:"Moin@123.com",
    phoneNumber:"7724081607",
    role:"Chain Snatching"
  }
const AccountSetting = () => {
      const [accountForm, setAccountForm] = useState(formDataVal);
      const t = useTranslations("AccountSetting")
  return (
     <div className="p-6">
        <MainButton/>
        <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="2xl:h-16 2xl:w-16 h-10 w-10">
          <AvatarImage
            src="/placeholder.svg?height=64&width=64"
            alt="Profile"
          />
          <AvatarFallback className="2xl:text-sm text-xs">SS</AvatarFallback>
        </Avatar>
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="h-4 w-4 text-sm" />
          {t('upload_new')}
        </Button>
      </div>

      <div>
        <h3 className="2xl:text-sm text-xs 2xl:font-medium text-muted-foreground mb-4">
          {t('personal_details')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="2xl:text-sm text-xs  font-medium">
              {t('full_name')}
            </label>
            <Input
              placeholder={t('placeholder.full_name')}
              value={accountForm.fullName}
              onChange={(e) =>
                setAccountForm({ ...accountForm, fullName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="2xl:text-sm text-xs  font-medium">{t('email')}</label>
            <Input
              placeholder={t('placeholder.email')}
              value={accountForm.email}
              onChange={(e) =>
                setAccountForm({ ...accountForm, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="2xl:text-sm text-xs  font-medium">
              {t("phone_number")}
            </label>
            <Input
              placeholder={t('placeholder.phone_number')}
              value={accountForm.phoneNumber}
              onChange={(e) =>
                setAccountForm({ ...accountForm, phoneNumber: e.target.value })
              }
            />
          </div>
        </div>
        <div className="mt-6 max-w-xs">
          <div className="space-y-2">
            <label className="2xl:text-sm text-xs font-medium ">{t('role')}</label>
            <Input
              placeholder={t('placeholder.role')}
              value={accountForm.role}
              onChange={(e) =>
                setAccountForm({ ...accountForm, role: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
      </div>
  )
}

export default AccountSetting