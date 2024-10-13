"use server";

import { cookies } from "next/headers";

export default async function checkLoggedin() {
   try {
      const cookie = cookies().get("session");

      return cookie?.value !== undefined;
   } catch (error) {
      console.log(error);
      return false;
   }
}
