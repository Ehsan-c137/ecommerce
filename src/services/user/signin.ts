"use server";

import api from "@/services/index";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export default async function signup(data: {
   username: string;
   password: string;
}) {
   try {
      const response = await api.post("/user/login/", data);

      if (response.status >= 200 && response.status < 300) {
         cookies().set({
            name: "session",
            value: response.data?.token,
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
         });
      }

      return response.data;
   } catch (error) {
      if (error instanceof AxiosError) {
         return error.response?.data;
      }
      return error;
   }
}
