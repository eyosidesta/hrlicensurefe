<template>
  <div
    class="card-wrapper bg-white sm:rounded-lg w-full p-large flex flex-col justify-center items-center relative pt-8 pb-8"
  >
    <button
      class="absolute top-0 right-0 mr-2 mt-2"
      @click="$emit('closeModal', false)"
      variant="rounded"
    >
      <svg
        viewBox="0 0 329.269 329"
        xmlns="http://www.w3.org/2000/svg"
        class="close-svg fill-current text-primary-100 relative"
      >
        <path
          d="M194.8 164.77L323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0015.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0015.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0"
        />
      </svg>
    </button>
    <Title message="Sign up" />
    <form
      class="flex flex-col justify-center items-center w-full mt-4"
      @submit.prevent="submit"
    >
      <input type="hidden" name="remember" value="true" />
      <div class="flex flex-col mb-medium w-full">
        <label>Email</label>
        <input
          v-model="credentials.emailAddress"
          id="email-address"
          name="email"
          type="email"
          autocomplete="email"
          required
        />
        <span style="color: red">{{ credentialsErrors.email }}</span>
      </div>
      <div class="flex flex-col mb-medium w-full">
        <label for="password">Phone Number</label>
        <input
          v-model="credentials.phoneNumber"
          id="phone"
          name="phone"
          type="text"
          autocomplete="current-number"
          required
        />
        <span style="color: red">{{ credentialsErrors.phoneNumber }}</span>
      </div>
      <div class="flex flex-col mb-medium w-full">
        <label>Password</label>
        <input
          v-model="credentials.password"
          type="password"
          id="password"
          name="password"
          autocomplete="current-password"
          required
          v-on:keyup="showPasswordStrength(credentials.password)"
        />
        <password-meter :password="credentials.password" />
        <div v-if="passwordStrengthDisplay">
          <ul>
            Password should be:
            <div class="ml-16 pl-8">
              <li>
                Minimum of Eight Characters
              </li>
              <li>
                At least one Uppercase Character
              </li>
              <li>
                At least one Lowercase Character
              </li>
              <li>
                At least one Number
              </li>
              <li>
                At least one special Character
              </li>
            </div>
          </ul>
        </div>
        <span style="color: red">{{ credentialsErrors.password }}</span>
      </div>
      <div class="flex flex-col mb-medium w-full">
        <label>Re-type Password</label>
        <input
          v-model="credentials.repassword"
          type="password"
          id="repassword"
          name="password"
          autocomplete="current-password"
          required
        />
        <password-meter :password="credentials.repassword" />
        <span style="color: red">{{ credentialsErrors.repassword }}</span>
      </div>
      <div v-if="!message.showLoading">
        <button click="submit()">
          Sign up
        </button>
      </div>
      <Spinner
        v-if="message.showLoading"
        class="mt-4 mb-4"
        style="width:20px; height:20px"
      />
      <a
        class="text-base text-primary-500 hover:underline cursor-pointer"
        @click="$emit('redirectToLogin')"
        >Already have an account? Log in
      </a>
    </form>
  </div>
  <div v-if="message.showFlash">
    <FlashMessage message="Signup Successful!" />
  </div>
  <div v-if="message.showErrorFlash">
    <ErrorFlashMessage v-bind:message="message.errorMessage" />
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import Title from "@/sharedComponents/Title";
import { useRouter } from "vue-router";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import Spinner from "@/sharedComponents/Spinner";
import PasswordMeter from "vue-simple-password-meter";

export default {
  components: {
    Title,
    FlashMessage,
    ErrorFlashMessage,
    Spinner,
    PasswordMeter,
  },
  props: ["closeModal"],
  setup({ emit }) {
    const store = useStore();
    const router = useRouter();
    let message = ref({
      showFlash: false,
      showErrorFlash: false,
      showLoading: false,
      errorMessage: "",
    });
    const credentials = ref({
      emailAddress: "",
      phoneNumber: "",
      password: "",
      repassword: "",
    });
    const password = ref("");
    const passwordStrengthDisplay = ref(false);
    const credentialsErrors = ref({
      emailAddress: undefined,
      phoneNumber: undefined,
      password: undefined,
      repassword: undefined,
    });
    const showPasswordStrength = (password) => {
      if (password != "") {
        passwordStrengthDisplay.value = true;
      } else {
        passwordStrengthDisplay.value = false;
      }
    };
    const submit = () => {
      let signup = {
        emailAddress: credentials.value.emailAddress.toLowerCase(),
        phoneNumber: credentials.value.phoneNumber,
        password: credentials.value.password,
      };
      if (!validateForm(credentials.value)) {
        message.value.showLoading = true;
        message.value.showFlash = false;
        message.value.showErrorFlash = false;
        store.dispatch("user/signUp", signup).then((res) => {
          if (res.data.status == "Error") {
            message.value.showLoading = false;
            message.value.showFlash = false;
            message.value.showErrorFlash = true;
            message.value.errorMessage = res.data.message;
            setTimeout(() => {
              message.value.showErrorFlash = false;
            }, 3000);
          } else if (res.data.status == "Success") {
            message.value.showLoading = false;
            message.value.showFlash = true;
            message.value.showErrorFlash = false;
            setTimeout(() => {
              location.reload();
            }, 1500);
          } else {
            message.value.showFlash = false;
            message.value.showErrorFlash = true;
            message.value.erroMessage = "Something went wrong please try again";
          }
        });
      }
    };
    const isEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };
    const validateForm = (formData) => {
      const errors = {};
      if (!formData.emailAddress) errors.emailAddress = "Email Required";
      if (!formData.phoneNumber) errors.phoneNumber = "Phone Number Required";
      if (!formData.password) errors.phoneNumber = "Password Required";
      if (!formData.repassword) errors.repassword = "Re-enter Password";
      if (formData.emailAddress && !isEmail(formData.emailAddress)) {
        errors.emailAddress = "Invalid Email";
      }
      if (formData.password != formData.repassword) {
        errors.repassword = "Passwords don't match";
      }
      credentialsErrors.value = errors;
      if (Object.keys(errors).length === 0) return false;
      return true;
    };
    return {
      credentials,
      credentialsErrors,
      submit,
      isEmail,
      validateForm,
      message,
      password,
      showPasswordStrength,
      passwordStrengthDisplay,
    };
  },
};
</script>
<style lang="postcss" scoped>
.close-svg {
  width: 16px;
}
.card-wrapper {
  max-width: 450px;
  box-shadow: 0px -8px 6px rgb(30 64 175 / 51%);
  height: auto;
}
@screen md {
  .card-wrapper {
    box-shadow: 0px 3px 6px #1e40af82;
  }
}
ul {
  list-style-type: square;
}
</style>
