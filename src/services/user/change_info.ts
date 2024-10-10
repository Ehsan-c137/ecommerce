"use server";

import { cookies } from "next/headers";
import { BASE_URL } from "..";

const option = {
   method: "PUT",
   headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${cookies().get("session")?.value}`,
   },
};

export default async function changeInfo() {
   try {
      const response = await fetch(
         `${BASE_URL}/user/change_user_info/`,
         option
      );
      const data = await response.json();
      return data;
   } catch (error) {
      console.log(error);
      return error;
   }
}
