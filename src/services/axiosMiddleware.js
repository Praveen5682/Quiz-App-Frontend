import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_QUIZ_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accesstoken = localStorage.getItem("accesstoken");
    const roleid = Number(localStorage.getItem("roleid"));
    const userid = localStorage.getItem("userid");

    if (accesstoken) {
      config.headers["auth"] = accesstoken;
    }

    if (roleid) {
      config.headers["roleid"] = roleid;
    }

    if (userid) {
      config.headers["userid"] = Number(userid);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

console.log("Base URL:", axiosInstance.defaults.baseURL);

export default axiosInstance;
