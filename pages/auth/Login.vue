<script setup>
import { useLayout } from "@/layouts/composables/layout";
import axios from "axios";
import { ref, computed } from "vue";
import AppConfig from "@/layouts/AppConfig.vue";
import { useAppStore } from "../../store/store";
import { UserStore } from "../../store/user";

const { layoutConfig } = useLayout();
const email = ref("");
const password = ref("");
const apiValidationError = ref("");
const router = useRouter();
const route = useRoute();
const store = useAppStore();
const user_store = UserStore();


const loading = ref(false);

definePageMeta({
  layout: false,
});

const continueAsGuest = () => {
  router.push("/marketplace");
};

const navigateToRegister = () => {
  router.push("/auth/register");
};

const navigateToForgot = () => {
  router.push("/auth/forgot");
};

const login = async () => {
  const data = {
    email: email.value,
    password: password.value,
  };
  loading.value = true;
  console.log("login", data);
  try {
    const response = await axios.post(`https://choppin-api.fastapp.cloud/api/user/login`, data);
    console.log(response);

    if (response.status == 201) {
      console.log("login success");
      apiValidationError.value = "";
      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem("token", token);

      user_store.saveToken(token);
      user_store.saveUser(user);
      user_store.authenticated = true;

      const cookie = `token=${token}; path=/; max-age=86400; samesite=strict`;
      document.cookie = cookie;
      console.log("redirect", route.query.redirectedFrom);
      if (route.query.redirectedFrom) {
        router.push(route.query.redirectedFrom);
      } else {
        router.push("/marketplace");
      }
    }
  } catch (error) {
    apiValidationError.value = "Unable to access your account. Please check your email and password and try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <img src="../../assets/images/logo.png" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
        ">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <span class="text-600 font-medium">Faça Login para continuar ou</span>

            <a
              @click="navigateToRegister"
              class="font-medium no-underline ml-2 text-right cursor-pointer"
              style="color: var(--primary-color)"
              >Crie uma conta</a
            >
          </div>

          <div>
            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
            <InputText
              id="email1"
              v-model="email"
              type="text"
              placeholder="Email"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem" />

            <label for="password1" class="block text-900 font-medium text-xl mb-2">Senha</label>
            <Password
              id="password1"
              v-model="password"
              placeholder="Senha"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              :inputStyle="{ padding: '1rem' }"></Password>

            <div class="flex align-items-center justify-content-between mb-5 gap-5">
              <a
                @click="navigateToForgot"
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                >Esqueceu a senha?</a
              >
            </div>
            <Button @click="login" label="Entrar" class="w-full p-3 text-xl"></Button>
            <div class="flex align-items-center">
              <a
                @click="continueAsGuest"
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                >Continuar como convidado</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}
.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
