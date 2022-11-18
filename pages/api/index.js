import axios from "axios";
import { URLs } from "../../utils/constants";

const { BASE } = URLs;

const Instance = axios.create({
   baseURL: BASE,
   timeout: 15000,
   timeoutErrorMessage: "Your request timed out: Front",
   headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
   },
});

Instance.interceptors.request.use((request) => {
   return request;
});

Instance.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      if (error?.response?.status == 401 || error?.status == 401) {
         console.log("UNAUTHORIZED REQUEST");
      } else if (error != null && error.response.status == 402) {
         console.log("Something went wrong");
         throw new Error(error);
      } else {
         throw error;
      }
   }
);

export const Server = Instance;
