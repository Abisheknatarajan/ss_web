export const WEB_ROOT_URL = process.env.REACT_APP_PROXY_WEB;
const API_ROOT_URL = "https://localhost:7099";
console.log(API_ROOT_URL)
export const AJAX_TIMEOUT = Number(process.env.REACT_APP_AJAX_TIMEOUT);

export const JSON_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};
export const CSV_HEADERS = {
  Accept: "text/csv",
  "Content-Type": "application/json; charset=utf-8",
};
export const PDF_HEADERS = {
  Accept: "application/pdf",
  "Content-Type": "application/json; charset=utf-8",
};
export const DIALOG_TITLE = {
  PERSONAL_EXPENSE: "PersonalExpense",
  CATEGORY: "Category",
};

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  UPDATE_OK: 204,
  UPDATE_NG: 409,
} as const;

// 講師ログイン

export const HOME = API_ROOT_URL + "/api/WeatherForecast/test";

//ログイン
export const LOGIN_AUTHENTICATION_API_URL = API_ROOT_URL + "/api/Login/login";
export const RemoteRegister = API_ROOT_URL + "/api/RemoteReg/RemoteReg";