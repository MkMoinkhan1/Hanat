"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import MainButton from "@/components/main_button"
import { useTranslations } from "next-intl";


export default function PasswordComponent() {
    const t = useTranslations("Password")
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
      return decodeURIComponent(parts.pop().split(";").shift());
    return null;
  };

  let cookieEmail = "";
  let cookiePassword = "";
  try {
    const userInfo = JSON.parse(getCookie("user-info"));
    cookieEmail = userInfo?.email;
    cookiePassword = userInfo?.password;
  } catch (err) {
    console.error("Invalid or missing user-info cookie", err);
  }
  const handleSubmit = () => {

    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    // ✅ Check current password
    if (passwordForm.currentPassword !== cookiePassword) {
      newErrors.currentPassword = "Current password is incorrect";
    }
    if (!passwordForm.newPassword) newErrors.newPassword = "Password is required";
    if (passwordForm.newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";
    if (passwordForm.confirmPassword !== passwordForm.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    console.log('ERROr',newErrors)
    setErrors(newErrors);

    // If no errors
    if (
      !newErrors.currentPassword &&
      !newErrors.newPassword &&
      !newErrors.confirmPassword
    ) {
      console.log("Password Updated ✅", passwordForm);
    }
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({
       currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }) 
  };
  return (
   <div className="p-6">
    <MainButton/>
     <form>
      <div className="space-y-6">
         <h3 className="w-full 2xl:text-sm text-xs p-2 font-medium mb-4 bg-gray-100 text-gray-400">
            {t('update_password')}
          </h3>
          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <label className="2xl:text-sm text-xs font-medium">
                {t('current_password')}
              </label>
              <Input
                type="password"
                placeholder={t('placeholder.current')}
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
                className="2xl:text-sm text-xs"
              />
              {errors.currentPassword && (
                <p className="text-xs text-red-500">{errors.currentPassword}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="2xl:text-sm text-xs font-medium">
                {t('new_password')}
              </label>
              <Input
                type="password"
                placeholder={t('placeholder.new')}
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                className="2xl:text-sm text-xs"
              />
              {errors.newPassword && (
                <p className="text-xs text-red-500">{errors.newPassword}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="2xl:text-sm text-xs font-medium">
                {t('confirm_password')}
              </label>
              <Input
                type="password"
                placeholder={t('placeholder.confirm')}
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
                className="2xl:text-sm text-xs"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
      </div>
    </form>
   </div>
  );
}
