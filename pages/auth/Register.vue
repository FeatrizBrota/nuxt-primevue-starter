<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <div class="text-center">
        <img src="../../assets/images/logo.png" alt="logo" class="mb-1 w-6rem flex-shrink-0" />
      </div>
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
        ">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-1">
            <span class="text-600 font-medium">Crie sua conta</span>
          </div>

          <div class="flex flex-column gap-1">
            <label for="name" class="block text-900 text-xl font-medium mb-2">Nome</label>
            <InputText
              id="name"
              v-model="formData.name"
              type="text"
              placeholder="Nome"
              class="w-full md:w-30rem mb-1"
              style="padding: 1rem" />

            <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
            <InputText
              id="email"
              v-model="formData.email"
              type="text"
              placeholder="Email"
              class="w-full md:w-30rem mb-1"
              style="padding: 1rem" />

            <label for="CPF" class="block text-900 text-xl font-medium mb-2">CPF</label>
            <InputText
              id="CPF"
              v-model="formData.cpf"
              type="text"
              placeholder="CPF"
              class="w-full md:w-30rem mb-1"
              style="padding: 1rem" />
            <div class="flex justify-content-between gap-1">
              <div>
                <label for="password" class="block text-900 text-xl font-medium mb-2">Senha</label>
                <Password
                  id="password"
                  v-model="formData.password"
                  placeholder="Senha"
                  :toggleMask="true"
                  class="w-full mb-3"
                  inputClass="w-full"
                  :inputStyle="{ padding: '1rem' }" />
              </div>
              <div>
                <label for="password2" class="block text-900 font-medium text-xl mb-2">Confirme sua senha</label>
                <Password
                  id="password2"
                  v-model="formData.confirmPassword"
                  placeholder="Confirme sua senha"
                  :toggleMask="true"
                  class="w-full mb-3"
                  inputClass="w-full"
                  :inputStyle="{ padding: '1rem' }" />
              </div>
            </div>

            <div class="flex align-items-center justify-content-between mb-1 gap-5">
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                @click="redirectToLogin">
                Já possuí registro?
              </a>
            </div>
            <Button label="Concluir registro" class="w-full p-3 text-xl" @click="registerUser"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { UserStore } from "../../store/user";


import { useLayout } from "@/layouts/composables/layout";

const user = UserStore();
const loading = ref(false);
const { layoutConfig } = useLayout();

definePageMeta({
  layout: false,
});

const router = useRouter();

const formData = ref({
  cpf: "",
  name: "",
  email: "",
  cpf: "",
  password: "",
  confirmPassword: "",
});
const displayError = ref({ status: false, message: "" });

const redirectToLogin = () => {
  router.push("/auth/login");
};

const registerUser = async () => {
  const { cpf, name, email, password, confirmPassword } = formData.value;
  const cpfDigits = cpf.replace(/\D/g, "");
  const payload = {
    //cpf: cpfDigits,
    name: name,
    email: email,
    password: password,
    password_confirmation: confirmPassword,
  };
  console.log(payload);
  loading.value = true;
  axios
    .post(`https://choppin-api.fastapp.cloud/api/user/register`, payload)
    .then((response) => {
      displayError.value.status = false;
      if (response.status === 200 || response.status === 201) {
        router.push("/auth/login");
      }
    })
    .catch((error) => {
      let error_message = error.response?.data?.errors;
      displayError.value.status = false;
      if (error.response?.status === 404) {
        displayError.value.status = true;
        displayError.value.message =
          "Não há registro de cliente Futuro para o CPF informado. Verifique o CPF e tente novamente";
      } else if (error_message?.cpf) {
        displayError.value.status = true;
        displayError.value.message = "Informe o seu CPF";
      } else if (error_message?.name) {
        displayError.value.status = true;
        displayError.value.message = "Informe o seu nome completo";
      } else if (error_message?.email) {
        if (error_message.email[0] === "The email field is required.") {
          displayError.value.status = true;
          displayError.value.message = "Informe seu e-mail";
        } else if (error_message.email[0] === "The email has already been taken.") {
          displayError.value.status = true;
          displayError.value.message =
            "Já existe uma conta para o e-mail informado. Informe um novo e-mail ou acesse sua conta com o e-mail informado";
        }
      } else if (error_message?.password) {
        if (error_message.password[0] == "The password field is required.") {
          displayError.value.status = true;
          displayError.value.message = "Informe sua senha";
        } else if (error_message.password[0] == "The password confirmation does not match.") {
          displayError.value.status = true;
          displayError.value.message = "As senhas informadas não conferem. Verifique-as e tente novamente";
        } else if (error_message.password[0] == "The password must be at least 8 characters.") {
          displayError.value.status = true;
          displayError.value.message = "Informe uma senha com pelo menos 8 caracteres";
        }
      } else {
        displayError.value.status = true;
        displayError.value.message = "Ocorreu um erro ao tentar realizar o cadastro. Tente novamente mais tarde";
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style lang="css" scoped></style>
