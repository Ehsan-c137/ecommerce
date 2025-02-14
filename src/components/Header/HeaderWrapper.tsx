"use server"

import Header from "./Header"
import checkLoggedin from "@/services/user/check_loggedin"

export default async function HeaderWrapper() {
   const { isLoggedIn } = await checkLoggedin()
   return <Header isLogged={isLoggedIn} />
}
