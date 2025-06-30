"use client";

import MainButton from "@/components/main_button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";
import {  usePathname, useRouter } from "next/navigation";

export default function LanguageComponent() {
  const t = useTranslations("Language")
  // const {locale} = useParams()
  const locale = useLocale()

  const pathname  = usePathname()
  const router = useRouter()
  const switchLanguage = (lang) => {
    const newPath = `/${lang}${pathname.replace(/^\/(en|ar)/, '')}`
    router.push(newPath)
  }
  return (
    <>
      <main className="p-6">
        <MainButton />
        <div className="max-full space-y-4">
          <h3 className="2xl:text-sm text-xs font-medium">
            {t('title')}
          </h3>
          <Select value={locale} onValueChange={(e)=>switchLanguage(e)} dir={locale==="ar"?"rtl":"ltr"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en" direct={locale}>
                English <span>Default</span>{" "}
              </SelectItem>
              <SelectItem value="ar" direct={locale}>
                عربي <span>Arabic</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </main>
    </>
  );
}
