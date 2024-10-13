"use server";

import api from "@/services/index";
import { cookies } from "next/headers";

export default async function changeInfo() {
   try {
      const response = await api.put(
         "user/change_user_info/",
         {},
         {
            headers: {
               Authorization: `Token ${cookies().get("session")?.value}`,
               "Content-Type": "application/json",
            },
         }
      );

      return response.data;
   } catch (error) {
      // console.log(error);
      return error;
   }
}
