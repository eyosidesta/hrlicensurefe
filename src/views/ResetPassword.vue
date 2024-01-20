<template>
  <header class="px-10 py-3.5 inset-box-shadow bg-lightBlueB-100">
    <nav>
      <main class="navigate flex items-center justify-between">
        <div class="flex items-center">
          <RenderIllustration class="" illustration="Logo" message="Address" />
          <h2 class="text-md AtkinsonHyperlegibleBold text-primary-600 ml-2 ">
            HRIS - License
          </h2>
        </div>
      </main>
    </nav>
  </header>
  <div class="bg-primary-100 h-full">
    <form class="mx-auto max-w-3xl w-full mt-40 " @submit.prevent="submitForm">
      <div class="flex">
        Reset Password
        <div class="flex flex-col block mx-auto w-1/2 ">
          <!-- <span v-show="!isFirstTimeLogin"> -->

          <!-- </span> -->
          <!-- <span style="color: red">{{ personalInfoErrors.name }}</span> -->
          <label class="text-primary-700">New Password</label>
          <input
            class="max-w-3xl"
            type="password"
            required
            v-model="newPassword"
          />
          <br />
          <label class="text-primary-700">Confirm New Password</label>
          <input
            class="max-w-3xl"
            type="password"
            required
            v-model="confirmNewPassword"
          />
          <div v-if="showErrorMessage">
            <label class="text-red-200">*please fill all fields</label>
          </div>
          <div v-if="showErrorPassword">
            <label class="text-red-200">*password is not the same</label>
          </div>

          <div class="flex mb-medium w-full mt-medium">
            <button
              class="block mx-auto w-1/2  bg-lightBlue-500 hover:bg-lightBlue-600 hover:shadow-lg"
              @click="submitForm"
            >
              Confirm
            </button>
          </div>
          <span v-if="showLoading">
            <Spinner />
          </span>
          <div v-if="showFlash">
            <FlashMessage message="Password Successfully Changed!" />
          </div>
          <div v-if="showFlashError">
            <FlashMessage message="Password Change Incomplete!" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Spinner from "@/sharedComponents/Spinner";
import FlashMessage from "@/sharedComponents/FlashMessage";
import RenderIllustration from "@/sharedComponents/RenderIllustration";
export default {
  components: {
    Spinner,
    FlashMessage,
  },
  setup() {
    let route = useRoute();
    let showLoading = ref(false);
    let showErrorPassword = ref(false);
    let showErrorMessage = ref(false);

    let showFlash = ref(false);
    let showFlashError = ref(false);
    const store = useStore();
    const router = useRouter();
    let newPassword = ref("");
    let confirmNewPassword = ref("");
    let id = ref("");
    id.value = route.params.id;
    const submitForm = () => {
      showLoading.value = true;
      showErrorMessage.value = false;
      showErrorPassword.value = false;
      if (newPassword.value != confirmNewPassword.value) {
        showErrorPassword.value = true;
        showLoading.value = false;
        //return;
      }
      let pass = { pass: { password: newPassword.value }, id: id.value };
      store
        .dispatch("profile/resetPassword", pass)
        .then((res) => {
          if (res.data.status === "Success") {
            showFlash.value = true;
            showLoading.value = false;
            setTimeout(() => {
              router.push({ path: "/" });
            }, 2500);
          } else {
            showFlashError.value = true;
            showLoading.value = false;
            setTimeout(() => {
              router.push({ path: "/" });
            }, 2500);
          }
          //// display that the email might be in spam
        })
        .catch((err) => {
          showLoading.value = false;
        });
    };

    return {
      submitForm,
      showLoading,
      showErrorPassword,
      showErrorMessage,
      showFlash,
      newPassword,
      confirmNewPassword,
      showFlashError,
    };
  },
};
</script>

<style>
body {
  background-color: #f9fafb;
}
</style>
