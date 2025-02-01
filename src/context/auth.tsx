import { getSession } from "@/utils/session"
import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
   isAuthenticated: boolean
   setIsAuthenticated: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
   const context = useContext(AuthContext)
   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider")
   }
   return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   // const login = (user: any) => setIsAuthenticated(true)
   // const logout = () => setIsAuthenticated(false)

   const checkSession = async () => {
      const cookie = await getSession()
      setIsAuthenticated(cookie.isAuthenticated)
   }
   useEffect(() => {
      checkSession()
   }, [])

   return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
         {children}
      </AuthContext.Provider>
   )
}
