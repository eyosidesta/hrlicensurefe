<template>
  <div>
    <ReviewerNavBar tab="createAdmin" />
    <div class="w-screen bg-lightBlueB-200 flex items-center justify-center">
      <div class="w-screen max-w-4xl mt-medium">
        <div
          class="flex flex-col mt-small w-full bg-white blue-box-shadow-light rounded"
        >
          <div class="mt-medium">
            <Title message="Create Admin User" />
          </div>
          <form
            class="mx-auto max-w-3xl w-full mt-10"
            @submit.prevent="registerAdmin"
          >
            <div class="flex">
              <div class="flex flex-col mb-medium w-1/2 mr-12">
                <label class="text-primary-700">First Name</label>
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="admin.firstName"
                />
                <span style="color: red" v-if="state.showErrorMessages">{{
                  state.validationErrors.firstName
                }}</span>
              </div>
              <div class="flex flex-col mb-medium w-1/2 mr-12">
                <label class="text-primary-700">Father's Name</label>
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="admin.fatherName"
                />
                <span style="color: red" v-if="state.showErrorMessages">{{
                  state.validationErrors.fatherName
                }}</span>
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-col mb-medium w-1/2 mr-12">
                <label class="text-primary-700">Grandfather's Name</label>
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="admin.grandfatherName"
                />
                <span style="color: red" v-if="state.showErrorMessages">{{
                  state.validationErrors.grandfatherName
                }}</span>
              </div>
              <div class="flex flex-col mb-medium w-1/2 mr-12">
                <label class="text-primary-700">Email</label>
                <input class="max-w-3xl" type="text" v-model="admin.email" />
                <span style="color: red" v-if="state.showErrorMessages">{{
                  state.validationErrors.email
                }}</span>
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-col mb-medium w-1/2 mr-12">
                <label class="text-primary-700">Phone Number</label>
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="admin.phoneNumber"
                />
                <span style="color: red" v-if="state.showErrorMessages">{{
                  state.validationErrors.phoneNumber
                }}</span>
              </div>
              <div class="flex flex-col mb-medium w-1/2 mr-12">
                <label class="text-primary-700">Role</label>
                <select class="max-w-3xl" v-model="admin.roleId">
                  <option
                    v-for="role in state.roles"
                    v-bind:key="role.name"
                    v-bind:value="role.id"
                  >
                    {{ role.name }}
                  </option>
                </select>
                <span style="color: red" v-if="state.showErrorMessages">{{
                  state.validationErrors.role
                }}</span>
              </div>
            </div>
            <div class="flex">
              <div
                class="flex flex-col mb-medium w-1/2 mr-12"
                v-if="adminExpertId == 3"
              >
                <label class="text-primary-700">Expert Type</label>
                <select
                  class="max-w-3xl"
                  v-model="expertLevels.id"
                  @change="selectedExpertLevel"
                >
                  <option
                    v-for="expertLevel in expertLevels"
                    v-bind:key="expertLevel.name"
                    v-bind:value="expertLevel.id"
                  >
                    {{ expertLevel.name }}
                  </option>
                </select>
                <span style="color: red" v-if="state.showErrorMessages">{{
                  state.validationErrors.expertLevel
                }}</span>
              </div>
              <span v-show="expertLevels.id == 4">
                <!-- <div class="flex flex-col mb-medium w-1/2 mr-12">
                <label class="text-primary-700">Region</label>
                <input class="max-w-3xl" type="text" v-model="admin.region" />
                <span style="color: red" v-if="state.showErrorMessages">{{
                  state.validationErrors.region
                }}</span>
              </div>
              </span> -->
                <label class="text-primary-700">Region</label>
                <div>
                  <select
                    class="max-w-3xl"
                    v-model="regions.id"
                    @change="selectedRegion"
                  >
                    <option
                      v-for="region in regions"
                      v-bind:key="region.name"
                      v-bind:value="region.id"
                    >
                      {{ region.name }}
                    </option>
                  </select>
                </div>
                <span style="color: red" v-if="state.showErrorMessages">{{
                  state.validationErrors.region
                }}</span>
              </span>
            </div>
            <div
              v-if="showLoading"
              class="flex justify-center justify-items-center mt-0"
            >
              <Spinner />
            </div>
            <div class="flex mb-medium w-full mt-medium" v-if="!showButtons">
              <button
                class="mx-auto w-1/2 blue-with-light-blue-gradient"
                variant="block"
              >
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-if="message.showFlash">
    <FlashMessage message="Admin user registered Successful!" />
  </div>
  <div v-if="message.showErrorFlash">
    <ErrorFlashMessage :message="errorMessage" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Title from "@/sharedComponents/TitleWithIllustration";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import { useStore } from "vuex";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import { useRouter } from "vue-router";

import Spinner from "@/sharedComponents/Spinner";

