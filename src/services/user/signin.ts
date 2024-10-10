"use server";

import { redirect } from "next/navigation";
import { BASE_URL } from "../index";
import { cookies } from "next/headers";

export default async function signup(data: {
   username: string;
   password: string;
}) {
   const option = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   };

   try {
      const response = await fetch(`${BASE_URL}/user/login/`, option);

      const data = await response.json();
      if (response.status >= 200 && response.status < 300) {
         cookies().set({
            name: "session",
            value: data?.token,
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
         });
         redirect("/");
      }

      console.log({ data, response });
      return data;
   } catch (error) {
      return error;
   }
}
