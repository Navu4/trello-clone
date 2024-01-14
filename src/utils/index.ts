import CryptoJS from "crypto-js";
import { DashboardType, UserDataType } from "../types/app.constants";

export const getUsersData = () => {
  const localData = localStorage.getItem("usersData");
  return localData ? JSON.parse(localData) : [];
};

export const setUsersData = (usersData: UserDataType[]) => {
  localStorage.setItem("usersData", JSON.stringify(usersData));
};

export const getUserToken = () => {
  const localData = localStorage.getItem("token");
  return localData ? JSON.parse(localData) : null;
};

export const setUserToken = (token: string) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const encryptData = (text: any) => {
  const key = import.meta.env.VITE_ENCRYPTION_SECRET_KEY;
  const data = CryptoJS.AES.encrypt(JSON.stringify(text), key).toString();

  return data;
};

export const decryptData = (text: any) => {
  const bytes = CryptoJS.AES.decrypt(
    text,
    import.meta.env.VITE_ENCRYPTION_SECRET_KEY
  );

  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};

export async function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

export const setDashBoardDataToLocalStorage = (
  key: string,
  data: DashboardType
) => {
  let dashboardData: any = localStorage.getItem("dashboardData");
  if (dashboardData) {
    dashboardData = JSON.parse(dashboardData);
  } else dashboardData = {};

  dashboardData[key] = data;
  localStorage.setItem("dashboardData", JSON.stringify(dashboardData));
};

export const getDashBoardDataFromLocalStorage = (key: string) => {
  let dashboardData: DashboardType | any =
    localStorage.getItem("dashboardData");
  if (dashboardData) {
    dashboardData = JSON.parse(dashboardData);
  } else dashboardData = {};

  return dashboardData[key] || null;
};

export const deleteDashboardDataFromLocalStorage = (key: string) => {
  let dashboardData: any = localStorage.getItem("dashboardData");
  if (dashboardData) {
    dashboardData = JSON.parse(dashboardData);
  } else dashboardData = {};

  delete dashboardData[key];
  localStorage.setItem("dashboardData", JSON.stringify(dashboardData));
};

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};