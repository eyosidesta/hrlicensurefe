<template>
  <form class="mx-auto max-w-3xl w-full mt-10 " @submit.prevent="submitForm">
    <div class="flex">
      <div class="flex flex-col block mx-auto w-1/2 ">
        <!-- <span v-show="!isFirstTimeLogin"> -->
        <label class="text-primary-700" v-show="!isFirstTimeLogin"
          >Old Password</label
        >
        <br />
        <input
          class="max-w-3xl"
          type="password"
          v-show="!isFirstTimeLogin"
          v-model="passwordInfo.oldPassword"
        />
        <br />
        <!-- </span> -->
        <!-- <span style="color: red">{{ personalInfoErrors.name }}</span> -->
        <label class="text-primary-700">New Password</label>
        <input
          class="max-w-3xl"
          type="password"
          v-model="passwordInfo.newPassword"
          v-on:keyup="showPasswordStrength(passwordInfo.newPassword)"
        />
        <password-meter :password="passwordInfo.newPassword" />
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
        <br />
        <label class="text-primary-700">Confirm New Password</label>
        <input
          class="max-w-3xl"
          type="password"
          v-model="passwordInfo.confirmPassword"
        />
        <div v-if="showErrorMessage">
          <label class="text-red-200">*please fill all fields</label>
        </div>
        <div v-if="showErrorPassword && !showErrorMessage">
          <label class="text-red-200">*password is not the same</label>
        </div>
        <div v-if="oldPasswordError && !showErrorMessage">
          <label class="text-red-200">*old password doesn't match</label>
        </div>
        <div class="flex mb-medium w-full mt-medium">
          <button
            class="block mx-auto w-1/2  bg-lightBlue-500 hover:bg-lightBlue-600 hover:shadow-lg"
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
      </div>
    </div>
  </form>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Spinner from "@/sharedComponents/Spinner";
import logout from "../adminLogout.js";
import FlashMessage from "@/sharedComponents/FlashMessage";
import PasswordMeter from "vue-simple-password-meter";

export default {
  components: {
    Spinner,
    FlashMessage,
    PasswordMeter,
  },
  computed: {
    logout: () => logout,
  },
  name: "NewPasswordForm",
  setup() {
    let showLoading = ref(false);
    const isFirstTimeLogin = JSON.parse(localStorage.getItem("allAdminData"))
      .isFirstTime;

    let passwordInfo = ref({
      email: localStorage.getItem("adminEmail"),
      oldPassword: isFirstTimeLogin ? "password1" : "",
      newPassword: "",
      confirmPassword: "",
    });

    let showErrorPassword = ref(false);
    let showErrorMessage = ref(false);
    let oldPasswordError = ref(false);
    let showFlash = ref(false);

    const passwordStrengthDisplay = ref(false);

    const store = useStore();
    const router = useRouter();
    const adminId = localStorage.getItem("adminId");

    const showPasswordStrength = (password) => {
      if (password != "") {
        passwordStrengthDisplay.value = true;
      } else {
        passwordStrengthDisplay.value = false;
      }
    };

    const submitForm = () => {
      oldPasswordError.value = false;
      showLoading.value = true;
      validateMessage(passwordInfo);
      if (passwordInfo.newPassword != passwordInfo.confirmPassword) {
        showErrorPassword.value = true;
        showLoading.value = false;
        return;
      }

      store
        .dispatch("admin/changePassword", passwordInfo.value)
        .then((res) => {
          showLoading.value = false;
          if (res.data.status === "Success") {
            showFlash.value = true;
            setTimeout(() => {
              if (isFirstTimeLogin) {
                logout(router);
              } else {
                router.push({ path: "/admin/review" });
              }
            }, 3000);
          }
        })
        .catch((err) => {
          showLoading.value = false;
          oldPasswordError.value = true;
        });
    };

    const validateMessage = (adminData) => {
      if (
        adminData.value.oldPassword == "" ||
        adminData.value.newPassword == "" ||
        adminData.value.confirmPassword == ""
      ) {
        showLoading.value = false;
        showErrorMessage.value = true;
        return;
      } else {
        showErrorMessage.value = false;
      }
    };
    return {
      showPasswordStrength,
      passwordStrengthDisplay,
      submitForm,
      passwordInfo,
      showLoading,
      showErrorPassword,
      showErrorMessage,
      isFirstTimeLogin,
      oldPasswordError,
      showFlash,
    };
  },
};
</script>
