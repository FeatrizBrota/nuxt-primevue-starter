<script setup>
import { useLayout } from "@/layouts/composables/layout";
import axios from "axios";
import { ref, computed } from "vue";
import AppConfig from "@/layouts/AppConfig.vue";
import { useAppStore } from "../../store/store";
import { UserStore } from "../../store/user";

const { layoutConfig } = useLayout();
const email = ref("");
const apiValidationError = ref("");
const router = useRouter();
const route = useRoute();
const store = useAppStore();
const user_store = UserStore();

const loading = ref(false);

definePageMeta({
  layout: false,
});

const navigatoToLogin = () => {
  router.push("/auth/login");
};

const handleForget = async () => {
  const data = {
    email: email.value,
  };
  loading.value = true;
  try {
    const response = await axios.post(`https://choppin-api.fastapp.cloud/api/user/forgot_password`, data);

    if (response.status == 200) {
      apiValidationError.value = "";
      router.push("/auth/login");
    }
  } catch (error) {
    console.log(error);
    apiValidationError.value = "Error";
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
            <span class="text-600 font-medium">Enviaremos um email para alteração de senha</span>
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

            <Button @click="handleForget" label="Enviar" class="w-full p-3 text-xl"></Button>
            <div class="flex align-items-center">
              <a
                @click="navigatoToLogin"
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                >Voltar para Login</a
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
