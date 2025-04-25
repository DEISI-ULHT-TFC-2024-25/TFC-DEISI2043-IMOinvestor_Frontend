import { createContext, useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const { user } = useAuth();

  const getInitialLang = () => {
    if (user?.lang_key) {
      const lang = user.lang_key.toLowerCase();
      return lang === "eng" ? "en" : "pt";
    }

    const stored = localStorage.getItem("language");
    if (stored) return stored;

    return navigator.language.startsWith("pt") ? "pt" : "en";
  };

  const [language, setLanguage] = useState(getInitialLang);

  useEffect(() => {
    if (user?.lang_key) {
      const newLang = user.lang_key.toLowerCase() === "eng" ? "en" : "pt";
      setLanguage(newLang);
      localStorage.setItem("language", newLang);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const value = useMemo(() => ({ language, changeLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