export default {
  components: {
    ReviewerNavBar,
    Title,
    FlashMessage,
    ErrorFlashMessage,
    Spinner,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const adminExpertId = JSON.parse(localStorage.getItem("allAdminData"))
      .expertLevelId;
    let errorMessage = ref("");

    let admin = {
      firstName: null,
      fatherName: null,
      grandfatherName: null,
      email: null,
      phoneNumber: null,
      roleId: null,
      expertLevelId: null,
      regionId: null,
      password: "password1",
    };

    let showLoading = ref(false);
    let showButtons = ref(false);

    let expertLevels = ref([
      {
        id: null,
        name: null,
        code: null,
      },
    ]);

    let regions = ref([
      {
        id: null,
        name: null,
        code: null,
      },
    ]);

    let state = ref({
      roles: [],
      showErrorMessages: false,
      validationErrors: {},
    });

    let message = ref({
      showFlash: false,
      showErrorFlash: false,
    });

    const fetchRole = () => {
      store.dispatch("admin/getRole").then((res) => {
        const rolesResponse = res.data.data.filter((data) => {
          return data.code !== "APP";
        });
        state.value.roles = rolesResponse;
      });
    };

    const fetchRegions = () => {
      store.dispatch("admin/getRegions").then((res) => {
        regions.value = res.data.data;
      });
    };

    const fetchExpertLevels = () => {
      store.dispatch("admin/getExpertLevels").then((res) => {
        expertLevels.value = res.data.data;
      });
    };

    const selectedExpertLevel = () => {
      admin.expertLevelId = expertLevels.value.id;
    };

    const selectedRegion = () => {
      admin.regionId = regions.value.id;
    };

    const registerAdmin = () => {
      const isValidated = validateForm(admin);
      showLoading.value = true;
      showButtons.value = true;
      if (isValidated) {
        state.value.validationErrors = isValidated;
        state.value.showErrorMessages = true;
        showLoading.value = false;
        showButtons.value = false;
      } else {
        state.value.showErrorMessages = false;
        admin.name =
          admin.firstName +
          " " +
          admin.fatherName +
          " " +
          admin.grandfatherName;

        admin.email = admin.email.toLowerCase();
        store
          .dispatch("admin/registerAdmin", admin)
          .then((res) => {
            showLoading.value = false;
            if (res.data === undefined) {
              message.value.showErrorFlash = !message.value.showErrorFlash;
              setTimeout(() => {
                message.value.showErrorFlash = !message.value.showErrorFlash;
              }, 3000);
            } else if (res.data.status == "Success") {
              message.value.showFlash = !message.value.showFlash;
              setTimeout(() => {
                location.reload(true);
              }, 3000);
            } else if ((res.data.status = "Error")) {
              errorMessage.value = res.data.message;
              message.value.showErrorFlash = !message.value.showErrorFlash;
              setTimeout(() => {
                location.reload(true);
              }, 3000);
            }
          })
          .catch((err) => {
            showLoading.value = false;
            errorMessage.value = "Oops! Something went wrong, Admin is not created"
            message.value.showErrorFlash = true;
            setTimeout(() => {
              location.reload(true);
            }, 3000)
          });
      }
    };

    const validateForm = (formData) => {
      const errors = {};
      if (!formData.email) errors.email = "Email is Required";
      if (!formData.phoneNumber)
        errors.phoneNumber = "Phone Number is Required";
      if (formData.email && !isValidEmail(formData.email)) {
        errors.email = "Invalid Email";
      }

      if (!formData.expertLevelId && adminExpertId == 3)
        errors.expertLevel = "Expert Level is required";
      if (!formData.regionId && formData.expertLevelId == 4)
        errors.region = "Region is required";
      //   if (formData.phoneNumber && !isValidPhoneNumber(formData.phoneNumber)) {
      //     errors.phoneNumber = "Invalid Phone Number";
      //   };
      if (!formData.firstName) errors.firstName = "First name is Required";
      if (!formData.fatherName) errors.fatherName = "Father name is Required";
      if (!formData.grandfatherName)
        errors.grandfatherName = "Grandfather name is Required";
      if (!formData.roleId) errors.role = "Role is Required";

      if (
        errors &&
        Object.keys(errors).length === 0 &&
        errors.constructor === Object
      ) {
        return null;
      } else {
        return errors;
      }
    };

    const isValidEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    onMounted(() => {
      fetchRole();
      fetchExpertLevels();
      fetchRegions();
    });

    return {
      state,
      message,
      errorMessage,
      expertLevels,
      regions,
      showLoading,
      admin,
      adminExpertId,
      fetchRole,
      registerAdmin,
      validateForm,
      isValidEmail,
      selectedExpertLevel,
      selectedRegion,
      showButtons,
    };
  },
};
</script>
