"use client"

import { useQuery } from "@tanstack/react-query"

import { getUserInfo } from "@/services/user/change_info"

export default function Profile() {
   const { data, isLoading } = useQuery({
      queryKey: ["profile"],
      queryFn: () => getUserInfo(),
   })
   return (
      <div className="container mx-auto">
         {isLoading && "is Loading"}
         <p>{data?.username}</p>
         <p>{data?.email}</p>
      </div>
   )
}
