import axios from "axios";

export default axios.create({
  baseURL: "https://petter-back.onrender.com",
  timeout: 100000,
  headers: { "Content-Type": "application/json" },
});
