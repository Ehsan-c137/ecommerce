export const BASE_URL = "http://localhost:8000"

import axios from "axios"

export default axios.create({
   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
})
