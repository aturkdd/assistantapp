"use client";
import i18n from "../../i18n";
class langUtils {
  currentLanguage() {
    if (typeof window !== "undefined")
      return localStorage.getItem("currentLanguage");
    else return null;
  }
  switchLanguage(lang) {
    console.log(lang);
    i18n.changeLanguage(lang);
    if (typeof window !== "undefined")
      localStorage.setItem("currentLanguage", lang);
  }
}
export default new langUtils();
