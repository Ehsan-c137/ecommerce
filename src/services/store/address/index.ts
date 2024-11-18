"use server"

import api from "@/services/index"
import { cookies } from "next/headers"

export async function getAllAddress() {
   try {
      const { data } = await api.get("/store/address/", {
         headers: {
            Authorization: `Token ${cookies().get("session")?.value}`,
         },
      })

      return data
   } catch (error) {
      return error
   }
}

export async function createAddress(data: {
   name: string
   phone: string
   address: string
   coordinate?: string
}) {
   try {
      const response = await api.post("/store/address/", data, {
         headers: {
            Authorization: `Token ${cookies().get("session")?.value}`,
         },
      })
      return response.data
   } catch (error) {
      return error
   }
}

export async function editAddress(addressId: string) {
   try {
      const response = await api.put(`/store/address/${addressId}`, {
         headers: {
            Authorization: `Token ${cookies().get("session")?.value}`,
         },
      })
      return response.data
   } catch (error) {
      return error
   }
}

export async function deleteAddress(addressId: string) {
   try {
      const response = await api.delete(`/store/address/${addressId}`, {
         headers: {
            Authorization: `Token ${cookies().get("session")?.value}`,
         },
      })
      return response.data
   } catch (error) {
      return error
   }
}
