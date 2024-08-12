// "use client";

// import { API_DOWNLOAD_FILE, defaultServerURL } from "@/config/endpoints";
// import axios from "axios";
// import moment from "moment";

// export const loadStorage = (key) =>
//   typeof window !== "undefined" && localStorage.getItem(key);

// export const dispatchStorage = (key, data) =>
//   typeof window !== "undefined" && localStorage.setItem(key, data);

// export const getToken = async () => {
//   try {
//     const storage = await loadStorage("persist:root");
//     let token = null;
//     if (storage) {
//       const parsedStorage = JSON.parse(storage);
//       const authData = parsedStorage.auth;
//       if (authData) {
//         const data = JSON.parse(authData).data;
//         if (data) {
//           token = data?.accessToken;
//         }
//       }
//     }
//     return token;
//   } catch (error) {
//     console.error("Error while getting token:", error);
//     return null;
//   }
// };

// export const getLocalizedKey = (object, key) => {
//   const currentLocale = loadStorage("intl");
//   if (object) {
//     const localizedKey = object[key];

//     if (localizedKey) {
//       if (currentLocale === "ar") {
//         return localizedKey && localizedKey.value_ar
//           ? localizedKey.value_ar
//           : localizedKey.value_en;
//       }
//       return localizedKey ? localizedKey.value_en : "";
//     }
//   }

//   return "";
// };

// export const getTranslationName = (object, lang) => {
//   if (!object || !lang) return "";

//   if (lang == "en")
//     return object["value_en"] ? object["value_en"] : object["value_ar"];
//   else return object["value_ar"] ? object["value_ar"] : object["value_en"];
// };



// const downloadFile = async (key, isSplit = true) => {
//   try {
//     const response = await axios.get(
//       `${defaultServerURL}${API_DOWNLOAD_FILE}`,
//       {
//         params: { key: isSplit ? key.split("75973")[0] : key },
//         headers: { imageKey: "xzic2b7Fei1GJlKuQsJcBtIo12qfnJ5W" },
//         progressBar: true,
//         responseType: "blob",
//       }
//     );
//     return response.data;
//   } catch (err) {
//     return null;
//   }
// };

// export const showFile = async (key, withSeperator = true) => {
//   if (_.isObject(key)) {
//     const fileURL = URL.createObjectURL(key);
//     const pdfWindow = window.open();
//     pdfWindow.location.href = fileURL;
//   } else {
//     if (key) {
//       const file = await createObjectURLOfFile(key, withSeperator);
//       window.open(file);
//     }
//   }
// };


// export function getCookie(name) {
//   var cookies = document.cookie.split(";");
//   for (var i = 0; i < cookies.length; i++) {
//     var cookie = cookies[i].trim();
//     if (cookie.startsWith(name + "=")) {
//       var value = cookie.substring(name.length + 1);
//       return decodeURIComponent(value); // Decode the value (it may be URL-encoded)
//     }
//   }
//   return null; // Cookie not found
// }


// export function capitalizeFirstLetter(str) {
//   if (!str) return str;
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

// export function capitalizeAllStartingLetters(str) {
//   return str.replace(/\b\w/g, function (char) {
//     return char.toUpperCase();
//   });
// }
