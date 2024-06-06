import { defineStore } from "pinia";
import { UserService } from "../service/UserService";
import { AddressService } from "../service/AddressService";

//App - choppin
export const UserStore = defineStore("userApp", {
  state: () => ({
    authenticated: false,
    token: null,
    user: {
      id: "",
      name: "",
      email: "",
      address: [],
    },
    userLocale: null,
    selectedAddress: null,
  }),
  actions: {
    saveToken(tokenValue) {
      this.token = tokenValue;
      console.log(this.token);
    },
    getUser() {
      UserService.getUserData()
        .then((response) => {
          this.user = response.data.user;
          this.authenticated = true;
        })
        .then(() => {
          this.getUserAddress();
        })
        .catch((error) => {
          console.error(error);
          this.authenticated = false;
        });
    },
    async getUserAddress() {
      try {
        const response = await AddressService.getAddressById({ id_user: this.user.id });
        this.user.address = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    saveUser(user) {
      this.user = user;
      console.log(this.user);
    },
  },
  getters: {
    getUserSelectedAddress(state) {
      if (!state.selectedAddress) {
        return 
      }
      return state.selectedAddress;
    },
  },
});
