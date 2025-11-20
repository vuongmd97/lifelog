import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import commonUs from "./us/common";
import commonVi from "./vi/common";

import settingsUs from "./us/settings";
import settingsVi from "./vi/settings";

import authUs from "./us/auth";
import authVi from "./vi/auth";

const resources = {
  en: {
    common: commonUs,
    settings: settingsUs,
    auth: authUs,
  },

  vi: {
    common: commonVi,
    settings: settingsVi,
    auth: authVi,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    debug: false,
    ns: ["common", "auth"],
    defaultNS: "common",
    keySeparator: false,
    interpolation: { escapeValue: false, formatSeparator: "," },
    react: { useSuspense: false },
  });

export default i18n;
