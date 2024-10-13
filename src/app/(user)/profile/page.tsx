"use client";

import Link from "next/link";
import { Icons } from "../Icons/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import logout from "@/services/user/logout";
import getProfile from "@/services/user/change_info";

export default function Profile() {
   const { data, status, isSuccess, isLoading } = useQuery({
      queryKey: ["profile"],
      queryFn: () => getProfile(),
   });
   return (
      <div className="container mx-auto">
         {isLoading && "is Loading"}
         <p>{data?.username}</p>
         <p>{data?.email}</p>
      </div>
   );
}
