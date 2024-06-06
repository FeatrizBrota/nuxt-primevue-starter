import axios from "axios";

export const AddressService = {
  async postAddress(data) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${useRuntimeConfig().public.apiUrl}/user_address`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  async getAddressById(params = {}) {
    const token = localStorage.getItem("token");
    const config = {
      method: "get",
      url: `${useRuntimeConfig().public.apiUrl}/user_address`,
      headers: { Authorization: `Bearer ${token}` },
      params,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async deleteAddress(id) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`${useRuntimeConfig().public.apiUrl}/user_address/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  async patchAddress(id, data) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(`${useRuntimeConfig().public.apiUrl}/user_address/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};
