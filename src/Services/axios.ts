import axios from "axios";
// import tokenService from "./token.service";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.2.197:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = tokenService.getLocalAccessToken();
//     if (accessToken) {
//       config.headers!["Authorization"] = accessToken;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },

//   async (error) => {
//     const originalRequest = error.config; //originare.url
//     if (error.response.status === 403) {
//       originalRequest._retry = true;
//       const res = await getNewAccesToken();
//       tokenService.setToken(res.data);
//       const value: any = localStorage.getItem("token");
//       const data = JSON.parse(value);
//       console.log(data.access_token);
//       return res;
//     }
//   }
// );

// export const getNewAccesToken = async () => {
//   const string: any = localStorage.getItem("token");
//   const data = {
//     refresh_token: JSON.parse(string).refresh_token,
//   };
//   const res = await axiosInstance.post("/auth/token", data);
//   console.log(res);
//   return res;
// };