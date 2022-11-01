import axios from "axios";

export const BASE_URL = process.env.NEXT_API_URL
  ? "https://next-commerce-api.herokuapp.com/api/v1"
  : "http://localhost:8080/api/v1";

// export const NEXT_API_URL = "http://localhost:3000";

export default axios.create({
  baseURL: BASE_URL,
});
