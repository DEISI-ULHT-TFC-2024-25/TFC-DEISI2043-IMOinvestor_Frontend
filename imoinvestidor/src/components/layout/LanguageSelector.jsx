import { useLanguage } from "@contexts/LanguageContext";
import ptFlag from "@images/flags/flag_pt.svg";
import enFlag from "@images/flags/flag_en.svg";
import Dropdown from "@common/Dropdown";

export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  const flag = language === "pt" ? ptFlag : enFlag;

  return (
    <Dropdown
      trigger={
        <div className="flex items-center gap-2 hover:opacity-80">
          <img src={flag} alt={language} className="w-6 h-4 object-cover rounded-sm" />
          <span className="hidden sm:inline text-sm font-medium">{language.toUpperCase()}</span>
        </div>
      }
      align="right"
    >
      {(close) => (
        <div className="w-28">
          {["pt", "en"].map((lang) => (
            <div
              key={lang}
              onClick={() => {
                changeLanguage(lang);
                close();
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
    </Dropdown>
  );
}
