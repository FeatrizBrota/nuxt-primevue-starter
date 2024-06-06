import axios from "axios";
import { UserStore } from "../store/user";

const apiKey = "AIzaSyCPCFUYUccEK8T59PnCCuQjpQ5rubU5JgM";

export const UserService = {
  getUserData() {
    const token = localStorage.getItem("token");
    return axios.get("https://choppin-api.fastapp.cloud/api/user", { headers: { Authorization: `Bearer ${token}` } });
  },
  async getAddress(lat, lng) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    if (response.data.results[0]) {
      return response.data.results[0];

      //`${response.data.results[0].address_components[1].long_name}, ${response.data.results[0].address_components[0].long_name}`;
    }
  },
  async getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const store = UserStore();
        store.userLocale = await UserService.getAddress(latitude, longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  },
  async fetchCoordinates(address) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );
    if (response.data.results[0]) {
      return response.data.results[0].geometry.location;
    } else {
      throw new Error("No results found");
    }
  },
};
