"use server";

import { cookies } from "next/headers";

export default async function logout() {
   try {
      cookies().delete("session");
   } catch (error) {
      console.log(error);
   }
}
