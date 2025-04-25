import { useState } from "react";
import { useLanguage } from "@contexts/LanguageContext";
import ptFlag from "@images/flags/flag_pt.svg";
import enFlag from "@images/flags/flag_en.svg";

export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const flag = language === "pt" ? ptFlag : enFlag;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80"
      >
        <img src={flag} alt={language} className="w-6 h-4 object-cover rounded-sm" />
        <span className="hidden sm:inline text-sm font-medium">{language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-28 bg-white text-[#0A2647] rounded shadow z-30">
          {["pt", "en"].map((lang) => (
            <div
              key={lang}
              onClick={() => {
                changeLanguage(lang);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={lang === "pt" ? ptFlag : enFlag}
                alt={lang.toUpperCase()}
                className="w-6 h-4 object-cover rounded-sm"
              />
              <span className="text-sm">{lang.toUpperCase()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
