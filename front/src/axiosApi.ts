import axios from "axios";

const axiosApi = axios.create({
  baseURL: 'https://finance-tracker-api-tau.vercel.app'
});

export default axiosApi;