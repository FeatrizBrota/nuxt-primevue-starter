import { defineStore } from "pinia";
import axios from "axios";

//App - choppin
export const useAppStore = defineStore("app", {
  state: () => ({
    marketplace: {
      data: [],
      total: null,
      loading: false,
      loaded: false,
    },
    product: {
      data: [],
      total: null,
      loading: false,
      loaded: false,
    },
    customer: {
      data: [],
      total: null,
      loading: false,
      loaded: false,
    },
    product_category: {
      data: [],
      total: null,
      loading: false,
      loaded: false,
    },
    order_item: {
      data: [],
      total: null,
      loading: false,
      loaded: false,
    },
    cart_item: {
      data: [],
      total: null,
      loading: false,
      loaded: false,
      notification: false,
      temp_data: [],
      modal: false,
    },
    order_status: {
      data: [],
      total: null,
      loading: false,
      loaded: false,
    },
    product_subcategory: {
      data: [],
      total: null,
      loading: false,
      loaded: false,
    },
    stock: {
      data: [],
      total: null,
      loading: false,
      loaded: false,
    },
    offer: {
      data: [],
      total: null,
      loading: false,
      loaded: false,
    },
    order: {
      data: [],
      total: null,
      loading: false,
      loaded: false,
    },
    user_order: {
      data: [],
      total: null,
      loading: false,
      loaded: false,
    },
  }),
  actions: {
    addToCart(product) {
      if (this.cart_item.data.length != 0 && product.id_marketplace != this.cart_item.data[0].id_marketplace) {
        this.cart_item.notification = true;
        this.cart_item.temp_data = product;
        return;
      }
      this.cart_item.notification = false;

      this.cart_item.data.push(product);
      localStorage.setItem("cart_item", JSON.stringify(this.cart_item));
    },
    CleanAndAddItem() {
      this.cart_item.data = [];
      localStorage.removeItem("cart_item");
      this.cart_item.data.push(this.cart_item.temp_data);
    },
    get_marketplace(params = {}) {
      this.marketplace.loading = true;
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `${useRuntimeConfig().public.apiUrl}/marketplace`,
        headers: { Authorization: `Bearer ${token}` },
        params,
      };

      axios(config)
        .then((response) => {
          this.marketplace.data = response.data.data;
          this.marketplace.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.marketplace.loading = false;
        });
    },
    get_user_order(params = {}) {
      this.product.loading = true;
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `https://choppin-api.fastapp.cloud/api/store/user_order`,
        headers: { Authorization: `Bearer ${token}` },
        params,
      };

      axios(config)
        .then((response) => {
          this.user_order.data = response.data.data;
          this.user_order.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.user_order.loading = false;
        });
    },
    get_product(params = {}) {
      this.product.loading = true;
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `${useRuntimeConfig().public.apiUrl}/product`,
        headers: { Authorization: `Bearer ${token}` },
        params,
      };

      axios(config)
        .then((response) => {
          this.product.data = response.data.data;
          this.product.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.product.loading = false;
        });
    },
    get_customer(params = {}) {
      this.customer.loading = true;
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `${useRuntimeConfig().public.apiUrl}/customer`,
        headers: { Authorization: `Bearer ${token}` },
        params,
      };

      axios(config)
        .then((response) => {
          this.customer.data = response.data.data;
          this.customer.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.customer.loading = false;
        });
    },
    get_product_category(params = {}) {
      this.product_category.loading = true;
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `${useRuntimeConfig().public.apiUrl}/product_category`,
        headers: { Authorization: `Bearer ${token}` },
        params,
      };

      axios(config)
        .then((response) => {
          this.product_category.data = response.data.data;
          this.product_category.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.product_category.loading = false;
        });
    },
    get_order_item(params = {}) {
      this.order_item.loading = true;
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `${useRuntimeConfig().public.apiUrl}/order_item`,
        headers: { Authorization: `Bearer ${token}` },
        params,
      };

      axios(config)
        .then((response) => {
          this.order_item.data = response.data.data;
          this.order_item.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.order_item.loading = false;
        });
    },
    get_cart_item(params = {}) {
      this.cart_item.loading = true;
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `${useRuntimeConfig().public.apiUrl}/cart_item`,
        headers: { Authorization: `Bearer ${token}` },
        params,
      };

      axios(config)
        .then((response) => {
          this.cart_item.data = response.data.data;
          this.cart_item.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.cart_item.loading = false;
        });
    },
    get_order_status(params = {}) {
      this.order_status.loading = true;
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `${useRuntimeConfig().public.apiUrl}/order_status`,
        headers: { Authorization: `Bearer ${token}` },
        params,
      };

      axios(config)
        .then((response) => {
          this.order_status.data = response.data.data;
          this.order_status.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.order_status.loading = false;
        });
    },
    get_product_subcategory(params = {}) {
      this.product_subcategory.loading = true;
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `${useRuntimeConfig().public.apiUrl}/product_subcategory`,
        headers: { Authorization: `Bearer ${token}` },
        params,
      };

      axios(config)
        .then((response) => {
          this.product_subcategory.data = response.data.data;
          this.product_subcategory.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.product_subcategory.loading = false;
        });
    },
    get_stock(params = {}) {
      this.stock.loading = true;
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `${useRuntimeConfig().public.apiUrl}/stock`,
        headers: { Authorization: `Bearer ${token}` },
        params,
      };

      axios(config)
        .then((response) => {
          this.stock.data = response.data.data;
          this.stock.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.stock.loading = false;
        });
    },
    get_offer(params = {}) {
      this.offer.loading = true;
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `${useRuntimeConfig().public.apiUrl}/offer`,
        headers: { Authorization: `Bearer ${token}` },
        params,
      };

      axios(config)
        .then((response) => {
          this.offer.data = response.data.data;
          this.offer.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.offer.loading = false;
        });
    },
    get_order(params = {}) {
      this.order.loading = true;
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `${useRuntimeConfig().public.apiUrl}/order`,
        headers: { Authorization: `Bearer ${token}` },
        params,
      };

      axios(config)
        .then((response) => {
          this.order.data = response.data.data;
          this.order.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.order.loading = false;
        });
    },
  },
  getters: {
    // marketplacesWithDistance(state) {
    //   const userStore = UserStore();
    //   if (!userStore.getUserSelectedAddress) {
    //     return [];
    //   }
    //   const userLat = userStore.getUserSelectedAddress.lat;
    //   const userLng = userStore.getUserSelectedAddress.lng;
    //   return state.marketplace.data;
    //   return state.marketplace.data.map((marketplace) => {
    //     const distance = getDistanceInMeters(userLat, userLng, marketplace.lat, marketplace.lng);
    //     return { ...marketplace, distance };
    //   });
    // },
  },
});
