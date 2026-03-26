import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Locale, defaultLocale, supportedLocales, translations } from "@/i18n/translations";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const STORAGE_KEY = "smart-farm-language";

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const getNestedValue = (obj: unknown, path: string) =>
  path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);

const translate = (key: string, locale: Locale): string => {
  const localized = getNestedValue(translations[locale], key);
  if (typeof localized === "string") {
    return localized;
  }
  const fallback = getNestedValue(translations[defaultLocale], key);
  if (typeof fallback === "string") {
    return fallback;
  }
  return key;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    return supportedLocales.some((option) => option.value === stored) ? (stored as Locale) : defaultLocale;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, locale);
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: string) => translate(key, locale),
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

