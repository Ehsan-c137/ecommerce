"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useHandleQueryParams() {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   return function (name: string, value: string) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      const currentQuery = current.getAll(name);
      if (currentQuery.includes(value)) {
         current.delete(name, value);
      } else {
         current.append(name, value);
      }

      const search = current.toString();

      router.push(`${pathname}${search ? `?${search}` : ""}`);
   };
}
