// components/LanguageSwitcher.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";

const locales = [
  { code: "en", label: "English (UK)", flag: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#071b65"></rect><path d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z" fill="#fff"></path><path d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z" fill="#b92932"></path><path d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z" fill="#b92932"></path><path d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z" fill="#fff"></path><rect x="13" y="4" width="6" height="24" fill="#fff"></rect><rect x="1" y="13" width="30" height="6" fill="#fff"></rect><rect x="14" y="4" width="4" height="24" fill="#b92932"></rect><rect x="14" y="1" width="4" height="30" transform="translate(32) rotate(90)" fill="#b92932"></rect><path d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z" fill="#b92932"></path><path d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z" fill="#b92932"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg> },
  { code: "ar", label: "Arabic عربي", flag: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#fff" d="M1 11H31V21H1z"></path><path d="M5,4H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z"></path><path d="M5,20H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z" transform="rotate(180 16 24)" fill="#357942"></path><path d="M2.316,26.947l13.684-10.947L2.316,5.053c-.803,.732-1.316,1.776-1.316,2.947V24c0,1.172,.513,2.216,1.316,2.947Z" fill="#be2a2c"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M6.787,13.276l-.621,1.577-1.617-.494,.844,1.466-1.402,.956,1.681,.255-.127,1.689,1.243-1.147,1.251,1.147-.127-1.689,1.673-.255-1.394-.956,.844-1.466-1.617,.494-.629-1.577Z" fill="#fff"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg> },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useParams();
  const changeLanguage = (lang) => {
    const newPath = pathname.replace(/^\/(en|ar)/, `/${lang}`);
    router.push(newPath);
    setOpen(false);
    window.location.href = newPath
  };

  return (
    <div className={`absolute top-4 right-4 z-50`}>
      <div
        className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        <span>{locales.find((l) => l.code === locale)?.flag}</span>
        <span className="text-xs">{locales.find((l) => l.code === locale)?.label}</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {open && (
        <div className="mt-1 absolute bg-white border rounded shadow w-full">
          {locales.map((l) => (
            <div
              key={l.code}
              className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
              onClick={() => changeLanguage(l.code)}
            >
              {l.flag} {l.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
