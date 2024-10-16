import { useSearchParams } from "next/navigation";

export default function useGetAllSearchParams() {
   const searchParams = useSearchParams();
   const params = [];

   searchParams.forEach((value, key) => {
      params.push({ name: key, value: value });
   });

   return params;
}
