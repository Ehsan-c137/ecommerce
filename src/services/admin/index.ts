"use server";

import api from "@/services/index";

import { redirect } from "next/navigation";

import { cookies } from "next/headers";

export default async function signup(data: {
   username: string;
   password: string;
}) {
   try {
      // const response = await fetch(`${BASE_URL}/admin/`, option);
      const response = await api.post("/admin/", data, {
         headers: {
            Authorization: `Token ${cookies().get("session")?.value}`,
         },
      });
      // const data = await response.json();
      if (response.status >= 200 && response.status < 300) {
         // cookies().set({
         //    name: "session",
         //    value: data?.token,
         //    maxAge: 24 * 60 * 60 * 1000,
         //    httpOnly: true,
         // });
         redirect("/");
      }

      console.log({ data, response });
      return response.data;
   } catch (error) {
      return error;
   }
}
