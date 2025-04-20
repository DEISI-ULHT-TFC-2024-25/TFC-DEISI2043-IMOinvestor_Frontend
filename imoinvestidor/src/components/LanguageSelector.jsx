import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import ptFlag from "../images/flags/flag_pt.svg";
import enFlag from "../images/flags/flag_en.svg";

export default function LanguageSelector() {
  const { user } = useAuth();
  const [language, setLanguage] = useState("pt");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user?.lang_key) {
      setLanguage(user.lang_key.toLowerCase());
    } else {
      const browserLang = navigator.language.startsWith("pt") ? "pt" : "en";
      setLanguage(browserLang);
    }
  }, [user]);

  const handleChangeLanguage = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const flag = language === "pt" ? ptFlag : enFlag;

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 hover:opacity-80"
      >
        <img src={flag} alt={language} className="w-6 h-4 object-cover rounded-sm" />
        <span className="hidden sm:inline text-sm font-medium">{language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-28 bg-white text-[#0A2647] rounded shadow z-30">
          <div
            onClick={() => handleChangeLanguage("pt")}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
          >
            <img src={ptFlag} alt="Português" className="w-6 h-4 object-cover rounded-sm" />
            <span className="text-sm">PT</span>
          </div>
          <div
            onClick={() => handleChangeLanguage("en")}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
          >
            <img src={enFlag} alt="Inglês" className="w-6 h-4 object-cover rounded-sm" />
            <span className="text-sm">EN</span>
          </div>
        </div>
      )}
    </div>
  );
}
