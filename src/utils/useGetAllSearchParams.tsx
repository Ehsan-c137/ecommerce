import { useSearchParams } from "next/navigation"

export default function useGetAllSearchParams() {
   const searchParams = useSearchParams()
   const params = [] as { name: string; value: string }[]

   searchParams.forEach((value, key) => {
      params.push({ name: key, value: value })
   })

   return params
}
