<template>
  <div v-if="message.showLoading2" class="h-screen mt-large pt-large">
    <Spinner class="bg-lightBlueB-200  " />
  </div>
  <div
    style="width: 1000px"
    class="bg-white mb-large rounded pr-20 pl-20 pb-12"
  >
    <div v-if="!message.showLoading2">
      <div class="flex justify-center"><Title message="Summary" /></div>
      <div class="flex justify-start flex-col mb-large mt-large">
        <div class="flex justify-start mb-medium">
          <Title message="Profile Picture" />
        </div>
        <div>
          <picture>
            <img :src="profilePic" />
          </picture>
        </div>
      </div>
      <div class="flex justify-start">
        <Title message="Personal Info" class="mb-small" />
      </div>
      <div class="flex flex-row">
        <div>
          <label class="ml-8 text-primary-300"> Full Name</label>
          <h5 class="ml-8">
            {{
              personalInfo.name +
                " " +
                personalInfo.fatherName +
                " " +
                personalInfo.grandFatherName
            }}
          </h5>
        </div>
        <div>
          <label class="ml-8 text-primary-300"> Full Alternative Name</label>
          <h5 class="ml-8">
            {{
              personalInfo.alternativeName +
                " " +
                personalInfo.alternativeFatherName +
                " " +
                personalInfo.alternativeGrandFatherName
            }}
          </h5>
        </div>
        <div>
          <label class="ml-8 text-primary-300"> Gender</label>
          <h5 class="ml-8">{{ personalInfo.gender }}</h5>
        </div>
        <div>
          <label class="ml-8 text-primary-300"> Nationality</label>
          <h5 class="ml-8">{{ nationality }}</h5>
        </div>
        <div>
          <label class="ml-8 text-primary-300"> Marital Status</label>
          <h5 class="ml-8">{{ maritalStatus }}</h5>
        </div>
      </div>
      <div class="flex justify-start">
        <Title message="Address" class="mb-small" />
      </div>
      <div class="flex flex-row">
        <div>
          <label class="ml-8 text-primary-300"> PO Box</label>
          <h5 class="ml-8">{{ personalInfo.poBox }}</h5>
        </div>
      </div>
      <div class="flex justify-start">
        <Title message="Contact" class="mb-small" />
      </div>
      <div class="flex flex-row">
        <div>
          <label class="ml-8 text-primary-300"> Email Address</label>
          <h5 class="ml-8">{{ user.emailAddress }}</h5>
        </div>
      </div>
      <div class="mt-12 flex justify-center mb-medium">
        <div>
          <button @click="prevStep" class="mx-auto w-1/2" variant="outline">
            Back
          </button>
        </div>
        <div v-if="!message.showLoading">
          <button v-on:click="submit()">Save Profile</button>
        </div>
      </div>
      <div
        class="flex justify-center justify-items-center mt-8 mb-12"
        v-if="message.showLoading"
      >
        <Spinner />
      </div>
    </div>

    <div v-if="message.showFlash">
      <FlashMessage message="Your profile is successfully created!!" />
    </div>
    <div v-if="message.showErrorFlash">
      <ErrorFlashMessage message="Your profile creation failed!!" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Title from "@/sharedComponents/TitleWithIllustration";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import Spinner from "@/sharedComponents/Spinner";
import moment from "moment";

export default {
  components: { Title, FlashMessage, ErrorFlashMessage, Spinner },
  computed: {
    moment: () => moment,
  },
  props: ["activeState"],
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    let profilePic = null;
    let message = ref({
      showFlash: false,
      showErrorFlash: false,
      showLoading: false,
      showLoading2: false,
    });
    let user = ref({
      id: "",
      emailAddress: "",
      phoneNumber: "",
    });

    let personalInfo = {
      name: null,
      grandFatherName: null,
      fatherName: null,
      alternativeName: null,
      alternativeFatherName: null,
      alternativeGrandFatherName: null,
      nationality: null,
      dateOfBirth: null,
      gender: null,
      maritalStatusId: null,
      maritalStatus: null,
      poBox: null,
    };
    let address = {
      poBox: null,
    };
    let contact = {
      email: null,
      poBox: null,
    };
    let success = ref(false);
    let response = {};
    let showFlash = ref(false);
    let nationality = ref("");
    let maritalStatus = ref("");
    const addProfile = () => {
      message.value.showLoading = true;
      message.value.showFlash = false;
      message.value.showErrorFlash = false;
      store
        .dispatch("profile/addProfile", {
          name: personalInfo.name,
          fatherName: personalInfo.fatherName,
          grandFatherName: personalInfo.grandFatherName,
          alternativeName: personalInfo.alternativeName,
          alternativeFatherName: personalInfo.alternativeFatherName,
          alternativeGrandFatherName: personalInfo.alternativeGrandFatherName,
          gender: personalInfo.gender,
          dateOfBirth: personalInfo.dateOfBirth,
          nationalityId: personalInfo.nationalityId,
          maritalStatusId: personalInfo.maritalStatusId,
          poBox: personalInfo.poBox,
          photo: personalInfo.photo,
          userId: +localStorage.getItem("userId"),
        })
        .then((response) => {
          if (response.statusText == "Created") {
            message.value.showLoading = false;
            message.value.showFlash = true;
            message.value.showErrorFlash = false;
            setTimeout(() => {
              location.reload(true);
            }, 1500);
            setTimeout(() => {
              router.push({ path: "/menu" });
            }, 25);
          } else {
            message.value.showLoading = false;
            message.value.showFlash = false;
            message.value.showErrorFlash = true;
            setTimeout(() => {
              message.value.showErrorFlash = false;
            }, 3000);
          }
        });
    };
    const fetchUser = async () => {
      message.value.showLoading2 = true;
      store
        .dispatch("profile/getUserById", localStorage.getItem("userId"))
        .then((res) => {
          user.value = res.data.data;
          message.value.showLoading2 = false;
        });
    };
    const submit = () => {
      addProfile();
    };
    const prevStep = () => {
      emit("changeActiveStatePrevious");
    };
    personalInfo = store.getters["profile/getPersonalInfo"];
    if (
      personalInfo.photo != undefined ||
      personalInfo.photo != null ||
      personalInfo.photo != ""
    ) {
      profilePic = personalInfo.photo;
    }
    address = store.getters["profile/getAddress"];
    contact = store.getters["profile/getContact"];
    nationality = store.getters["profile/getNationality"];
    maritalStatus = store.getters["profile/getMaritalStatus"];
    onMounted(() => {
      fetchUser();
      nextTick(function() {
        window.setInterval(() => {
          showFlash.value = false;
        }, 10000);
      });
    });
    return {
      profilePic,
      personalInfo,
      address,
      contact,
      success,
      nationality,
      maritalStatus,
      response,
      message,
      submit,
      user,
      fetchUser,
      prevStep,
    };
  },
};
</script>
<style>
.text-danger > label,
.text-danger > h5 {
  color: red;
}
</style>
