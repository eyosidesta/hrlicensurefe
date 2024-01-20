<template>
  <div
    class="card-wrapper bg-white sm:rounded-lg w-full p-large flex flex-col justify-center items-center relative"
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

    <Title message="Log In" />

    <form
      @submit.prevent="submit"
      class="flex flex-col justify-center items-center w-full mt-4"
    >
      <div class="flex flex-col mb-medium w-full">
        <label>Email</label>
        <input
          v-model="credentials.email"
          id="email-address"
          name="email"
          type="email"
          autocomplete="email"
          required
        />
        <span style="color: red">{{ credentialsErrors.email }}</span>
      </div>
      <div class="flex flex-col mb-tiny w-full">
        <label>Password</label>
        <input
          v-model="credentials.password"
          type="password"
          id="password"
          name="password"
          autocomplete="current-password"
          required
        />
        <span style="color: red">{{ credentialsErrors.password }}</span>
      </div>
      <a
        href="#"
        class="text-primary-500 w-full text-right mr-small hover:underline"
      >
        Forgot password?
      </a>
      <button v-if="!showLoading" click="submit()" class="mt-medium">Login</button>
    </form>
    <Spinner
      v-if="showLoading"
      class="mt-4 mb-4"
      style="width:20px; height:20px"
    />
  </div>
  <div class="mr-3xl" v-if="message.showFlash">
    <FlashMessage message="Login Successful!" />
  </div>
  <div v-if="message.showErrorFlash">
    <ErrorFlashMessage message="Incorrect username or password" />
  </div>
</template>
<script>
import Title from "@/sharedComponents/Title";
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import Spinner from "@/sharedComponents/Spinner";
export default {
  components: { Title, FlashMessage, ErrorFlashMessage, Spinner },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();

    let showLoading = ref(false);
    let message = ref({
      showFlash: false,
      showErrorFlash: false,
    });

    const credentials = ref({
      email: "",
      password: "",
    });

    const credentialsErrors = ref({
      email: undefined,
      password: undefined,
    });

    const loggedInData = ref({});

    const submit = () => {
      showLoading.value = true;
      let credentialData = {
        email: credentials.value.email.toLowerCase(),
        password: credentials.value.password,
      };
      store.dispatch("admin/login", credentialData).then((res) => {
        loggedInData.value = store.getters["admin/getAdmin"];
        showLoading.value = false;
        if (loggedInData.value !== undefined) {
          if (loggedInData.value.isFirstTime) {
            message.value.showFlash = !message.value.showFlash;
            setTimeout(() => {
              router.push({ path: "/admin/changePassword" });
            }, 3000);
          }
          else if (loggedInData.value.role.code == "UM") {
            message.value.showErrorFlash = !message.value.showFlash
            setTimeout(() => {
              router.push({ path: "/admin/create"})
            })
          }
           else {
            message.value.showFlash = !message.value.showFlash;
            setTimeout(() => {
              router.push({ path: "/admin/review" });
            }, 3000);
          }
        } else {
          message.value.showErrorFlash = !message.value.showErrorFlash;
          setTimeout(() => {
            // context.emit("closeModal", true);
            credentials.value.email = '';
            credentials.value.password = '';
            message.value.showErrorFlash = !message.value.showErrorFlash;
          }, 3000);
        }

        // if (res.data.status == "Success") {
        //   router.push({ path: "/admin/review" });
        // const isFirstLoggin = res.data.data.id; // res.data.data.id is gonna be changed soon
        // if (isFirstLoggin != 1) {
        //   message.value.showFlash = !message.value.showFlash;

        //   setTimeout(() => {
        //     router.push({ path: "/admin/review" });
        //   }, 3000);
        // } else {
        //   message.value.showFlash = !message.value.showFlash;
        //   setTimeout(() => {
        //     router.push({ path: "/admin/changePassword" });
        //   }, 3000);
        // }

        //   } else {
        // showLoading.value = false
        // message.value.showErrorFlash = !message.value.showErrorFlash;
        // setTimeout(() => {}, 3000);
        //   }
        // }).catch(err => {
      });
    };

    const isEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    const validateForm = (formData) => {
      const errors = {};
      if (!formData.email) errors.email = "Email Required";
      if (formData.email && !this.isEmail(formData.email)) {
        errors.email = "Invalid Email";
      }
      return errors;
    };
    return {
      credentials,
      credentialsErrors,
      submit,
      isEmail,
      validateForm,
      message,
      showLoading,
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
}

@screen md {
  .card-wrapper {
    box-shadow: 0px 3px 6px #1e40af82;
  }
}
</style>
