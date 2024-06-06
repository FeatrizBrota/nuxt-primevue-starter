<script setup>
import { useLayout } from "@/layouts/composables/layout";
import axios from "axios";
import { ref, computed } from "vue";
import AppConfig from "@/layouts/AppConfig.vue";
import { useAppStore } from "../../store/store";
import { UserStore } from "../../store/user";

const { layoutConfig } = useLayout();
const password = ref("");
const passwordConfirmation = ref("");
const apiValidationError = ref("");
const router = useRouter();
const route = useRoute();
const store = useAppStore();
const user_store = UserStore();

const loading = ref(false);

definePageMeta({
  layout: false,
});

const handleReset = async () => {
  loading.value = true;
  const token = route.query.token;
  const data = {
    token: token,
    password: password.value,
    password_confirmation: passwordConfirmation.value,
  };
  if (password.value != passwordConfirmation.value) {
    apiValidationError.value = "As senhas não coincidem";
    loading.value = false;
    return;
  } else {
    apiValidationError.value = "";
  }
  if (password.value.length < 8) {
    apiValidationError.value = "A senha deve ter no mínimo 8 caracteres";
    loading.value = false;
    return;
  } else {
    apiValidationError.value = "";
  }
  try {
    const response = await axios.post(`https://choppin-api.fastapp.cloud/api/user/reset_password`, data);
    console.log(response);

    if (response.status == 200) {
      router.push("/auth/login");
    }
  } catch (error) {
    console.log(error);
    apiValidationError.value = "Um erro ocorreu. Tente novamente.";
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
            <span class="text-600 font-medium">Escolha uma nova senha</span>
          </div>

          <div>
            <label for="password1" class="block text-900 font-medium text-xl mb-2">Senha</label>
            <Password
              id="password1"
              v-model="password"
              placeholder="Senha"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              :inputStyle="{ padding: '1rem' }"></Password>

            <label for="password1" class="block text-900 font-medium text-xl mb-2">Confirme sua senha</label>
            <Password
              id="password1"
              v-model="passwordConfirmation"
              placeholder="Confirme sua senha"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              :inputStyle="{ padding: '1rem' }"></Password>
            <span class="text-center block text-red-400 font-medium mb-3">{{ apiValidationError }}</span>

            <Button @click="handleReset" label="Confirmar" class="w-full p-3 text-xl"></Button>
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
