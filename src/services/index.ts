export const BASE_URL = "http://localhost:8000"

import axios from "axios"

export default axios.create({
   baseURL: process.env.BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
})
