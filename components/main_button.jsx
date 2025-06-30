"use client"
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import SettingIcon from "@/public/images/Setting-Icon.png";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
const MainButton = () => {
  const t = useTranslations("Setting");
  const pathname = usePathname();
  const params = useParams();
  const { locale } = params;
  const isActive = (path) => {
    if (path === `/${locale}/admin/settings`) {
      return pathname === `/${locale}/admin/settings`;
    }
    return pathname === path;
  };
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
              <h1 className="2xl:text-lg text-sm font-semibold">
                {t("title")}
              </h1>
              <p className="2xl:text-sm text-xs text-muted-foreground">
                {t("about")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">{t("cancel")}</Button>
          <Button className="bg-slate-900 hover:bg-slate-800">
            {t("save")}
          </Button>
        </div>
      </header>
      <div className="border-b my-6 ">
        <nav className="flex">
          <Link
            href={`/${locale}/admin/settings`}
            className={`px-6 py-3 2xl:text-sm text-xs font-medium ${
              isActive(`/${locale}/admin/settings`)
                ? "border-b-2 border-slate-900 text-slate-900 bg-gray-100"
                : "text-muted-foreground hover:text-slate-900"
            }`}
          >
            {t("account_settings")}
          </Link>
          <Link
            href={`/${locale}/admin/settings/password`}
            className={`px-6 py-3 2xl:text-sm text-xs font-medium ${
              isActive(`/${locale}/admin/settings/password`)
                ? "border-b-2 border-slate-900 text-slate-900 bg-gray-100"
                : "text-muted-foreground hover:text-slate-900"
            }`}
          >
            {t("password")}
          </Link>
          <Link
            href={`/${locale}/admin/settings/role-management`}
            className={`px-6 py-3 2xl:text-sm text-xs font-medium ${
              isActive(`/${locale}/admin/settings/role-management`)
                ? "border-b-2 border-slate-900 text-slate-900 bg-gray-100"
                : "text-muted-foreground hover:text-slate-900"
            }`}
          >
            {t("role_management")}
          </Link>
          <Link
            href={`/${locale}/admin/settings/language`}
            className={`px-6 py-3 2xl:text-sm text-xs font-medium ${
              isActive(`/${locale}/admin/settings/language`)
                ? "border-b-2 border-slate-900 text-slate-900 bg-gray-100"
                : "text-muted-foreground hover:text-slate-900"
            }`}
          >
            {t("language")}
          </Link>
          <Link
            href={`/${locale}/admin/settings/faqs`}
            className={`px-6 py-3 2xl:text-sm text-xs font-medium ${
              isActive(`/${locale}/admin/settings/faqs`)
                ? "border-b-2 border-slate-900 text-slate-900 bg-gray-100"
                : "text-muted-foreground hover:text-slate-900"
            }`}
          >
            {t("faqs")}
          </Link>
        </nav>
      </div>
    </>
  );
};

export default MainButton;
