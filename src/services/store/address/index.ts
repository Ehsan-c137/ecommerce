import api from "@/services/index"

export async function getAllAddress() {
   try {
      const response = await api.get("/store/address")
      return response.data
   } catch (error) {
      return error
   }
}

export async function createAddress(data) {
   try {
      const response = await api.post("/store/address", data)
      return response.data
   } catch (error) {
      return error
   }
}

export async function editAddress(addressId: string) {
   try {
      const response = await api.put(`/store/address/${addressId}`)
      return response.data
   } catch (error) {
      return error
   }
}

export async function deleteAddress(addressId: string) {
   try {
      const response = await api.delete(`/store/address/${addressId}`)
      return response.data
   } catch (error) {
      return error
   }
}
